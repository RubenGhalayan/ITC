import { Injectable } from '@angular/core';
import { MdSidenav } from '@angular/material';

@Injectable()
export class SlideBarService {
    private sidenav: MdSidenav;
    public opened: boolean;

    public setSidenav(sidenav: MdSidenav) {
        this.sidenav = sidenav;
        this.opened = this.sidenav.opened;
    }

    public open() {
        this.opened = !this.sidenav.opened;
        return this.sidenav.open();
    }

    public close() {
        return this.sidenav.close();
    }

    public toggle(isOpen?: boolean) {
        return this.sidenav.toggle(isOpen);
    }
}
