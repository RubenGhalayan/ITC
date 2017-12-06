import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SlideBarService } from '../../../services/slide-bar/slide-bar.service'
import { UserService } from '../../../services/_user/user.service';
import { ListenCanvasChangesService } from '../../../services/canvas/canvas.service';
import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})

export class HeaderComponent implements OnInit {
    changeHeader = false;
    isLogin = true;
    isHome = false;
    isCreate = false;
    isForms = false;
    public userName = localStorage.getItem('name');
    @ViewChild(PopUpComponent) dialog: PopUpComponent;

    constructor(private router: Router,
                private slidebarService: SlideBarService,
                private userService: UserService,
                private listenCanvasChangeService: ListenCanvasChangesService) { }

    ngOnInit() {
        this.router.events.subscribe(event => this.modifyHeader(event));
    }

    modifyHeader(location) {
        this.userName = localStorage.getItem('name');
        const resetRegexp = /\/reset-password\/*/g;
        const reset = resetRegexp.test(location.url);
        this.isLogin = (reset || location.url === '/forgot-password' || location.url === '/login-register' || location.url === '/');
        this.isHome = (location.url === '/home' || location.url !== '/login-register'
            && !reset && location.url !== '/forgot-password'
            && location.url !== '/create-form' && location.url !== '/my-forms' && location.url !== '/');
        this.isCreate = (location.url === '/create-form');
        this.isForms = (location.url === '/my-forms');
    }

    public toggleSidenav() {
        this.changeHeader = !this.changeHeader;
        this.slidebarService
            .toggle();
        this.slidebarService.opened = true;
    }

    public sidenavOpened() {
        return this.slidebarService.opened && window.innerWidth < 768;
    }

    Logout() {
        this.dialog.open(QuestionDialogComponent, 'LOG OUT', 'Are you sure you want to log out?', 'auto');
        this.dialog.dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.userService.Logout();
            }
        });
    }

    goLogin() {
        this.router.navigate(['./login-register']);
    }
    goHome() {
        if (this.listenCanvasChangeService.checkDirty()) {
              this.dialog.open(QuestionDialogComponent, 'IMForms',
                  `Are you sure you want to leave this page without saving your changes?`, 'auto');
              this.dialog.dialogRef.afterClosed().subscribe(result => {
                  if (result === true) {
                      this.router.navigate(['./home']);
                      this.listenCanvasChangeService.setDirty(false);
                  }
              });
        } else {
            this.router.navigate(['./home']);
        }
    }

    public goMyForms() {
        if (this.listenCanvasChangeService.checkDirty()) {
            this.dialog.open(QuestionDialogComponent, 'IMForms',
              `Are you sure you want to leave this page without saving your changes?`, 'auto');
            this.dialog.dialogRef.afterClosed().subscribe(result => {
                if (result === true) {
                    this.router.navigate(['./my-forms']);
                    this.listenCanvasChangeService.setDirty(false);
                }
            });
        } else {
            this.router.navigate(['./my-forms']);
        }
    }
}
