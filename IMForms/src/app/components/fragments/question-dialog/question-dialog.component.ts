import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material'

@Component({
    selector: 'app-question-dialog',
    templateUrl: './question-dialog.component.html',
    styleUrls: ['./question-dialog.component.less']
})
export class QuestionDialogComponent {
    public title: string;
    public message: string;
    constructor( @Inject(MD_DIALOG_DATA) public data: any) {
        this.title = data.title;
        this.message = data.content;
    }
}
