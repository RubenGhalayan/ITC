import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './app.router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { HomeComponent } from './components/home/home.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { MyFormsComponent } from './components/my-forms/my-forms.component';
import { HeaderComponent } from './components/fragments/header/header.component';
import { SlideBarComponent } from './components/fragments/slide-bar/slide-bar.component';
import { DragulaModule } from 'ng2-dragula';
import { MenuButtonsComponent } from './components/fragments/toolbar/toolbar.component';
import { PopUpComponent } from './components/fragments/pop-up/pop-up.component';
import { MaterialModule } from '@angular/material';
import { MdCheckboxModule } from '@angular/material';
import { MdSidenavModule } from '@angular/material';
import { ContextMenuModule } from 'ngx-contextmenu';
import { MdTabsModule } from '@angular/material';
import 'hammerjs';
import { SlideBarService } from './services/slide-bar/slide-bar.service';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { DataTableComponent } from './components/my-forms/data-table/data-table.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MdSelectModule } from '@angular/material';
import { MdPaginatorModule } from '@angular/material';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { Ng2FloatBtnModule } from 'ng2-float-btn';
import { HttpModule } from '@angular/http';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { Authentication } from './services/_auth/authentication';
import { UserService } from './services/_user/user.service';
import { HttpClient } from './services/HttpClient';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { FormsService } from './services/forms/forms.service';
import {
    IElement, FullNameComponent, EmailComponent, AddressComponent, BirthdayComponent, PhoneComponent,
    EducationComponent, EducationContentComponent, SkillsComponent, SkillsContentComponent,
    FamilyStatusComponent, ImageComponent, ExamsComponent, WorkExperienceComponent, WorkContentComponent
} from './components/fragments/elements/element.component';
import { FormsDirective } from './common/forms/forms.directive';
import { ContenteditableModelDirective } from './common/contenteditable/contenteditable-model.directive';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MdRadioModule, MdSliderModule } from '@angular/material';
import { SelectModule } from 'ng-select';
import { FancyImageUploaderModule } from 'ng2-fancy-image-uploader';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { BusyModule } from 'angular2-busy';
import { PublishedFormComponent, PublishedLinkComponent } from './components/published-form/published-form.component';
import { NotFoundComponent } from './components/fragments/not-found/not-found.component';
import { PreviewFormComponent } from './components/fragments/preview-form/preview-form.component';
import { QuestionDialogComponent } from './components/fragments/question-dialog/question-dialog.component';
import { ListenCanvasChangesService } from './services/canvas/canvas.service';
import { SharedFormComponent } from './components/fragments/shared-form/shared-form.component';
import { CvComponent } from './components/fragments/cv/cv.component';
import { ScheduleComponent } from './components/fragments/schedule/schedule.component';
import { OrderbyPipe } from './common/orderby-pipe/orderby.pipe';
import { KeysPipe } from './common/keys-pipe/keys.pipe';
import { GeneratedScheduleComponent } from './components/fragments/schedule/generated-schedule/generated-schedule.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginRegisterComponent,
        HomeComponent,
        CreateFormComponent,
        MyFormsComponent,
        HeaderComponent,
        PopUpComponent,
        SlideBarComponent,
        MenuButtonsComponent,
        DataTableComponent,
        FormsDirective,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        FullNameComponent,
        EmailComponent,
        AddressComponent,
        BirthdayComponent,
        SkillsComponent,
        SkillsContentComponent,
        PhoneComponent,
        EducationComponent,
        EducationContentComponent,
        FamilyStatusComponent,
        ImageComponent,
        ExamsComponent,
        WorkExperienceComponent,
        WorkContentComponent,
        ContenteditableModelDirective,
        PublishedFormComponent,
        PublishedLinkComponent,
        NotFoundComponent,
        OrderbyPipe,
        PreviewFormComponent,
        QuestionDialogComponent,
        SharedFormComponent,
        CvComponent,
        ScheduleComponent,
        KeysPipe,
        GeneratedScheduleComponent
    ],
    imports: [
        BrowserModule,
        routing,
        CommonModule,
        ReactiveFormsModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        MaterialModule,
        Ng2FloatBtnModule,
        BrowserAnimationsModule,
        ContextMenuModule,
        MdSidenavModule,
        MdTabsModule,
        MdCheckboxModule,
        Ng2TableModule,
        PaginationModule.forRoot(),
        FormsModule,
        MdSelectModule,
        DragulaModule,
        MdPaginatorModule,
        HttpModule,
        ToastModule.forRoot(),
        BsDropdownModule.forRoot(),
        MdRadioModule,
        MdSliderModule,
        FancyImageUploaderModule,
        DateTimePickerModule,
        MdSliderModule,
        SelectModule,
        BusyModule
    ],
    providers: [SlideBarService, Authentication, HttpClient, UserService, FormsService, ListenCanvasChangesService],
    bootstrap: [AppComponent],
    entryComponents: [SharedFormComponent, PreviewFormComponent, QuestionDialogComponent, FullNameComponent,
        EmailComponent, AddressComponent, BirthdayComponent, PhoneComponent, EducationComponent, EducationContentComponent, SkillsComponent,
        FamilyStatusComponent, ImageComponent, ExamsComponent,
        WorkExperienceComponent, PublishedLinkComponent, ScheduleComponent,CvComponent, GeneratedScheduleComponent],
    exports: [CommonModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule],
})

export class AppModule { }
