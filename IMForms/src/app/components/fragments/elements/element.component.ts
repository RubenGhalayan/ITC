import {
    Component, OnInit, OnDestroy, ViewChild, Type, Inject, forwardRef,
    Input, Output, EventEmitter, ChangeDetectorRef, AfterViewChecked, OnChanges
} from '@angular/core';
import { FormsService } from '../../../services/forms/forms.service';
import { ContenteditableModelDirective } from '../../../common/contenteditable/contenteditable-model.directive';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FancyImageUploaderOptions, UploadedFile } from 'ng2-fancy-image-uploader';
import { ListenCanvasChangesService } from '../../../services/canvas/canvas.service';
import { DatePipe } from '@angular/common'

export interface IElement {
    data: any;
    mode: any;
    type: any;
    name: String;
    group: FormGroup;
}

@Component({
    selector: 'app-element',
    template: '<div [formGroup]="group" class="formElement" (mouseover)="hover=true" (mouseleave)="hover=false"\
    [ngClass]="{\'over\': hover && mode == \'edit\'}" >\
    <button type="button" name="btn" class="glyphicon glyphicon-remove\
    btn btn-default btn-xl removeButton" [ngClass]="{\'hide\': !hover || mode !== \'edit\'}"></button>\
    <div style="margin-right: 10px;">\
    <label [(contenteditableModel)]="data.config.firstName.label" [attr.contenteditable]="mode === \'edit\'"\
    class="elementLabel" [ngClass]="{\'unselectable\': mode != \'edit\'}" for="firstName"\
    (update)="updateLabel()">{{ data.config.firstName.label }}</label>\
    <br>\
    <fieldset  [disabled]="mode == \'edit\'">\
    <input type = "text" class="form-control" [formControlName]="data.config.firstName.label"\
     id="firstName" [name]="data.config.firstName.label">\
    <br>\
    <label [(contenteditableModel)]="data.config.lastName.label" for="lastName" [attr.contenteditable]="mode == \'edit\'"\
    [ngClass]="{\'unselectable\': mode != \'edit\'}"  class="elementLabel">{{ data.config.lastName.label }}</label>\
    <br>\
    <input type = "text" style="width:90%" class="form-control" id="lastName"\
     [formControlName]="data.config.lastName.label" [name]="data.lastName">\
    </fieldset>\
    </div>\
    </div>'
})


export class FullNameComponent implements IElement, OnChanges {

    group: FormGroup;
    type: Type<any> = FullNameComponent;
    name: String = 'FullNameComponent';
    data: any;
    mode: any;
    hover: boolean;

    constructor(private listenerCanvasChangesService: ListenCanvasChangesService, private cdRef: ChangeDetectorRef) { }

    updateLabel() {
        this.listenerCanvasChangesService.setDirty(true);
    }

    ngOnChanges(): void {
        this.cdRef.detectChanges();
    }

}

@Component({
    selector: 'app-element',
    template: '<div class="formElement" (mouseover)="hover=true" (mouseleave)="hover=false"\
    [ngClass]="{\'over\': hover && mode == \'edit\'}" >\
    <button type="button" name="btn" class="glyphicon glyphicon-remove\
    btn btn-default btn-xl removeButton" [ngClass]="{\'hide\': !hover || mode !== \'edit\'}"></button>\
    <div style="margin-right: 10px;" >\
    <br>\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.config.email.label"\
     [attr.contenteditable] = "mode == \'edit\'"\
    class="elementLabel" [ngClass]="{\'unselectable\': mode != \'edit\'}" for="email"> {{ data.config.email.label }} </label>\
    <br>\
    <fieldset [formGroup]="group" [disabled]="mode == \'edit\'">\
    <input [formControlName]="data.config.email.label" type="email" style="width:90%;" class="form-control"\
     id="email" [name]="data.config.email.label">\
    </fieldset>\
    </div>\
    </div>'
})

export class EmailComponent implements IElement, AfterViewChecked {
    group: FormGroup;
    type: Type<any> = EmailComponent;
    name: String = 'EmailComponent';
    data: any;
    mode: any;
    hover: boolean;

    constructor(private listenerCanvasChangesService: ListenCanvasChangesService, private cdRef: ChangeDetectorRef) { }

    updateLabel() {
        this.listenerCanvasChangesService.setDirty(true);
    }

    ngAfterViewChecked(): void {
        this.cdRef.detectChanges();
    }
}


@Component({
    selector: 'app-element',
    template: '<div class="formElement" [formGroup]="group" (mouseover)="hover=true" (mouseleave)="hover=false" \
    [ngClass]="{\'over\': hover && mode == \'edit\'}" >\
    <button type="button" name="btn" class="glyphicon glyphicon-remove  btn btn-default btn-xl removeButton"\
    [ngClass]="{\'hide\': !hover || mode !== \'edit\'}"></button>\
    <div style="margin-right: 10px;">\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.config.country.label"\
    for="country" [attr.contenteditable] = "mode == \'edit\'"\
    [ngClass]="{\'unselectable\': mode != \'edit\'}"  class="elementLabel" >{{ data.config.country.label }}</label>\
    <br>\
    <fieldset [disabled]="mode == \'edit\'">\
    <input [formControlName]="data.config.country.label" class="form-control" [name]="data.config.country.label">\
    <br>\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.config.city.label"  [attr.contenteditable]="mode === \'edit\'"\
     class="elementLabel" [ngClass]="{\'unselectable\': mode != \'edit\'}" >{{ data.config.city.label }}</label>\
    <br>\
    <input style="width:90%" [formControlName]="data.config.city.label" class="form-control">\
    <br>\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.street"\
    [attr.contenteditable] = "mode == \'edit\'"\
    class="elementLabel" [ngClass]="{\'unselectable\': mode != \'edit\'}">{{ data.config.address.label }}</label>\
    <br>\
    <input style="width:90%" [formControlName]="data.config.address.label" class="form-control" >\
    </fieldset>\
    </div>\
    </div>'
})

export class AddressComponent implements IElement, AfterViewChecked {
    group: FormGroup;
    type: Type<any> = AddressComponent;
    name: String = 'AddressComponent';
    data: any;
    mode: any;
    hover: boolean;

    constructor(private listenerCanvasChangesService: ListenCanvasChangesService, private cdRef: ChangeDetectorRef) { }

    updateLabel() {
        this.listenerCanvasChangesService.setDirty(true);
    }

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }
}


@Component({
    selector: 'app-element',
    template: '<div class="formElement" [formGroup]="group" (mouseover)="hover=true" (mouseleave)="hover=false"\
    [ngClass]="{\'over\': hover && mode == \'edit\'}" >\
    <button type="button" name="btn" class="glyphicon glyphicon-remove  btn btn-default btn-xl removeButton"\
    [ngClass]="{\'hide\': !hover || mode !== \'edit\'}"></button>\
    <div style="margin-right: 10px;">\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.config.birthday.label"\
    [attr.contenteditable]="mode == \'edit\'"\
    class="elementLabel" for="birthday" [ngClass]="{\'unselectable\': mode != \'edit\'}"> {{ data.config.birthday.label }} </label>\
    <br>\
    <fieldset [disabled]="mode == \'edit\'">\
    <input [formControlName]="data.config.birthday.label" class="form-control" [(ngModel)]="birthday"\
    [value]="birthday | date: \'shortDate\'" \
     \
    dateTimePicker [pickerType]="\'date\'" [attr.name]="data.config.birthday.label"\
    [autoClose]="\'true\'"/>\
    </fieldset>\
    </div>\
    </div>'
})

export class BirthdayComponent implements IElement, AfterViewChecked {
    group: FormGroup;
    type: Type<any> = BirthdayComponent;
    name: String = 'BirthdayComponent';
    data: any;
    mode: any;
    hover: boolean;
    birthday: any;

    constructor(private listenerCanvasChangesService: ListenCanvasChangesService, private cdRef: ChangeDetectorRef) { }

    updateLabel() {
        this.listenerCanvasChangesService.setDirty(true);
    }

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

}


@Component({
    selector: 'app-element',
    template: '<div class="formElement" [formGroup]="group" (mouseover)="hover=true" (mouseleave)="hover=false"\
    [ngClass]="{\'over\': hover && mode == \'edit\'}" >\
    <button type="button" name="btn" class="glyphicon glyphicon-remove  btn btn-default btn-xl removeButton"\
    [ngClass]="{\'hide\': !hover || mode !== \'edit\'}"></button>\
    <div style="margin-right: 10px;">\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.config.phone.label"\
    [attr.contenteditable]="mode == \'edit\'" class="elementLabel"\
    [ngClass]="{\'unselectable\': mode != \'edit\'}" for="phone"> {{ data.config.phone.label }} </label>\
    <br>\
    <fieldset [disabled]="mode == \'edit\'">\
    <input [formControlName]="data.config.phone.label" type="tel" class="form-control" [attr.name]="data.config.phone.label"\>\
    </fieldset>\
    </div>\
    </div>'
})

export class PhoneComponent implements IElement, AfterViewChecked {
    group: FormGroup;
    type: Type<any> = PhoneComponent;
    name: String = 'PhoneComponent';
    data: any;
    phoneNumber: number;
    mode: any;
    hover: boolean;

    constructor(private listenerCanvasChangesService: ListenCanvasChangesService, private cdRef: ChangeDetectorRef) { }

    updateLabel() {
        this.listenerCanvasChangesService.setDirty(true);
    }

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

}


@Component({
    selector: 'app-element',
    template: '<div class="formElement" [formGroup]="group" (mouseover)="hover=true" (mouseleave)="hover=false"\
    [ngClass]="{\'over\': hover && mode == \'edit\'}" >\
    <button type="button" name="btn" class="glyphicon glyphicon-remove  btn btn-default btn-xl removeButton"\
    [ngClass]="{\'hide\': !hover || mode !== \'edit\'}"></button>\
    <div style="margin-right: 10px;">\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.config.education.label"\
    [attr.contenteditable]="mode == \'edit\'"\
    class="elementLabel" [ngClass]="{\'unselectable\': mode != \'edit\'}" for="education"> {{ data.config.education.label }} </label>\
    <br>\
    <md-radio-group (change)="change($event)" >\
    <md-radio-button value="1">Yes</md-radio-button>\
    <br>\
    <md-radio-button value="0">No</md-radio-button>\
    </md-radio-group>\
    <div *ngIf="hasEducation === \'1\'" [formArrayName]="name">\
    <div *ngFor="let education of group.controls[name].controls;  let i=index" class="panel panel-default">\
    <div class="panel-heading">\
    <span>{{data.config.education.label }} {{i + 1}}</span>\
    <span *ngIf="group.controls[name].controls.length > 1" class="glyphicon glyphicon-remove pull-right"\
     (click)="removeEducation(i)"></span>\
    </div>\
    <div class="panel-body" [formGroupName]="i">\
    <app-education [data]="data" [mode]="mode" [group]="group.controls[name].controls[i]"></app-education>\
    </div>\
    </div>\
    <a *ngIf="mode != \'edit\'"  (click)="addEducation()">Add new field</a>\
    </div>\
    </div>\
    </div>'
})

export class EducationComponent implements IElement, OnInit, AfterViewChecked, OnDestroy {
    group: FormGroup;
    type: Type<any> = EducationComponent;
    name: any = 'EducationComponent';
    data: any;
    mode: any;
    hasEducation: any;
    hover: boolean;
    constructor(private listenerCanvasChangesService: ListenCanvasChangesService,
        private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
    }
    ngOnInit(): void {
        const group = <FormArray>this.group.controls[this.name];
        group.controls = [];
    }

    updateLabel() {
        this.listenerCanvasChangesService.setDirty(true);
    }

    addEducation() {
        const control = <FormArray>this.group.controls[this.name];
        control.push(this.initEducation());
    }

    removeEducation(i: number) {
        const control = <FormArray>this.group.controls[this.name];
        control.removeAt(i);
    }

    initEducation() {
        const group = new FormGroup({});
        for (const item of Object.keys(this.data.config)) {
            group.addControl(this.data.config[item].label, this.fb.control({ value: '', disabled: this.mode === 'edit' }));
        }
        return group;
    }
    change($event) {
        const control = <FormArray>this.group.controls[this.name];
        this.hasEducation = $event.value;
        if ('0' === $event.value) {
            control.controls = [];
        } else {
            control.push(this.initEducation());
        }
    }

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

    ngOnDestroy() {
        const control = <FormArray>this.group.controls[this.name];
        control.controls = [];
    }
}

@Component({
    selector: 'app-education',
    template: '<div>\
    <div class="form-group">\
    <fieldset [formGroup]="group">\
    <label (update)="updateLabel()"\
    [(contenteditableModel)]="data.config.educountry.label" contenteditable="true"  class="elementLabel"\
    [ngClass]="{\'unselectable\': mode != \'edit\'}" >{{ data.config.educountry.label }}</label>\
    <br>\
    <input [formControlName]="data.config.educountry.label" class="form-control" name="eduCountry">\
    <br>\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.config.educity.label" [attr.contenteditable]="mode == \'edit\'"\
    class="elementLabel" [ngClass]="{\'unselectable\': mode != \'edit\'}" >{{ data.config.educity.label }}</label>\
    <input [formControlName]="data.config.educity.label" style="width:90%" class="form-control" name="eduCity">\
    <br>\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.config.university.label"\
     [attr.contenteditable]="mode == \'edit\'"\
    class="elementLabel" [ngClass]="{\'unselectable\': mode != \'edit\'}" >{{ data.config.university.label }}</label>\
    <input [formControlName]="data.config.university.label" type="text" class="form-control" name="eduCity">\
    <br>\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.config.faculty.label"\
    [attr.contenteditable]="mode == \'edit\'"\
    [ngClass]="{\'unselectable\': mode != \'edit\'}"  class="elementLabel" >{{ data.config.faculty.label }}</label>\
    <input [formControlName]="data.config.faculty.label" type="text" class="form-control" name="faculty">\
    <br>\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.years"  [attr.contenteditable]="mode == \'edit\'"\
    class="elementLabel"  [ngClass]="{\'unselectable\': mode != \'edit\'}">{{ data.years }}</label>\
    <br>\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.config.edustart.label"\
    class="elementLabel" [attr.contenteditable]="mode == \'edit\'"\
    [ngClass]="{\'unselectable\': mode != \'edit\'}">{{ data.config.edustart.label }}</label>\
    <input [formControlName]="data.config.edustart.label"  class = "form-control" type="number" min="1900" max="2099"\
     step="1" value="2016" onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null :\
      event.charCode >= 48 && event.charCode <= 57" />\
    <br>\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.config.eduend.label"\
    [ngClass]="{\'unselectable\': mode != \'edit\'}"\
    class="elementLabel" [attr.contenteditable]="mode == \'edit\'">{{ data.config.eduend.label }}</label>\
  <input [formControlName]="data.config.eduend.label"\
   onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : \
   event.charCode >= 48 && event.charCode <= 57" class = "form-control" type="number" min="1900" max="2099" step="1" value="2016" />\
     <br>\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.config.degree.label" [attr.contenteditable]="mode == \'edit\'"\
    [ngClass]="{\'unselectable\': mode != \'edit\'}"  style="margin-top: 10px" class="elementLabel" >{{ data.config.degree.label }}</label>\
    <br>\
    <ng-select [formControlName]="data.config.degree.label" [options]="degrees" [noFilter]="0" ></ng-select>\
    </fieldset>\
    </div>',
})

export class EducationContentComponent {
    @Input('data') data;
    @Input('mode') mode;
    @Input('group') group;
    model: any;
    startValue: any;
    endValue: any;
    degrees: any[] = [
        { label: 'Associate', value: 'Associate' },
        { label: 'Bachelor', value: 'Bachelor' },
        { label: 'Master', value: 'Master' },
        { label: 'Doctoral', value: 'Doctoral' },
        { label: 'Profesional', value: 'Profesional' }
    ];
    constructor(private listenerCanvasChangesService: ListenCanvasChangesService) { }

    updateLabel() {
        this.listenerCanvasChangesService.setDirty(true);
    }
}

@Component({
    selector: 'app-element',
    template: '<div class="formElement" [formGroup]="group" (mouseover)="hover=true" (mouseleave)="hover=false"\
    [ngClass]="{\'over\': hover && mode == \'edit\'}" >\
    <button type="button" name="btn" class="glyphicon glyphicon-remove  btn btn-default btn-xl removeButton"\
    [ngClass]="{\'hide\': !hover || mode !== \'edit\'}"></button>\
    <div style="margin-right: 10px;" [formArrayName]="name">\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.skills"\
     class="elementLabel" [attr.contenteditable]="mode == \'edit\'"\
    [ngClass]="{\'unselectable\': mode != \'edit\'}">{{ data.skills }}</label>\
    <div *ngFor="let skill of formData.controls; let i=index" class="panel panel-default">\
    <div class="panel-heading">\
    <span>{{data.skill}} {{i + 1}}</span>\
    <span *ngIf="formData.controls.length > 1" class="glyphicon glyphicon-remove pull-right" (click)="removeSkill(i)"></span>\
    </div>\
    <div class="panel-body">\
    <app-skill [data]="data" [mode]="mode" [group]="formData.controls[i]"></app-skill>\
    </div>\
    </div>\
    <a (click)="addSkill()" *ngIf="mode != \'edit\'"  [attr.disabled]="mode == \'edit\'">Add new field</a>\
   </div>\
    </div>'
})

export class SkillsComponent implements IElement, OnInit, OnDestroy, OnChanges {
    group: FormGroup;
    type: Type<any> = SkillsComponent;
    name: any = 'SkillsComponent';
    data: any;
    mode: any;
    hover: boolean;
    skills: SkillsContentComponent[] = [];


    constructor(private listenerCanvasChangesService: ListenCanvasChangesService, private fb: FormBuilder, private cdRef: ChangeDetectorRef) {
    }


    ngOnInit(): void {
        setTimeout(() => {
            const group = <FormArray>this.group.controls[this.name];
            group.controls = [];
            this.addSkill();
        }, 50);
    }

    get formData() { return <FormArray>this.group.get(this.name); }


    updateLabel() {
        this.listenerCanvasChangesService.setDirty(true);
    }

    addSkill() {
        const control = <FormArray>this.group.controls[this.name];
        control.push(this.initSkill());
    }

    removeSkill(i: number) {
        const control = <FormArray>this.group.controls[this.name];
        control.removeAt(i);
    }

    initSkill() {
        const group = new FormGroup({});
        for (const item of Object.keys(this.data.config)) {
            group.addControl(this.data.config[item].label, this.fb.control({ value: '', disabled: this.mode === 'edit' }));
        }
        return group;
    }

    ngOnChanges() {
        this.cdRef.detectChanges();
    }

    ngOnDestroy() {
        const control = <FormArray>this.group.controls[this.name];
        control.controls = [];
    }
}


@Component({
    selector: 'app-skill',
    template: '<label (update)="updateLabel()"\
    [(contenteditableModel)]="data.config.name.label" [attr.contenteditable]="mode == \'edit\'"\
    [ngClass]="{\'unselectable\': mode != \'edit\'}"  class="elementLabel" >{{ data.config.name.label }}</label>\
    <fieldset [formGroup]="group">\
    <input [formControlName]="data.config.name.label" type="text" class="form-control" name="skill">\
    <br>\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.config.range.label"\
    [ngClass]="{\'unselectable\': mode != \'edit\'}"\
    class="elementLabel" [attr.contenteditable]="mode == \'edit\'">{{ data.config.range.label }}</label>\
    <br>\
    <md-radio-group [(ngModel)]="value" [formControlName]="data.config.range.label" \
    *ngFor="let level of levels" >\
    <md-radio-button [value]="level.value"> {{ level.description }}</md-radio-button>\
    <span class="glyphicon glyphicon-question-sign question" (click)="level.help.show = !level.help.show"></span>\
    <div class="help" *ngIf="level.help.show">{{ level.help.text }}</div>\
    <br>\
    </md-radio-group>\
   </fieldset>'
})

export class SkillsContentComponent {
    @Input('data') data;
    @Input('mode') mode;
    @Input('group') group;

    levels: any[] = [
        {
            'value': 'Beginner',
            'description': ' 1 - Beginner',
            'help': {
                'text': 'You\'re just starting to explore this skill',
                'show': false
            }
        },
        {
            'value': 'Familiar',
            'description': '2 - Familiar',
            'help': {
                'text': 'You have basic knowledge of this skill,\
                     but plenty of room to learn more',
                'show': false
            }
        },
        {
            'value': 'Proficient',
            'description': '3 - Proficient',
            'help': {
                'text': 'You\'re comfortable using this skill in\
                         routine ways',
                'show': false
            }
        },
        {
            'value': 'Expert',
            'description': '4 - Expert',
            'help': {
                'text': 'You\'re ahead of the pack and are fluent\
                     in this skill and its latest developments',
                'show': false
            }
        },
        {
            'value': 'Master',
            'description': '5 - Master',
            'help': {
                'text': 'You\'re pro, and know this skill inside and out',
                'show': false
            }
        }
    ]
    constructor(private listenerCanvasChangesService: ListenCanvasChangesService) { }

    updateLabel() {
        this.listenerCanvasChangesService.setDirty(true);
    }
}

@Component({
    selector: 'app-element',
    template: '<div class="formElement" [formGroup]="group" (mouseover)="hover=true" (mouseleave)="hover=false"\
    [ngClass]="{\'over\': hover && mode == \'edit\'}" >\
    <button type="button" name="btn" class="glyphicon glyphicon-remove  btn btn-default btn-xl removeButton"\
    [ngClass]="{\'hide\': !hover || mode !== \'edit\'}"></button>\
    <div style="margin-right: 10px;">\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.config.status.label"\
    [ngClass]="{\'unselectable\': mode != \'edit\'}"\
    [attr.contenteditable]="mode == \'edit\'"  class="elementLabel" for="status"> {{ data.config.status.label }} </label>\
    <br>\
    <md-radio-group [formControlName]="data.config.status.label">\
    <md-radio-button value="married">Married</md-radio-button>\
    <br>\
    <md-radio-button value="single">Single</md-radio-button>\
    </md-radio-group>\
    </div>\
    </div>'
})

export class FamilyStatusComponent implements IElement, AfterViewChecked {
    group: FormGroup;
    type: Type<any> = FamilyStatusComponent;
    name: String = 'FamilyStatusComponent';
    data: any;
    mode: any;
    hover: boolean;
    constructor(private listenerCanvasChangesService: ListenCanvasChangesService, private cdRef: ChangeDetectorRef) { }

    updateLabel() {
        this.listenerCanvasChangesService.setDirty(true);
    }

    ngAfterViewChecked(): void {
        this.cdRef.detectChanges();
    }

}


@Component({
    selector: 'app-element',
    template: '<div class="formElement" [formGroup]="group" (mouseover)="hover=true" (mouseleave)="hover=false"\
    [ngClass]="{\'over\': hover && mode == \'edit\'}" >\
    <button type="button" name="btn" class="glyphicon glyphicon-remove  btn btn-default btn-xl removeButton"\
    [ngClass]="{\'hide\': !hover || mode !== \'edit\'}"></button>\
    <div style="margin-right: 10px;">\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.config.image.label"\
    [ngClass]="{\'unselectable\': mode != \'edit\'}"\
    [attr.contenteditable]="mode == \'edit\'" class="elementLabel" for="image"> {{ data.config.image.label }} </label>\
    <br>\
    <fieldset [disabled]="mode == \'edit\'">\
    <fancy-image-uploader #img [options]="options" [formControlName]="data.config.image.label"></fancy-image-uploader>\
    </fieldset>\
    </div>\
    </div>'
})

export class ImageComponent implements IElement {
    group: FormGroup;
    type: Type<any> = ImageComponent;
    name: String = 'ImageComponent';
    data: any;
    mode: any;
    hover: boolean;
    @ViewChild('img') img;
    options: FancyImageUploaderOptions = {
        thumbnailHeight: 150,
        thumbnailWidth: 150,
        uploadUrl: '/forms/upload',
        allowedImageTypes: ['image/png', 'image/jpeg'],
        maxImageSize: 4
    };

    constructor(private listenerCanvasChangesService: ListenCanvasChangesService) { }

    updateLabel() {
        this.listenerCanvasChangesService.setDirty(true);
    }

}

@Component({
    selector: 'app-element',
    template: '<div class="formElement"  (mouseover)="hover=true" (mouseleave)="hover=false"\
     [ngClass]="{\'over\': hover && mode == \'edit\'}" >\
     <button type="button" name="btn" class="glyphicon glyphicon-remove  btn btn-default btn-xl removeButton"\
     [ngClass]="{\'hide\': !hover || mode !== \'edit\'}"></button>\
     <div style="margin-right: 10px;">\
     <div *ngIf="mode === \'edit\'">\
     <label class="elementLabel" >Select your prefered dates for exam</label><br>\
     <label for="startDate" class="elementLabel timeLabel">Start date</label><br>\
     <div class="input-group">\
     <input class="form-control" [value]="data.startDate | date: shortDate"\
      [(ngModel)]="data.startDate" (ngModelChange)="data.days = this.getDates(data.startDate, data.endDate)"\
     dateTimePicker [autoClose]="\'true\'" [pickerType]="\'date\'" [mode]="\'dropdown\'"/>\
     <span class="input-group-addon">\
     <span class="glyphicon glyphicon-calendar"></span>\
     </span>\
     </div>\
     <br>\
      <label for="endDate" class="elementLabel timeLabel">End date</label><br>\
      <div class="input-group">\
      <input class="form-control" [value]="data.endDate | date: shortDate"\
       [(ngModel)]="data.endDate"  (ngModelChange)="data.days = this.getDates(data.startDate, data.endDate)"\
      dateTimePicker [autoClose]="\'true\'" [pickerType]="\'date\'" [mode]="\'dropdown\'"/>\
      <span class="input-group-addon">\
      <span class="glyphicon glyphicon-calendar"></span>\
      </span>\
      </div>\
      <br>\
     <label for="startTime" class="elementLabel timeLabel">Start time</label><br>\
     <div class="input-group clockpicker">\
     <input type="time" [(ngModel)]="data.startTime" class="form-control" value="21:30"\
      (ngModelChange)="data.times = this.getHoursRange(data.startTime, data.endTime)" >\
     <span class="input-group-addon">\
     <span class="glyphicon glyphicon-time"></span>\
     </span>\
     </div>\
     <br>\
     <label for="endTime" class="elementLabel timeLabel">End time</label><br>\
     <div class="input-group">\
     <input type="time" class="form-control" [(ngModel)]="data.endTime" value="09:30"\
      (ngModelChange)="data.times = this.getHoursRange(data.startTime, data.endTime)" >\
     <span class="input-group-addon">\
     <span class="glyphicon glyphicon-time"></span>\
     </span>\
     </div>\
     <br>\
     <label style="margin-top: 20px">User mode: </label>\
     <br>\
     </div>\
     <div>\
     <br>\
     <fieldset [formGroup]="group">\
     <label (update)="updateLabel()" [(contenteditableModel)]="data.config.firstDay.label"\
     [attr.contenteditable]="mode == \'edit\'" class="elementLabel"\
     [ngClass]="{\'unselectable\': mode != \'edit\'}" for="exams" style="margin-top: 10px"> {{ data.config.firstDay.label }} </label>\
     <ng-select [disabled]="mode === \'edit\'" [(options)]="data.days" (selected)="startDaySelected($event)"></ng-select>\
      <input type="hidden" [(ngModel)]="startDay" [formControlName]="data.config.firstDay.label">\
     <br>\
     <label (update)="updateLabel()" [(contenteditableModel)]="data.config.lastDay.label"\
     [attr.contenteditable]="mode == \'edit\'" class="elementLabel"\
     [ngClass]="{\'unselectable\': mode != \'edit\'}" for="exams" style="margin-top: 10px"> {{ data.config.lastDay.label }} </label>\
     <ng-select [disabled]="mode === \'edit\'" [(options)]="data.days" (selected)="endDaySelected($event)"></ng-select>\
     <input type="hidden" [(ngModel)]="startDay" [formControlName]="data.config.lastDay.label">\
     <br>\
     <label (update)="updateLabel()" [(contenteditableModel)]="data.config.firstTime.label"\
     [attr.contenteditable]="mode == \'edit\'" class="elementLabel"\
     [ngClass]="{\'unselectable\': mode != \'edit\'}" for="exams" style="margin-top: 10px" > {{ data.config.firstTime.label }} </label>\
     <ng-select [disabled]="mode === \'edit\'" [(options)]="data.times" (selected)="startTimeSelected($event)"></ng-select>\
     <input type="hidden" [(ngModel)]="startTime" [formControlName]="data.config.firstTime.label">\
     <br>\
     <label (update)="updateLabel()" [(contenteditableModel)]="data.config.lastTime.label"\
     [attr.contenteditable]="mode == \'edit\'" class="elementLabel"\
     [ngClass]="{\'unselectable\': mode != \'edit\'}" for="exams" style="margin-top: 10px"> {{ data.config.lastTime.label  }} </label>\
     <ng-select [disabled]="mode === \'edit\'" [(options)]="data.times"  (selected)="endTimeSelected($event)"></ng-select>\
     <input type="hidden" [(ngModel)]="endTime" [formControlName]="data.config.lastTime.label">\
     </fieldset>\
     </div>\
     </div>\
     </div>'
})

export class ExamsComponent implements IElement {
    group: FormGroup;
    type: Type<any> = ExamsComponent;
    name: String = 'ExamsComponent';
    data: any;
    mode: any;
    hover: boolean;
    momentValue: any;
    selectedTime: any;
    startDay: any;
    endDay: any;
    startTime: any;
    endTime: any;

    constructor(private listenerCanvasChangesService: ListenCanvasChangesService) {
    }

    updateLabel() {
        this.listenerCanvasChangesService.setDirty(true);
    }

    getHoursRange(startTime, endTime) {
        if (!startTime && endTime) {
            startTime = endTime;
        }

        if (!endTime && startTime) {
            endTime = startTime;
        }

        if (!endTime && !startTime) {
            return [];
        }

        const firstTime = parseInt(startTime.slice(0, startTime.indexOf(':')), 10);
        let lastTime = parseInt(endTime.slice(0, endTime.indexOf(':')), 10);
        const minutes = startTime.slice(startTime.indexOf(':') + 1);
        const times = [];
        if (lastTime === 0) {
            lastTime = 24;
        }
        for (let i = firstTime; i <= lastTime; i++) {
            let time = i + ':' + minutes;
            if (i < 10 && time[0] !== '0') {
                time = '0' + time;
            }
            times.push({ 'label': time });
        }
        return times;
    }

    getDates(startDate, endDate) {
        if (!startDate && endDate) {
            startDate = endDate;
        }

        if (!endDate && startDate) {
            endDate = startDate;
        }

        if (!endDate && !startDate) {
            return [];
        }
        let dates = [],
            currentDate = startDate;
        const addDays = function (days) {
            const date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        };
        while (currentDate <= endDate) {
            dates.push(new DatePipe('enUs').transform(currentDate, 'shortDate'));
            currentDate = addDays.call(currentDate, 1);
        }

        dates = dates.map(key => {
            const output = {};
            output['label'] = key;
            return output;
        });
        return dates;
    }

    startDaySelected(item) {
            this.startDay = item.label;
    }

    endDaySelected(item) {
        this.endDay = item.label;
    }

    startTimeSelected(item) {
        this.startTime = item.label;
    }

    endTimeSelected(item) {
        this.endTime = item.label;
    }
}

@Component({

    selector: 'app-element',
    template: '<div class="formElement" [formGroup]="group" (mouseover)="hover=true" (mouseleave)="hover=false"\
    [ngClass]="{\'over\': hover && mode == \'edit\'}" >\
    <button type="button" name="btn" class="glyphicon glyphicon-remove  btn btn-default btn-xl removeButton"\
    [ngClass]="{\'hide\': !hover || mode !== \'edit\'}"></button>\
    <div style="margin-right: 10px;">\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.work"\
    [ngClass]="{\'unselectable\': mode != \'edit\'}"\
    [attr.contenteditable]="mode == \'edit\'"  class="elementLabel"  for="work"> {{ data.work }} </label>\
    <br>\
    <md-radio-group (change)="change($event)" >\
    <md-radio-button value="1">Yes</md-radio-button>\
    <br>\
    <md-radio-button value="0">No</md-radio-button>\
    </md-radio-group>\
    <div *ngIf="worked === \'1\'" [formArrayName]="name">\
    <div *ngFor="let work of group.controls[name].controls; let i=index" class="panel panel-default">\
    <div class="panel-heading">\
    <span>{{data.work}} {{i + 1}}</span>\
    <span *ngIf="group.controls[name].controls.length > 1" class="glyphicon glyphicon-remove pull-right" (click)="removeWork(i)"></span>\
    </div>\
    <div class="panel-body">\
    <app-work [data]="data" [mode]="mode" [group]="group.controls[name].controls[i]"></app-work>\
    </div>\
    </div>\
    <a *ngIf="mode != \'edit\'" (click)="addWork()">Add new field</a>\
    </div>\
    </div>\
    </div>'
})

export class WorkExperienceComponent implements IElement, OnInit, OnDestroy {
    group: FormGroup;
    type: Type<any> = WorkExperienceComponent;
    name: any = 'WorkExperienceComponent';
    data: any;
    mode: any;
    worked: any;
    hover: boolean;
    works: WorkContentComponent[] = [];
    constructor(private listenerCanvasChangesService: ListenCanvasChangesService, private fb: FormBuilder) {
    }

    ngOnInit(): void {
        const group = <FormArray>this.group.controls[this.name];
        group.controls = [];
    }

    updateLabel() {
        this.listenerCanvasChangesService.setDirty(true);
    }

    addWork() {
        const control = <FormArray>this.group.controls[this.name];
        control.push(this.initWork());
    }

    removeWork(i: number) {
        const control = <FormArray>this.group.controls[this.name];
        control.removeAt(i);
    }

    initWork() {
        const group = new FormGroup({});
        for (const item of Object.keys(this.data.config)) {
            group.addControl(this.data.config[item].label, this.fb.control({ value: '', disabled: this.mode === 'edit' }));
        }
        return group;
    }
    change($event) {
        const control = <FormArray>this.group.controls[this.name];
        this.worked = $event.value;
        if ('0' === $event.value) {
            control.controls = [];
        } else {
            control.push(this.initWork());
        }
    }

    ngOnDestroy() {
        const control = <FormArray>this.group.controls[this.name];
        control.controls = [];
    }
}

@Component({
    selector: 'app-work',
    template: '<div>\
    <div class="form-group" [formGroup]="group">\
    <fieldset [disabled]="mode == \'edit\'">\
    <br>\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.config.place.label" [attr.contenteditable]="mode == \'edit\'"\
    [ngClass]="{\'unselectable\': mode != \'edit\'}"  class="elementLabel" >{{ data.config.place.label }}</label>\
    <input type="text" [formControlName]="data.config.place.label" class="form-control">\
    <br>\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.config.speciality.label"\
    [ngClass]="{\'unselectable\': mode != \'edit\'}"\
    class="elementLabel"  [attr.contenteditable]="mode == \'edit\'">{{ data.config.speciality.label }}</label>\
    <input type="text" [formControlName]="data.config.speciality.label" class="form-control">\
    <br>\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.years"\
    [ngClass]="{\'unselectable\': mode != \'edit\'}"\
    class="elementLabel" [attr.contenteditable]="mode == \'edit\'">{{ data.years }}</label>\
    <br>\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.config.start.label"\
    [ngClass]="{\'unselectable\': mode != \'edit\'}"\
    class="elementLabel" [attr.contenteditable]="mode == \'edit\'"  >{{ data.config.start.label }}</label>\
    <input [formControlName]="data.config.start.label"\
   onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : \
   event.charCode >= 48 && event.charCode <= 57" class = "form-control" type="number" min="1900" max="2099" step="1" value="2016" />\
     <br>\
    <br>\
    <label (update)="updateLabel()" [(contenteditableModel)]="data.config.end.label"\
    class="elementLabel" [ngClass]="{\'unselectable\': mode != \'edit\'}"\
    [attr.contenteditable]="mode == \'edit\'">{{ data.config.end.label }}</label>\
    <input [formControlName]="data.config.end.label"\
   onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : \
   event.charCode >= 48 && event.charCode <= 57" class = "form-control" type="number" min="1900" max="2099" step="1" value="2016" />\
    <br>\
    </fieldset>\
    </div>',
})

export class WorkContentComponent {
    @Input('data') data;
    @Input('mode') mode;
    @Input('group') group;

    model: any;
    startValue: any;
    endValue: any;

    constructor(private listenerCanvasChangesService: ListenCanvasChangesService) { }

    updateLabel() {
        this.listenerCanvasChangesService.setDirty(true);
    }
}
