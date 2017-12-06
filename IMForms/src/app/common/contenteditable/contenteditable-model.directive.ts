import { Directive, ElementRef, Input, Output, EventEmitter, OnChanges, HostListener } from '@angular/core';
import { ɵlooseIdentical as looseIdentical } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[contenteditableModel]',
})

export class ContenteditableModelDirective implements OnChanges {
    // tslint:disable-next-line:no-input-rename
    @Input('contenteditableModel') model: any;
    // tslint:disable-next-line:no-output-rename
    @Output('contenteditableModelChange') update = new EventEmitter();

    private lastViewModel: any;

    constructor(private elRef: ElementRef) {
    }

    ngOnChanges(changes) {
        if (this.isPropertyUpdated(changes, this.lastViewModel)) {
            this.lastViewModel = this.model
            this.refreshView()
        }
    }

    @HostListener('blur') onBlur() {
        const value = this.elRef.nativeElement.innerText;
        this.lastViewModel = value;
        this.update.emit(value);
    }

    private refreshView() {
        this.elRef.nativeElement.innerText = this.model;
    }

    private isPropertyUpdated(changes: { [key: string]: any }, viewModel: any): boolean {
        if (!changes.hasOwnProperty('model')) { return false };
        const change = changes['model'];
        if (change.isFirstChange()) { return true };
        return !looseIdentical(viewModel, change.currentValue);
    }
}
