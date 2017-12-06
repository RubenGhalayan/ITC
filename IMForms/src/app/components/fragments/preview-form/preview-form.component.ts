import { Component, ViewChild, Inject, AfterViewInit, ComponentFactoryResolver } from '@angular/core';
import { FormsDirective } from '../../../common/forms/forms.directive';
import { FormsService } from '../../../services/forms/forms.service';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-preview-form',
    templateUrl: './preview-form.component.html',
    styleUrls: ['./preview-form.component.css']
})
export class PreviewFormComponent implements AfterViewInit {

    public title: string;
    @ViewChild(FormsDirective) form: FormsDirective;
    constructor( @Inject(MD_DIALOG_DATA) public data: any,
        private formsService: FormsService,
        private componentFactoryResolver: ComponentFactoryResolver) {
        this.title = this.data.title;
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            const form = this.formsService.saveForm(this.data.content, this.title);
            this.formsService.drawForm(form.description, 'preview', this.form.viewContainerRef, this.componentFactoryResolver);
        }, 1);
    }
}
