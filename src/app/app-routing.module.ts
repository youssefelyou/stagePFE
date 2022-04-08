import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BarrageCreateComponent} from './barrages/barrage-create/barrage-create.component';
import {SituationBarrageCreateComponent} from './situation-barrages/situation-barrage-create/situation-barrage-create.component';
import {SituationBarrageListComponent} from './situation-barrages/situation-barrage-list/situation-barrage-list.component';

import {ObservationCreateComponent} from './observations/observation-create/observation-create.component';
import {ObservationListComponent} from './observations/observation-list/observation-list.component';
import {HomeComponent} from './home/home.component';
import {BaremeDebitComponent} from './baremes/bareme-debit/bareme-debit.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {StationCreateComponent} from './stations/station-create/station-create.component';
import {SituationStationCreateComponent} from './situation_stations/situation-station-create/situation-station-create.component';
import {SituationStationListComponent} from './situation_stations/situation-station-list/situation-station-list.component';
import {SituationBarragesComponent} from './situation-barrages/situation-barrages.component';
import {StationClimatologiqueCreateComponent} from './stationclimatologiques/station-climatologique-create/station-climatologique-create.component';
import {StationClimatologiqueListComponent} from './stationclimatologiques/station-climatologique-list/station-climatologique-list.component';
import {EvolutionSituationsComponent} from './situation_stations/evolution-situations/evolution-situations.component';

import {SituationJournaliereComponent} from './situation-journaliere/situation-journaliere.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserComponent} from './user/user.component';
import {AuthenticationGuard} from './guard/authentication.guard';
import {StationsComponent} from './stations/stations.component';
import {BarragesComponent} from './barrages/barrages.component';

export const components = [HomeComponent, /* 0 */
  BarrageCreateComponent /* 1 */,
  SituationBarrageCreateComponent/* 2 */, SituationBarrageListComponent/* 3*/,
  ObservationCreateComponent/* 4 */, ObservationListComponent/* 5 */,
  BaremeDebitComponent/* 6 */, PageNotFoundComponent /*7 */,
  StationCreateComponent/* 8 */,
  SituationStationCreateComponent /* 9 */, SituationStationListComponent /* 10*/,
  SituationBarragesComponent /* 11 */, StationClimatologiqueCreateComponent/* 12 */,
  StationClimatologiqueListComponent /* 13 */, EvolutionSituationsComponent /* 14 */,
  SituationJournaliereComponent /* 15 */, StationsComponent /* 16 */,
  BarragesComponent /* 17 */
];

const routes: Routes = [
  {path: '', component: components[0]},
  {path: 'barrage-create', component: components[1]},
  {path: 'barrages/barrage-create', component: components[1]},
  {path: 'barrages', component: components[17]},
  {path: 'stations', component: components[16]},
  {path: 'home', component: components[0]},
  {path: 'home/barrages', component: components[17]},
  {path: 'home/stations', component: components[16]},
  {path: 'home/situation-journaliere', component: components[15]},
  {path: 'home/situationBarrage-list', component: components[3]},
  {path: 'home/situation-station-list', component: components[10]},
  {path: 'situationBarrage-create', component: components[2]},
  {path: 'situationBarrage-list', component: components[3]},
  {path: 'observation-create', component: components[4]},
  {path: 'observation-list', component: components[5]},
  {path: 'bareme-debit', component: components[6]},
  {path: 'station-create', component: components[8]},
  {path: 'stations/station-create', component: components[8]},
  {path: 'situation-station-create', component: components[9]},
  {path: 'situation-station-list', component: components[10]},
  {path: 'situation-barrages', component: components[11]},
  {path: 'stationclima-create', component: components[12]},
  {path: 'stationclima-list', component: components[13]},
  {path: 'evolutions-situations-stations', component: components[14]},
  {path: 'situation-station-create/situation-station-list', component: components[10]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/management', component: UserComponent, canActivate: [AuthenticationGuard] },
  {path: 'situation-journaliere', component: components[15]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
     ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
