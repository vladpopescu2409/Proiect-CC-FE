import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';

import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './components/user/user.component';
import { AddUserModalComponent } from './components/add-user-modal/add-user-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModuleComponent } from './components/login-module/login-module.component';
import { AdminUsersTableComponent } from './components/admin-users-table/admin-users-table.component';

import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewsletterPageComponent } from './pages/newsletter-page/newsletter-page.component';
import { NewsletterArticleComponent } from './components/newsletter-article/newsletter-article.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddArticleModalComponent } from './components/add-article-modal/add-article-modal.component';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullDetailedArticleComponent } from './components/full-detailed-article/full-detailed-article.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';

import { HasRoleDirective } from './directives/has-role.directive';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

import { MatIconModule } from '@angular/material/icon';
import { FaqPageComponent } from './pages/faq-page/faq-page.component';
import { FaqSectionComponent } from './components/faq-section/faq-section.component';
import { AddFaqModalComponent } from './components/add-faq-modal/add-faq-modal.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';


import { NgxPaginationModule } from 'ngx-pagination';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

//for uploading documents -> https://owrrpon.medium.com/angular-material-file-uploader-b78aa070f77d (if we want the more evolved version)
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRippleModule} from '@angular/material/core';

import { RequestsPageComponent } from './pages/requests-page/requests-page.component';
import { RequestsUserComponent } from './components/requests-user/requests-user.component';
import { RequestsHrComponent } from './components/requests-hr/requests-hr/requests-hr.component';


import { RequestEachComponent } from './components/request-each/request-each/request-each.component';
import { RequestDetailsModalComponent } from './components/request-details-modal/request-details-modal/request-details-modal.component';

import { FeedbackPageComponent } from './pages/feedback-page/feedback-page.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SecondNavbarComponent } from './components/second-navbar/second-navbar.component';
import { BenefitsPageComponent } from './pages/benefits-page/benefits-page.component';
import { FullArticlePageComponent } from './pages/full-article-page/full-article-page.component';







@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AdminHomePageComponent,
    UserComponent,
    AddUserModalComponent,

    LoginModuleComponent,
    AdminUsersTableComponent,
    NewsletterPageComponent,
    NewsletterArticleComponent,
    AddArticleModalComponent,
    NavigationBarComponent,
    FullDetailedArticleComponent,
    HasRoleDirective,
    ProfilePageComponent,
    ProfileCardComponent,
    FaqPageComponent,
    FaqSectionComponent,
    AddFaqModalComponent,
    SpinnerComponent,
    FileUploadComponent,

    RequestsPageComponent,
    RequestsUserComponent,
    RequestsHrComponent,
    RequestEachComponent,
    RequestDetailsModalComponent,

    FeedbackPageComponent,
    FeedbackFormComponent,
    SecondNavbarComponent,
    BenefitsPageComponent,
    FullArticlePageComponent,
  
   
   


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    NgbModule,
    FontAwesomeModule,

    MatIconModule,
    NgxPaginationModule,
    DragDropModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatRippleModule,
    MatSlideToggleModule,
 
  ],
  providers: [
    AuthInterceptorProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
