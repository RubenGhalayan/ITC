import { Component, OnInit, TemplateRef, ViewChild, ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';
import { Ng2FloatBtnComponent, Ng2FloatBtn } from 'ng2-float-btn';
import { SlideBarComponent } from '../fragments/slide-bar/slide-bar.component';
import { SlideBarService } from '../../services/slide-bar/slide-bar.service';
import { ElementRef } from '@angular/core';
import { Renderer } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { UserService } from '../../services/_user/user.service';
import { FormsDirective } from '../../common/forms/forms.directive';
import { IElement } from '../fragments/elements/element.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { PopUpComponent } from '../fragments/pop-up/pop-up.component';
import { FormsService } from '../../services/forms/forms.service';
import { Elements } from '../../constants/menu-elements';
import { SavedForms } from '../../constants/saved-forms';
import { Url } from '../../constants/config';
import { BrowserModule } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Rx';
import { HttpClient } from '../../services/HttpClient';
import { PreviewFormComponent } from '../fragments/preview-form/preview-form.component';
import { PublishedLinkComponent } from '../published-form/published-form.component';
import { Router } from '@angular/router';
import { ListenCanvasChangesService } from '../../services/canvas/canvas.service';
import { QuestionDialogComponent } from '../fragments/question-dialog/question-dialog.component';

@Component({
    selector: 'app-create-form',
    templateUrl: './create-form.component.html',
    styleUrls: ['../fragments/slide-bar/slide-bar.component.less', './create-form.component.less'],
    viewProviders: [DragulaService]
})

export class CreateFormComponent implements OnInit {
    public direction: string;
    public buttons: Array<Ng2FloatBtn>;
    public savedForms = [];
    public forms = [];
    public showArea = false;
    public overed = false;
    public title: any;
    public id: any;
    public dragged = false;
    public index: number;
    public dropped: ComponentRef<{}>[] = [];
    public elements: any[] = Elements;
    public busy: Subscription;
    public query = '';
    @ViewChild(FormsDirective) form: FormsDirective;
    @ViewChild(PopUpComponent) dialog: PopUpComponent;

    constructor(
        public toastr: ToastsManager,
        private slidebarService: SlideBarService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private dragulaService: DragulaService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private formsService: FormsService,
        private userService: UserService,
        private router: Router,
        private vcr: ViewContainerRef,
        private http: HttpClient,
        private listenCanvasChangeService: ListenCanvasChangesService) {
        this.userService.isAuthenticated();
        this.direction = 'left';
        this.http.Get('forms/getSavedForms').subscribe((response) => {
            for (let i = 0; i < response.saved.length; i++) {
                if (!(response.saved[i] in this.savedForms)) {
                    this.savedForms.push(response.saved[i]);
                }
            }
            this.forms = this.savedForms;
        });
        this.buttons = [
            {
                color: 'primary',
                iconName: 'visibility',
                onClick: () => {
                    const length = (window.screen.width * 0.8).toString() + 'px';
                    this.dialog.open(PreviewFormComponent, this.title, this.dropped, length);
                }
            },
            {
                color: 'primary',
                iconName: 'save',
                onClick: () => {
                    const data = this.formsService.saveForm(this.dropped, this.title);
                    this.saveForm(data, false);
                    this.listenCanvasChangeService.setDirty(false);
                }
            },
            {
                color: 'primary',
                iconName: 'delete',
                onClick: () => {
                    this.dialog.open(QuestionDialogComponent, 'DELETE', 'Are you sure you want to delete this form?', 'auto');
                    this.dialog.dialogRef.afterClosed().subscribe(result => {
                        if (result === true) {
                            if (this.id !== null) {
                                const url = 'forms/' + this.id;
                                this.busy = this.http.Delete(url).subscribe();
                                const index = this.savedForms.findIndex(f => f.id === this.id);
                                this.savedForms.splice(index, 1);
                            }
                            this.title = 'Type form name';
                            this.id = null;
                            this.dropped = [];
                            this.form.viewContainerRef.clear();
                            this.listenCanvasChangeService.setDirty(false);
                        }
                    });
                }
            },
            {
                color: 'primary',
                iconName: 'cloud_upload',
                onClick: () => {
                    this.publishForm();
                    this.listenCanvasChangeService.setDirty(false);
                }
            }
        ]
        this.title = 'Type form name';
        this.id = null;
        this.listenCanvasChangeService.setDirty(false);
        this.toastr.setRootViewContainerRef(vcr);
        const self = this;
        let oldIndex: number;
        let newIndex: number;
        let removeIndex: number = -1;
        setInterval(() => {
            const button = this.elementRef.nativeElement.querySelectorAll('.removeButton');
            for (let i = 0; i < button.length; ++i) {
                button[i].addEventListener('click', function (event) {
                    const element = event.target.parentElement.parentElement;
                    const noDrop = self.elementRef.nativeElement.querySelector('#no-drop');
                    removeIndex = Array.from(noDrop.children).indexOf(element);
                    element.remove();
                    if (removeIndex !== -1) {
                        self.dropped.splice(removeIndex, 1);
                        removeIndex = -1;
                    }
                });
            }
        }, 200);

        dragulaService.setOptions('first-bag', {
            copy: function (el, source) {
                return (source.id === 'drag-container');
            },
            accepts: function (el, target, source, sibling) {
                return !(source.id === 'no-drop' && target.id === 'drag-container');
            },
            invalid: function (el, handle) {
                return el.id === 'text';
            },
        });

        dragulaService.drag.subscribe((value) => {
            this.dragged = true;
            const text = this.elementRef.nativeElement.querySelector('.remove');
            if (text) {
                text.style.display = 'none';
            }
            value[1].childNodes[0].classList.remove('over');
            if (value[2].id !== 'drag-container') {
                value[1].childNodes[0].classList.add('mirror-element');
                oldIndex = Array.from(value[2].children).indexOf(value[1]);
                value[1].classList.remove('gu-transit');
            }
            if (this.check()) {
                this.closeSidenav();
            }

        });

        dragulaService.drop.subscribe((value: any[]) => {
            const noDrop = this.elementRef.nativeElement.querySelector('#no-drop');
            if (value[2] != null && value[3].id === 'drag-container') {
                value[2].classList.remove('drag');
                const el = this.elements.filter(element => element.name === value[1].innerText.trim());
                value[1].outerHTML = '';
                if (this.index === 1 && this.form.viewContainerRef.length < 1) {
                    this.index = 0;
                }
                const elements = el[0].name + 'Component';
                this.dropped.splice(this.index, 0, this.formsService.drawElement(elements.replace(/\s/g, ''), el[0].data, 'edit',
                    this.form.viewContainerRef, this.componentFactoryResolver, this.index));
                this.dragged = false;
            } else if (value[3].id !== 'drag-container') {
                newIndex = Array.from(value[3].children).indexOf(value[1]);
                this.move(this.dropped, oldIndex, newIndex);
            }
            this.listenCanvasChangeService.setDirty(true);
        });
        dragulaService.shadow.subscribe((value: any[]) => {
            const noDrop = this.elementRef.nativeElement.querySelector('#no-drop');
            if (value[3].id === 'drag-container') {
                value[1].classList.add('gu-transit-invisible');
                const moved = this.elementRef.nativeElement.querySelector('.gu-transit-invisible');
                this.index = [].slice.call(noDrop.children).indexOf(moved);
            } else {
                value[1].classList.remove('gu-transit');
                value[1].childNodes[0].classList.add('mirror-element');
                value[1].childNodes[0].classList.add('gu-transit');
                value[1].childNodes[0].classList.remove('over');
                const moved = this.elementRef.nativeElement.querySelector('.gu-transit').parentElement;
                this.index = [].slice.call(noDrop.children).indexOf(moved);
            }
        });

        dragulaService.over.subscribe((value: any[]) => {
            value[1].classList.remove('gu-transit');
        });

        dragulaService.dragend.subscribe((value: any[]) => {
            const text = this.elementRef.nativeElement.querySelector('.remove');
            value[1].childNodes[0].classList.remove('gu-transit');
            value[1].childNodes[0].classList.remove('mirror-element');
            if (text) {
                text.style.display = 'initial';
            }
        })
    }

    ngOnInit() {
        const id = this.formsService.getId();
        if (id || id != null) {
            const params = '?id=' + id;
            this.http.Get('forms' + params).subscribe(data => {
                this.formsService.setId(null);
                data.id = null;
                this.editForm(data);
            });
        }
    }

    public check() {
        return (window.innerWidth < 768) && this.slidebarService.opened === true;
    }

    public click($event: any) {
        const element = $event.target.parentElement.parentElement;
        const index = Array.from(element.parentElement.children).indexOf(element);
        element.remove();
        this.listenCanvasChangeService.setDirty(true);
    }

    public closeSidenav() {
        this.slidebarService
            .close()
        setTimeout(() => this.slidebarService.opened = false, 360);
    }

    public close() {
        if (this.check()) {
            this.closeSidenav();
        }
    }

    public editForm(form: any) {
        if (this.listenCanvasChangeService.checkDirty()) {
            this.dialog.open(QuestionDialogComponent,
                'IMForms', 'Are you sure you want to switch to another form without saving your changes?', 'auto');
            this.dialog.dialogRef.afterClosed().subscribe(result => {
                if (result === true) {
                    this.openForm(form);
                }
            });
        } else {
            this.openForm(form);
        }
    }

    private openForm(form: any) {
        this.title = form.title;
        this.id = form.id;
        this.dropped = this.formsService.drawForm(form.description, 'edit', this.form.viewContainerRef, this.componentFactoryResolver);
        this.listenCanvasChangeService.setDirty(false);
    }

    public updateTitle(value: any) {
        this.listenCanvasChangeService.setDirty(true);
    }

    public containerEmpty() {
        const noDrop = this.elementRef.nativeElement.querySelector('#no-drop');
        if (noDrop.children.length === 0) {
            this.form.viewContainerRef.clear();
        }
        if (this.form) {
            return this.form.viewContainerRef.length === 0;
        }
        return false;
    }

    public move(array, oldIndex, newIndex) {
        if (newIndex >= array.length) {
            let k = newIndex - array.length;
            while ((k--) + 1) {
                array.push(undefined);
            }
        }
        array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    };

    private createGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line:no-bitwise
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    private publishForm() {
        const id = this.createGUID();
        const url = Url + '/form/' + id;
        const length = window.screen.width > 768 ? (window.screen.width * 0.5).toString() + 'px' :
            (window.screen.width * 0.8).toString() + 'px';
        this.dialog.open(PublishedLinkComponent, this.title, url, length);
        this.dialog.dialogRef.afterClosed().subscribe(result => {
            if (true === result) {
                const data = this.formsService.saveForm(this.dropped, this.title);
                data['publishId'] = id;
                this.saveForm(data, true);
            }
        });
    }

    private saveForm(data: any, publish: boolean) {
        if (typeof this.id === 'undefined' || !this.id || this.id === null) {
            this.id = this.createGUID();
            data.id = this.id;
            this.http.Post('forms', data).subscribe(
                (response) => {
                    if (publish === true) {
                        this.formsService.setForm(this.id);
                        this.router.navigate(['./my-forms']);
                    } else {
                        this.savedForms.push({ 'title': this.title, 'description': data.description, 'id': data.id });
                    }
                },
                err => {
                    this.toastr.error('Sorry, something went wrong', 'IMForms');
                }
            );
        } else {
            this.busy = this.http.Put('forms/' + this.id, data).subscribe(
                (response) => {
                    const index = this.savedForms.findIndex(f => f.id === this.id);
                    if (publish === true) {
                        this.savedForms.splice(index, 1);
                        this.router.navigate(['./my-forms']);
                    } else {
                        this.savedForms[index] = { 'title': this.title, 'description': data.description, 'id': this.id };
                    }
                },
                err => {
                    this.toastr.error('Sorry, something went wrong', 'IMForms');
                }

            );
        }
    }
    filter() {
        if (this.query !== '') {
            this.forms = this.savedForms.filter(function (el) {
                return el.title.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.forms = this.savedForms;
        }
    }
}
