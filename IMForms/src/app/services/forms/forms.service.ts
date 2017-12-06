import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { FormsDirective } from '../../common/forms/forms.directive';
import * as element from '../../components/fragments/elements/element.component';
import { IElement } from '../../components/fragments/elements/element.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class FormsService {
    private id: String;
    private form: String;
    private selected: Array<any> = [];
    private config = [];
    private fb: FormBuilder = new FormBuilder();
    private formGroup: FormGroup;

    public  getFormGroup() {
        return this.formGroup;
    }

    public setFormGroup (form: any) {
        this.formGroup = form;
    }

    public setSelected(selected: Array<any> = []) {
        this.selected = selected
    }

    public getSelected() {
        return this.selected;
    }

    public setForm(form: String) {
        this.form = form;
    }

    public getForm() {
        return this.form;
    }

    public setId(id) {
        this.id = id;
    }

    public getId() {
        return this.id;
    }

    public drawElement(type: any, data: any, mode: any, container: ViewContainerRef, factory: ComponentFactoryResolver, index?: number) {
        const elem = new element[type];
        const componentFactory = factory.resolveComponentFactory(elem.type);
        const componentRef = container.createComponent(componentFactory, index);
        (<IElement>componentRef.instance).data = JSON.parse(JSON.stringify(data));
        (<IElement>componentRef.instance).mode = mode;
        if (!this.formGroup) {
            this.formGroup = new FormGroup({});
        }
        const disabled = mode === 'edit';
        const invalid = ['EducationComponent', 'SkillsComponent', 'WorkExperienceComponent'];
        for (const key of Object.keys(data.config)) {
            this.config.push( {
                'name' : data.config[key].label,
                'validation': data.config[key].validation
            });
        }
        if (invalid.indexOf(type) === -1) {
            this.config.forEach(control => {
                this.formGroup.addControl(control['name'], this.fb.control({value: '',  disabled: disabled}))
            });
        } else {
            this.formGroup.addControl(type, this.fb.array([]));
        }
        (<IElement>componentRef.instance).group = this.formGroup;
        return componentRef;
    }

    public drawForm(form: any, mode: any, container: ViewContainerRef, factory: ComponentFactoryResolver) {
        container.clear();
        if (mode === 'preview') {
            this.formGroup = new FormGroup({});
        }
        const elements: ComponentRef<{}>[] = [];
        let key: any;
        let length: number;
        if (form) {
            const formData: any[] = Object.keys(form);
            if (formData.indexOf('id') !== -1) {
                length = formData.length - 1;
            } else {
                length = formData.length;
            }
            for (let i = 0; i < length; ++i) {
                key = 'element' + (i + 1).toString();
                const type = form[key].type;
                const data = Object.assign({}, form[key].data);
                elements.push(this.drawElement(type, data, mode, container, factory));
            }
        }
        return elements;
    }

    public saveForm(formData: ComponentRef<{}>[], title: any) {
        const form: any = {};
        form['title'] = title;
        form['description'] = {};
        for (let i = 0; i < formData.length; ++i) {
            const key = 'element' + (i + 1).toString();
            form['description'][key] = { 'type': '', 'data': {} };
            form['description'][key].type = (<IElement>formData[i].instance).name;
            form['description'][key].data = (<IElement>formData[i].instance).data;
        }
        return form;
    }
}
