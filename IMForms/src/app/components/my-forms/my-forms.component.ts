import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewChecked, ElementRef } from '@angular/core';
import { current } from 'codelyzer/util/syntaxKind';
import { Subscription } from 'rxjs/Subscription';
import { PopUpComponent } from '../fragments/pop-up/pop-up.component';
import { QuestionDialogComponent } from '../fragments/question-dialog/question-dialog.component';
import { SharedFormComponent } from '../fragments/shared-form/shared-form.component';
import 'rxjs/add/operator/toPromise';
import { Tab } from './tabs';
import { SlideBarComponent } from '../fragments/slide-bar/slide-bar.component';
import { SlideBarService } from '../../services/slide-bar/slide-bar.service';
import { ScheduleComponent } from '../fragments/schedule/schedule.component';
import { TableData } from './table-data';
import { Ng2FloatBtnComponent, Ng2FloatBtn } from 'ng2-float-btn';
import { Url } from '../../constants/config';
import { UserService } from '../../services/_user/user.service';
import { DatePipe } from '@angular/common';
import { HttpClient } from '../../services/HttpClient';
import { FormsService } from '../../services/forms/forms.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';
declare let jsPDF;

@Component({
    selector: 'app-my-forms',
    templateUrl: './my-forms.component.html',
    styleUrls: ['my-forms.component.less', '../fragments/slide-bar/slide-bar.component.less'],
    providers: [DatePipe]
})

export class MyFormsComponent implements OnInit, AfterViewChecked {
    public selected: any = 0;
    public url: string;
    public myForm: any[] = [];
    public sharedForm: any[] = [];
    public myForms: any[] = [];
    public sharedForms: any[] = [];
    public isActive = false;
    public tabs: Tab[] = [];
    public showArea = false;
    public direction: string;
    public buttons: Array<Ng2FloatBtn>;
    private activeData: any[];
    private activeTitle: any;
    private busy: Subscription;
    public value: any;
    public info = [];
    public query: any;

    @ViewChild(PopUpComponent) dialog: PopUpComponent;
    @ViewChild(DataTableComponent) dataTable: DataTableComponent;

    constructor(private slidebarService: SlideBarService,
        private userService: UserService,
        private element: ElementRef,
        private datePipe: DatePipe,
        public toastr: ToastsManager,
        public vcr: ViewContainerRef,
        private http: HttpClient,
        private router: Router,
        private formsService: FormsService) {
        const newId = this.formsService.getForm() || '';
        this.http.Get('forms/getAllForms').subscribe((response) => {
            for (let i = 0; i < response.published.length; i++) {
                this.myForm.push(response.published[i]);
                if (newId === this.myForm[i].id) {
                    this.formsService.setForm(null);
                    this.addTab(this.myForm[i]);
                }
            }
            for (let i = 0; i < response.shared.length; i++) {
                this.sharedForm.push(response.shared[i]);
            }
            this.sharedForms = this.sharedForm;
            this.myForms = this.myForm;
        });
        this.toastr.setRootViewContainerRef(vcr);
        this.userService.isAuthenticated();
        this.url = Url + '/form/' + '1234';
        const source: Array<Object> = TableData;
        this.direction = 'left';
        this.buttons = [
            {
                color: 'primary',
                iconName: 'assessment',
                onClick: () => {
                    const params = '?id=' + this.tabs[this.selected].formId;
                    this.http.Get('forms' + params).subscribe(data => {
                        const width = window.screen.width;
                        const length = width < 768 ? width.toString() + 'px'     : (width * 0.5).toString() + 'px';
                        this.dialog.open(ScheduleComponent, data, this.tabs[    this.selected].data, length);
                    });

                }
            },
            {
                color: 'primary',
                iconName: 'picture_as_pdf',
                onClick: () => {
                    if (this.activeData !== undefined) {
                        const activeTab = this.tabs[this.selected];
                        const data = JSON.parse(JSON.stringify(activeTab.data));
                        this.tableToPdf(data, activeTab.title);
                    } else {
                        this.toastr.error('IMForms', 'Have not table to export as pdf');
                    }
                }
            },
            {
                color: 'primary',
                iconName: 'shared',
                onClick: () => {
                    const self = this;
                    const activeTab = self.tabs[self.selected];
                    const formID = activeTab.formId;
                    this.http.Get('users/getAllUsers/' + formID).subscribe((response) => {
                        if (response.users.length) {
                            const data = { 'users': response.users, 'formID': formID, 'component': 0 };
                            this.dialog.open(SharedFormComponent, 'SHARE FORM', data, '70%');
                            this.dialog.dialogRef.afterClosed().subscribe(result => {
                                if (result) {
                                    const message = 'Successfully Shared with ' + result + ' person';
                                    this.toastr.success(message);
                                }
                            });
                        } else {
                            this.toastr.warning('Can not find users for share this form');
                        }
                    });
                }
            },
            {
                color: 'primary',
                iconName: 'delete',
                onClick: () => {
                    const self = this;
                    this.dialog.open(QuestionDialogComponent, 'DELETE', 'Are you sure you want to delete this form?', 'auto');
                    this.dialog.dialogRef.afterClosed().subscribe(result => {
                        if (result === true) {
                            const activTab = self.tabs[self.selected];
                            const url = 'forms/' + activTab.formId;
                            self.busy = self.http.Delete(url).subscribe();
                            let forms;
                            if (activTab.owner === 'me') {
                                forms = self.myForm;
                            } else {
                                forms = self.sharedForm;
                            }
                            for (let i = 0; i < forms.length; ++i) {
                                if (forms[i].id === activTab.formId) {
                                    forms.splice(i, 1);
                                    break;
                                }
                            }
                            self.remove(activTab);
                        }
                    });
                }
            },
            {
                color: 'primary',
                iconName: 'email',
                onClick: () => {
                    this.sendMessage();
                }
            },
            {
                color: 'primary',
                iconName: 'edit',
                onClick: () => {
                    this.formsService.setId(this.tabs[this.selected].formId);
                    this.router.navigate(['./create-form']);
                }
            }
        ]
    }

    ngOnInit() { }

    public remove(tab) {
        const index: number = this.tabs.indexOf(tab);
        if (index !== -1) {
            this.tabs.splice(index, 1);
        }
        if (this.tabs.length === 0) {
            this.showArea = false;
        }
    }

    public tableToPdf(data, title) {
        const columns = [];
        const rows = data;
        let index = 1;
        let type;
        for (const i in rows) {
            if (rows.hasOwnProperty(i)) {
                rows[i]['id'] = index++;
            }
        }
        columns.push({ 'title': 'id', 'dataKey': 'id' });
        for (const key in rows[0]) {
            if (key !== 'id') {
                columns.push({ 'title': key, 'dataKey': key });
            }
        }
        if (columns.length > 10) {
            type = 'landscape';
        } else {
            type = 'p';
        }
        const doc = new jsPDF(type, 'pt');
        doc.text(title, 60, 50);
        doc.autoTable(columns, rows, {
            theme: 'striped',
            margin: { top: 70 },
            styles: { overflow: 'linebreak' },
            addPageContent: function () {
                doc.text('Header', 40, 30);
            }
        });
        const name = title + '-' + this.datePipe.transform(new Date(), 'yyyy-MM-dd_HH:mm:ss');
        doc.save(name + '.pdf');
    }

    public addTab(item) {
        const self = this;
        const activeTab = self.tabs[self.selected];
        const tab = new Tab();
        this.activeTitle = item.name;
        this.activeData = item.data;
        tab.title = item.name;
        tab.owner = item.owner;
        tab.formId = item.id;
        this.http.Get('forms/getFilledData/' + item.id).subscribe((response) => {
            if (response.fillData.length === 0) {
                tab.data = item.data;
            } else {
                this.info = JSON.parse(JSON.stringify(response.fillData));
                
                for (let i = 0; i < response.fillData.length; ++i) {
                    if (response.fillData[i]['EducationComponent'] !== undefined) {
                        for (let j = 0; j < response.fillData[i]['EducationComponent'].length; ++j) {
                            const name = 'Education' + (j + 1);
                            let value = '';
                            for (const pop of Object.keys(response.fillData[i]['EducationComponent'][j])) {
                                if (pop !== 'Education') {
                                    value = value + pop + ' - ' + response.fillData[i]['EducationComponent'][j][pop] + '<br>';
                                }
                            }
                            response.fillData[i][name] = value;
                        }
                        delete response.fillData[i]['EducationComponent'];
                    }
                    if (response.fillData[i]['SkillsComponent'] !== undefined) {
                        for (let j = 0; j < response.fillData[i]['SkillsComponent'].length; ++j) {
                            const name = 'Skill' + (j + 1);
                            let value = '';
                            for (const pop of Object.keys(response.fillData[i]['SkillsComponent'][j])) {
                                value = value + pop + ' - ' + response.fillData[i]['SkillsComponent'][j][pop] + '<br>';
                            }
                            response.fillData[i][name] = value;
                        }
                        delete response.fillData[i]['SkillsComponent'];
                    }
                    if (response.fillData[i]['WorkExperienceComponent'] !== undefined) {
                        for (let j = 0; j < response.fillData[i]['WorkExperienceComponent'].length; ++j) {
                            const name = 'WorkExperience' + (j + 1);
                            let value = '';
                            for (const pop of Object.keys(response.fillData[i]['WorkExperienceComponent'][j])) {
                                value = value + pop + ' - ' + response.fillData[i]['WorkExperienceComponent'][j][pop] + '<br>';
                            }
                            response.fillData[i][name] = value;
                        }
                        delete response.fillData[i]['WorkExperienceComponent'];
                    }
                }
                response.fillData.sort((a: any, b: any) => {

                    return (Object.keys(b).length > Object.keys(a).length);
                });
                tab.data = response.fillData;
            }
            tab.publishId = response.publishId;
            this.value = response.publishId;
            this.url = Url + '/form/' + response.publishId;
            this.showArea = true;
            if (this.tabs) {
                for (let i = 0; i < this.tabs.length; ++i) {
                    if (this.tabs[i].formId === tab.formId) {
                        this.tabs[i].data = response.fillData;
                        this.dataTable.onChangeTable(this.dataTable.config);
                        this.selected = i;
                        this.isActive = true;
                        break;
                    }
                }
            }
            if (false === this.isActive) {
                this.tabs.push(tab);
                this.selected = this.tabs.length - 1;
            }

        });
        this.isActive = false;
        if (window.innerWidth < 768) {
            this.closeSidenav();
        }
        if (this.dataTable) {
            this.formsService.setSelected([]);
            this.dataTable.selected = [];
        }


    }

    public check() {
        return (window.innerWidth < 768) && this.slidebarService.opened === true;
    }

    public closeSidenav() {
        this.slidebarService.close();
        setTimeout(() => this.slidebarService.opened = false, 360);
    }

    public close() {
        if (this.check()) {
            this.closeSidenav();
        }
    }

    public copyToClipboard() {
        const input = this.element.nativeElement.querySelector('#copy');
        input.select();
        document.execCommand('copy');
    }

    public tabChange($event) {
        this.url = Url + '/form/' + this.tabs[$event.index].publishId;
        this.formsService.setSelected([]);
        this.value = this.tabs[$event.index].publishId;
        this.dataTable.selected = [];
    }
    private sendMessage() {
        const users = [];
        const select = this.formsService.getSelected();
        if (select.length) {
            if (select[0].Email === undefined) {
                this.toastr.error('Not email field in table');
            } else {
                for (let i = 0; i < select.length; i++) {
                    users.push(select[i].Email);
                }
                const data = { 'users': users, 'component': 1 };
                this.dialog.open(SharedFormComponent, 'SEND MESSAGE', data, '70%');
                this.dialog.dialogRef.afterClosed().subscribe(result => {
                    if (result) {
                        const message = 'Successfully sent the message to ' + result + ' person';
                        this.toastr.success(message);
                    }
                });
            }
        } else {
            const self = this;
            const activeTab = self.tabs[self.selected];
            let data = JSON.parse(JSON.stringify(activeTab.data));
            if (data[0].Email === undefined) {
                this.toastr.error('Not email field in table');
            } else {
                for (let i = 0; i < data.length; i++) {
                    users.push(data[i].Email);
                }
                data = { 'users': users, 'component': 2 };
                this.dialog.open(SharedFormComponent, 'SEND MESSAGE', data, '70%');
                this.dialog.dialogRef.afterClosed().subscribe(result => {
                    if (result) {
                        const message = 'Successfully sent the message to ' + result + ' person';
                        this.toastr.success(message);
                    }
                });
            }
        }
    }

    public matchHeight() {

        const tab = document.getElementById('md-tab-content-0-' + this.selected)
        if (!tab) {
            return;
        }
        const children = tab.getElementsByTagName('TD');

        if (!children) {
            return;
        }

        const itemHeights = Array.from(children).map(x => {
            return x.getBoundingClientRect().height;
        });

        const maxHeight = itemHeights.reduce((prev, curr) => {
            return curr > prev ? curr : prev;
        }, 0);

        Array.from(children)
            .forEach((x: HTMLElement) => x.style.height = `${maxHeight}px`);
    }

    ngAfterViewChecked() {
        this.matchHeight();
    }

    public unPublished() {
        const self = this;
        const activeTab = self.tabs[self.selected];
        const url = 'forms/unPublished/' + activeTab.formId;
        if (activeTab.publishId === 'unPublished') {
            activeTab.publishId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                // tslint:disable-next-line:no-bitwise
                const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            this.url = Url + '/form/' + activeTab.publishId;
        } else {
            activeTab.publishId = 'unPublished';
        }
        this.value = activeTab.publishId;
        this.http.put(url, { 'publishId': activeTab.publishId }).subscribe(result => { });
        if (this.myForm) {
            for (let i = 0; i < this.myForm.length; i++) {
                if (this.myForm[i].formId === activeTab.formId) {
                    this.myForm[i].publishId = activeTab.publishId;
                }
            }
        }
        for (let i = 0; i < this.sharedForm.length; i++) {
            if (this.sharedForm[i].formId === activeTab.formId) {
                this.sharedForm[i].publishId = activeTab.publishId;
            }
        }
    }

    filter() {
        if (this.query !== '') {
            this.myForm = this.myForms.filter(function (el) {
                return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
            this.sharedForm = this.sharedForms.filter(function (el) {
                return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.myForm = this.myForms;
            this.sharedForm = this.sharedForms;
        }
    }
}
