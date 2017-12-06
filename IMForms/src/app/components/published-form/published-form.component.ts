import {
    Component, OnInit, Inject, ViewChild, ComponentFactoryResolver,
    ComponentRef, ElementRef, OnDestroy,
    Input, ViewContainerRef
} from '@angular/core';
import { FormsService } from '../../services/forms/forms.service';
import { FormsDirective } from '../../common/forms/forms.directive';
import { HttpClient } from '../../services/HttpClient';
import { ActivatedRoute, Router } from '@angular/router';
import { MD_DIALOG_DATA } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-form',
    templateUrl: './published-form.component.html',
    styleUrls: ['./published-form.component.less']
})
export class PublishedFormComponent implements OnInit, OnDestroy {
    public title: String;
    public year: number;
    public fg: FormGroup;
    private sub: any;
    private content: any;

    @ViewChild(FormsDirective) form: FormsDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
        private formsService: FormsService,
        private http: HttpClient,
        private route: ActivatedRoute,
        public toastr: ToastsManager,
        vcr: ViewContainerRef,
        private router: Router) {
        this.toastr.setRootViewContainerRef(vcr);
        this.year = (new Date()).getFullYear();
        this.fg = new FormGroup({});
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            const id = '?publishId=' + params['id'];
            this.content = { 'title': '', 'description': '' };
            this.http.Get('forms' + id).subscribe(
                data => {
                    if (data.status === 'error' || !data[0]) {
                        this.router.navigate(['page-not-found']);
                    } else {
                        this.content = data[0];
                    }
                },
                err => {
                    this.router.navigate(['page-not-found'])
                },
                () => {
                    this.title = this.content.title;
                    this.formsService.drawForm(this.content.description, 'fill', this.form.viewContainerRef, this.componentFactoryResolver);
                    this.fg = this.formsService.getFormGroup();
                }
            );
        });
    }

    getFillData() {
        const json = {};
        json['title'] = this.title;
        json['formId'] = this.content.formID;
        json['data'] = {};
        const inputs = document.querySelectorAll('Input');
        for (let i = 0; i < inputs.length; ++i) {
            json['data'][inputs[i]['name']] = inputs[i]['value'];
        }
        this.http.Post('forms/addFilledData', json).subscribe(((response) => {
            if (response.status === 'success') {
                this.toastr.success('IMForms', 'Your Data Has Been Successfully Saved');
            } else {
                this.toastr.error('IMForms', 'Server error');
            }
        }),
            err => {
                this.toastr.error('IMForms', 'error');
            });
    }

    public submited(value: any) {
        console.log(value);
        const json = {};
        json['title'] = this.title;
        json['formId'] = this.content.formID;
        json['data'] = value;

        this.http.Post('forms/addFilledData', json).subscribe(((response) => {
            if (response.status === 'success') {
                this.toastr.success('IMForms', 'Your Data Has Been Successfully Saved');
            } else {
                this.toastr.error('IMForms', 'Server error');
            }
        }),
            err => {
                this.toastr.error('IMForms', 'error');
            });
    }

    public ngOnDestroy() {
        this.formsService.setFormGroup({});
        this.sub.unsubscribe();
    }

}

@Component({
    selector: 'app-link',
    templateUrl: './published-link.component.html',
    styleUrls: ['./published-link.component.less']
})
export class PublishedLinkComponent {
    public title: string;
    public url: string;
    constructor( @Inject(MD_DIALOG_DATA) public data: any, public element: ElementRef) {
        this.title = data.title;
        this.url = data.content;
    }

    public copyToClipboard() {
        const input = this.element.nativeElement.querySelector('#copy');
        input.select();
        document.execCommand('copy');
    }
}
