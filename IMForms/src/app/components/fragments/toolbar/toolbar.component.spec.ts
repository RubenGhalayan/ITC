import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuButtonsComponent } from './toolbar.component';

describe('MenuButtonsComponent', () => {
    let component: MenuButtonsComponent;
    let fixture: ComponentFixture<MenuButtonsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MenuButtonsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuButtonsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
