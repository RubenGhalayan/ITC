import { Component } from '@angular/core';
import { SlideBarService } from './services/slide-bar/slide-bar.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'app';
    constructor(private slidebarService: SlideBarService) { }
}
