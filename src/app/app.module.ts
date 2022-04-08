import {Input, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule, components} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule, MatRippleModule} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {HomeComponent} from './home/home.component';
import {MatActionListItemHarness} from '@angular/material/list/testing';
import {MatCard, MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomDatePipe} from './situation-barrages/situation-barrage-create/custom.datepipe';
import {BaremesComponent} from './baremes/baremes.component';
import {BaremeDebitComponent} from './baremes/bareme-debit/bareme-debit.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {BaremeVolumeComponent} from './baremes/bareme-volume/bareme-volume.component';
import {NgbCarousel, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CdkTableModule} from '@angular/cdk/table';
import {TableModule} from 'primeng/table';
import {DatePipe} from '@angular/common';
import {SituationStationCreateComponent} from './situation_stations/situation-station-create/situation-station-create.component';
import {
  DialogContentComponent,
  SituationStationListComponent
} from './situation_stations/situation-station-list/situation-station-list.component';
import {FooterComponent} from './footer/footer.component';
import {MatListModule} from '@angular/material/list';
import {SituationBarrageCreateComponent} from './situation-barrages/situation-barrage-create/situation-barrage-create.component';
import {NgxPrintModule} from 'ngx-print';
import {ExportAsModule} from 'ngx-export-as';
import html2canvas from 'html2canvas';
import {ChartsModule} from 'ng2-charts';
import {ListSituationComponent} from './situation-barrages/list-situation/list-situation.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {CanvasComponent, DialogDataExampleDialog} from './situation-barrages/canvas/canvas.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {StationClimatologiqueListComponent} from './stationclimatologiques/station-climatologique-list/station-climatologique-list.component';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {EvolutionSituationsComponent} from './situation_stations/evolution-situations/evolution-situations.component';

import { SituationJournaliereComponent } from './situation-journaliere/situation-journaliere.component';
import {SituationBarragesComponent} from './situation-barrages/situation-barrages.component';
import {AuthInterceptor} from './interceptor/auth.interceptor';
import {UserService} from './controller/service/user.service';
import {AuthenticationService} from './controller/service/authentication.service';
import {AuthenticationGuard} from './guard/authentication.guard';
import {NotificationService} from './controller/service/notification.service';
import {UserComponent} from './user/user.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {NotificationModule} from './notification.module';
import {NotifierModule} from 'angular-notifier';
import {BarragesComponent} from './barrages/barrages.component';
import {StationsComponent} from './stations/stations.component';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    components,
    AppComponent,
    MenuComponent,
    BaremesComponent,
    SituationJournaliereComponent,
    LoginComponent,
    RegisterComponent,
    StationsComponent,
    BarragesComponent,
    UserComponent,
    FooterComponent,
    PageNotFoundComponent,
    HomeComponent,
    CustomDatePipe,
    BaremeVolumeComponent,
    SituationStationCreateComponent,
    SituationStationListComponent,
    DialogContentComponent,
    FooterComponent,
    DialogDataExampleDialog,
    ListSituationComponent,
    CanvasComponent,
    EvolutionSituationsComponent,
    SituationJournaliereComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    MatButtonToggleModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NotificationModule,
    MatRadioModule,
    MatButtonModule,
    NotifierModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatOptionModule,
    MatSelectModule,
    ExportAsModule,
    MatPaginatorModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatDividerModule,
    CdkTableModule,
    TableModule,
    MatListModule,
    NgxPrintModule,
    ChartsModule,
    SimpleNotificationsModule
  ],
  exports: [
    MatButtonModule,
    NgxPrintModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    NotifierModule,
    MatTabsModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,

  ],
  providers: [DatePipe,
    NotificationService, AuthenticationGuard, AuthenticationService, UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    DialogDataExampleDialog,
    StationClimatologiqueListComponent,
    SituationStationListComponent,
    SituationBarragesComponent,
    HomeComponent,
    MenuComponent,
    StationsComponent,
    SituationJournaliereComponent,
    ListSituationComponent,
    SituationBarrageCreateComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
