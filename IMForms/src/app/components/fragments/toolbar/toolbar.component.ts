import { Component, OnInit, Input } from '@angular/core';
import { Ng2FloatBtnComponent, Ng2FloatBtn } from 'ng2-float-btn';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css'],
})

export class MenuButtonsComponent implements OnInit {
    @Input ('buttons') buttons: any;
    @Input ('direction') direction: any;
    mainButton: Ng2FloatBtn;
    constructor() {
        this.mainButton = {
            color: 'primary',
            iconName: 'list'
        };
    }

    ngOnInit() { }

    isMobile(): boolean {
        return window.innerWidth < 768;
    }
}
