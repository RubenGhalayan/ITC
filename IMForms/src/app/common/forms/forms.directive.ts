import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appForms]'
})

export class FormsDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
