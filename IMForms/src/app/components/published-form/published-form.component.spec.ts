import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PublishedFormComponent } from './published-form.component';

describe('PublishedFormComponent', () => {
    let component: PublishedFormComponent;
    let fixture: ComponentFixture<PublishedFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PublishedFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PublishedFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
