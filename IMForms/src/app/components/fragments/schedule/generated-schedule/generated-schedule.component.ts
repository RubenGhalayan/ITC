import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { SharedFormComponent } from '../../../fragments/shared-form/shared-form.component';
import { PopUpComponent } from '../../../fragments/pop-up/pop-up.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
declare let jsPDF;

@Component({
    selector: 'app-generated-schedule',
    templateUrl: './generated-schedule.component.html',
    styleUrls: ['./generated-schedule.component.less', '../schedule.component.less'],
    providers: [DatePipe, PopUpComponent]
})
export class GeneratedScheduleComponent implements OnInit {
    public groups = [];
    public keys = [];
    public labels = {};
    public isListView: Boolean;
    public selected = [];

    constructor( @Inject(MD_DIALOG_DATA) public data: any,
        private datePipe: DatePipe,
        public toastr: ToastsManager,
        public dialog: PopUpComponent) {
        this.groups = this.data.content;
        this.keys = this.data.title['keys'];
        Object.keys(this.data.title['form'].description).forEach(
            item => {
                if (this.data.title['form'].description[item]['type'] === 'FullNameComponent') {
                    this.labels['name'] = this.data.title['form'].description[item].data.config;
                }
            }
        );
        this.isListView = true;
    }

    ngOnInit() {
    }

    public onChange(e: Event) {
        this.isListView = !this.isListView;
    }

    public updateSelected(item) {
        const index = this.selected.indexOf(item);
        if (index === -1) {
            this.selected.push(item);
        } else {
            this.selected.splice(index, 1);
        }

    }

    public checked(item: any): boolean {
        const index: number = this.selected.indexOf(item);
        return index !== -1;
    }

    public exportToPdf() {
        const title = this.data.title['form'].title;
        const columns = [];
        const rows = this.groups;
        let type;

        const doc = new jsPDF(type, 'pt');
        doc.text(title, 60, 50);
        let start = 60;

        if (columns.length > 10) {
            type = 'landscape';
        } else {
            type = 'p';
        }

        if (rows.length === 0) {
            // Push id for each entry in table
            for (const i of Object.keys(rows)) {
                for (const j of Object.keys(rows[i])) {
                    let index = 1;
                    for (const k of Object.keys(rows[i][j])) {
                        if (rows.hasOwnProperty(i)) {
                            rows[i][j][k]['id'] = index++;
                        }
                    }
                }
            }

            // Get column names
            columns.push({ 'title': 'id', 'dataKey': 'id' });
            for (const i of Object.keys(this.labels)) {
                for (const j of Object.keys(this.labels[i])) {
                    const label = this.labels[i][j].label;
                    columns.push({ 'title': label, 'dataKey': label });
                }
            }

            // Generate pdf file
            for (const j of Object.keys(rows)) {
                doc.text(j, 40, start + 30);
                for (const k of Object.keys(rows[j])) {
                    if (k !== 'id') {
                        doc.text(k, 40, start + 50);
                    }
                    doc.autoTable(columns, rows[j][k], {
                        theme: 'striped',
                        margin: { top: 70 },
                        styles: { overflow: 'linebreak' },
                        startY: start + 60
                    });
                    start = doc.autoTableEndPosY() + 10;
                }
            }
        } else {
            // Push id for each entry in table
            for (const i of Object.keys(rows)) {
                let index = 1;
                for (const j in rows[i]) {
                    if (rows.hasOwnProperty(i)) {
                        rows[i][j]['id'] = index++;
                    }
                }
            }

            // Get column names
            columns.push({ 'title': 'id', 'dataKey': 'id' });
            for (const label of Object.keys(this.groups[0][0])) {
                if (label !== 'id') {
                    columns.push({ 'title': label, 'dataKey': label });
                }
            }

            // Generate pdf file
            for (const i of Object.keys(rows)) {
                doc.text(this.keys[i], 40, start + 30);
                doc.autoTable(columns, rows[i], {
                    theme: 'striped',
                    margin: { top: 70 },
                    styles: { overflow: 'linebreak' },
                    startY: start + 40
                });
                start = doc.autoTableEndPosY() + 10;
            }
        }
        const name = title + '-' + this.datePipe.transform(new Date(), 'yyyy-MM-dd_HH:mm:ss');
        doc.save(name + '.pdf');
    }

    private sendMessage() {
        const users = [];
        const select = this.selected;
        if (select.length) {
            console.log(select.length);
            if (select[0].Email === undefined) {
                this.toastr.error('No email field in table');
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
            let data: any = this.groups;
            for (const i of Object.keys(data)) {
                for (const entry of Object.keys(data[i])) {
                    if (data[i][entry].Email === undefined) {
                        this.toastr.error('No email field in table');
                        return;
                    }
                    users.push(data[i][entry]['Email']);
                }
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
