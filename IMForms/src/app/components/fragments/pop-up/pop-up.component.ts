import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material'

@Component({
    selector: 'app-pop-up',
    templateUrl: './pop-up.component.html',
    styleUrls: ['./pop-up.component.css'],
})
export class PopUpComponent {
    data: any = [];
    dialogRef: MdDialogRef<any>;

    constructor(public popUp: MdDialog) { }

    open(component: any, title: any, content: any, size: any) {
        const data = {};
        data['title'] = title;
        data['content'] = content;
        this.dialogRef = this.popUp.open(component, {
            disableClose: true,
            width: size,
            data: data
        });
    }
}
