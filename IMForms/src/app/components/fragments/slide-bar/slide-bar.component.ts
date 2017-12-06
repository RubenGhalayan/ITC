import { Component, Input, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { SlideBarService } from '../../../services/slide-bar/slide-bar.service';
import { MyFormsComponent } from '../../my-forms/my-forms.component';

@Component({
    selector: 'app-slide-bar',
    templateUrl: './slide-bar.component.html',
    styleUrls: ['./slide-bar.component.less'],
})
export class SlideBarComponent implements OnInit {
    @ViewChild('sidenav') sidenav: any;
    @Input('content') content: any;
    @Input('otherForms') otherForms: any;
    @Input('open') open: any;
    @Input('clicked') clicked: any;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.configureSideNav();
    }

    configureSideNav() {
        const smallScreen = window.innerWidth < 768;
        if (smallScreen === false) {
            this.sidenav.mode = 'side';
            this.sidenav.opened = true;
        } else if (this.sidenav.mode === 'side') {
            this.sidenav.mode = 'over';
            this.sidenav.opened = false;
        }
    }

    public constructor(private slidebarService: SlideBarService) { }

    ngOnInit() {
        this.slidebarService
            .setSidenav(this.sidenav);
    }

    isDesktop () {
        return window.innerWidth >= 768;
    }
}
