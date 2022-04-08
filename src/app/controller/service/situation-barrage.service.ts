import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VidangeFond} from '../model/vidange-fond.model';
import {SituationBarrage} from '../model/situation-barrage.model';
import {BarrageService} from './barrage.service';
import {ObservationService} from './observation.service';
import {BaremeVolumeService} from './bareme-volume.service';
import {Barrage} from '../model/barrage.model';
import {BaremeVolume} from '../model/bareme-volume.model';
import {DatePipe} from '@angular/common';
import {NotificationsService} from 'angular2-notifications';
import {SituationVo} from '../model/situation-vo.model';
import {SituationJournaliere} from '../model/situation-journaliere.model';
import {SituationBarrageVo} from '../model/situation-barrage-vo.model';
import {HomeComponent} from '../../home/home.component';

@Injectable({
  providedIn: 'root'
})
export class SituationBarrageService {

  constructor(private http: HttpClient,
              private service: NotificationsService,
              public datepipe: DatePipe) {
  }


  get situations3(): Array<SituationBarrage> {
    if (this._situations3 === null) {
      this._situations3 = new Array<SituationBarrage>();
    }
    return this._situations3;
  }

  set situations3(value: Array<SituationBarrage>) {
    this._situations3 = value;
  }

  get situationListTakerkoust(): Array<SituationBarrage> {
    if (this._situationListTakerkoust === null) {
      this._situationListTakerkoust = new Array<SituationBarrage>();
    }
    return this._situationListTakerkoust;
  }

  set situationListTakerkoust(value: Array<SituationBarrage>) {
    this._situationListTakerkoust = value;
  }

  get situationListMYoussef(): Array<SituationBarrage> {
    if (this._situationListMYoussef === null) {
      this._situationListMYoussef = new Array<SituationBarrage>();
    }
    return this._situationListMYoussef;
  }

  set situationListMYoussef(value: Array<SituationBarrage>) {
    this._situationListMYoussef = value;
  }

  get situationListYM(): Array<SituationBarrage> {
    if (this._situationListYM === null) {
      this._situationListYM = new Array<SituationBarrage>();
    }
    return this._situationListYM;
  }

  set situationListYM(value: Array<SituationBarrage>) {
    this._situationListYM = value;
  }

  get listSituations1(): Array<SituationJournaliere> {
    return this._listSituations1;
  }

  set listSituations1(value: Array<SituationJournaliere>) {
    this._listSituations1 = value;
  }

  get situationListJazouli(): Array<SituationBarrage> {
    if (this._situationListJazouli === null) {
      this._situationListJazouli = new Array<SituationBarrage>();
    }
    return this._situationListJazouli;
  }

  set situationListJazouli(value: Array<SituationBarrage>) {
    this._situationListJazouli = value;
  }

  get situationListSebti(): Array<SituationBarrage> {
    if (this._situationListSebti === null) {
      this._situationListSebti = new Array<SituationBarrage>();
    }
    return this._situationListSebti;
  }

  set situationListSebti(value: Array<SituationBarrage>) {
    this._situationListSebti = value;
  }

  get situationListMyAbdrahmane(): Array<SituationBarrage> {
    if (this._situationListMyAbdrahmane === null) {
      this._situationListMyAbdrahmane = new Array<SituationBarrage>();
    }
    return this._situationListMyAbdrahmane;
  }

  set situationListMyAbdrahmane(value: Array<SituationBarrage>) {
    this._situationListMyAbdrahmane = value;
  }

  get situationListSidiDris(): Array<SituationBarrage> {
    if (this._situationListSidiDris === null) {
      this._situationListSidiDris = new Array<SituationBarrage>();
    }
    return this._situationListSidiDris;
  }

  set situationListSidiDris(value: Array<SituationBarrage>) {
    this._situationListSidiDris = value;
  }

  get situationListHassanP(): Array<SituationBarrage> {
    if (this._situationListHassanP === null) {
      this._situationListHassanP = new Array<SituationBarrage>();
    }
    return this._situationListHassanP;
  }

  set situationListHassanP(value: Array<SituationBarrage>) {
    this._situationListHassanP = value;
  }

  get situationList(): Array<SituationBarrage> {
    if (this._situationList === null) {
      this._situationList = new Array<SituationBarrage>();
    }
    return this._situationList;
  }

  set situationList(value: Array<SituationBarrage>) {

    this._situationList = value;
  }

  get situations2(): Array<SituationBarrage> {
    if (this._situations2 === null) {
      this._situations2 = new Array<SituationBarrage>();
    }
    return this._situations2;
  }

  set situations2(value: Array<SituationBarrage>) {
    this._situations2 = value;
  }

  get situation2(): SituationBarrage {
    if (this._situation2 == null) {
      this._situation2 = new SituationBarrage();
    }
    return this._situation2;
  }

  set situation2(value: SituationBarrage) {
    this._situation2 = value;
  }


  get situations1(): Array<SituationBarrage> {
    if (this._situations1 == null) {
      this._situations1 = new Array<SituationBarrage>();
    }
    return this._situations1;
  }

  set situations1(value: Array<SituationBarrage>) {
    this._situations1 = value;
  }

  get situation(): SituationBarrage {
    if (this._situation == null) {
      this._situation = new SituationBarrage();
    }
    return this._situation;
  }

  set situation(value: SituationBarrage) {
    this._situation = value;
  }

  get situations(): Array<SituationBarrage> {
    if (this._situations == null) {
      this._situations = new Array<SituationBarrage>();
    }
    return this._situations;
  }

  set situations(value: Array<SituationBarrage>) {
    this._situations = value;
  }


  get mapVo(): Map<Date, Array<SituationBarrageVo>> {
    if (this._mapVo == null) {
      this._mapVo = new Map<Date, Array<SituationBarrageVo>>();
    }
    return this._mapVo;
  }

  set mapVo(value: Map<Date, Array<SituationBarrageVo>>) {
    this._mapVo = value;
  }

  get myMap(): Map<Date, Array<SituationVo>> {
    if (this._myMap == null) {
      this._myMap = new Map<Date, Array<SituationVo>>();
    }
    return this._myMap;
  }

  set myMap(value: Map<Date, Array<SituationVo>>) {
    this._myMap = value;
  }


  get listSituations(): Array<SituationJournaliere> {
    if (this._listSituations === null) {
      this._listSituations = new Array<SituationJournaliere>();
    }
    return this._listSituations;
  }

  set listSituations(value: Array<SituationJournaliere>) {
    this._listSituations = value;
  }


  get mapDateToday(): Map<string, SituationBarrage> {
    if (this._mapDateToday === null){
      this._mapDateToday = new Map<string, SituationBarrage>();
    }
    return this._mapDateToday;
  }

  set mapDateToday(value: Map<string, SituationBarrage>) {
    this._mapDateToday = value;
  }

  get mapDateLastYear(): Map<string, SituationBarrage> {
    if (this._mapDateLastYear === null){
      this._mapDateLastYear = new Map<string, SituationBarrage>();
    }
    return this._mapDateLastYear;
  }

  set mapDateLastYear(value: Map<string, SituationBarrage>) {
    this._mapDateLastYear = value;
  }

  get mapDateFix(): Map<string, SituationBarrage> {
    if (this._mapDateFix === null){
      this._mapDateFix = new Map<string, SituationBarrage>();
    }
    return this._mapDateFix;
  }

  set mapDateFix(value: Map<string, SituationBarrage>) {
    this._mapDateFix = value;
  }

  public barrageService: BarrageService = new BarrageService(this.http, this.service);
  public observationService: ObservationService = new ObservationService(this.http);
  public baremeService: BaremeVolumeService = new BaremeVolumeService(this.http, this.service);

  public urlBase = 'http://localhost:8036';
  public _url = '/situationBarrage/situationBarrage';
  // tslint:disable-next-line:variable-name
  private _situation: SituationBarrage = new SituationBarrage();
  private _situation2: SituationBarrage = new SituationBarrage();
  // tslint:disable-next-line:variable-name
  private _situations: Array<SituationBarrage> = new Array<SituationBarrage>();
  private _situations1: Array<SituationBarrage> = new Array<SituationBarrage>();
  private _situations2: Array<SituationBarrage> = new Array<SituationBarrage>();
  private _situations3: Array<SituationBarrage> = new Array<SituationBarrage>();
  private _situationList: Array<SituationBarrage> = new Array<SituationBarrage>();
  private _situationListTakerkoust: Array<SituationBarrage> = new Array<SituationBarrage>();
  private _situationListMYoussef: Array<SituationBarrage> = new Array<SituationBarrage>();
  private _situationListYM: Array<SituationBarrage> = new Array<SituationBarrage>();
  private _situationListJazouli: Array<SituationBarrage> = new Array<SituationBarrage>();
  private _situationListSebti: Array<SituationBarrage> = new Array<SituationBarrage>();
  private _situationListMyAbdrahmane: Array<SituationBarrage> = new Array<SituationBarrage>();
  private _situationListSidiDris: Array<SituationBarrage> = new Array<SituationBarrage>();
  private _situationListHassanP: Array<SituationBarrage> = new Array<SituationBarrage>();
  private _mapDateToday: Map<string, SituationBarrage> = new Map<string, SituationBarrage>();
  private _mapDateLastYear: Map<string, SituationBarrage> = new Map<string, SituationBarrage>();
  private _mapDateFix: Map<string, SituationBarrage> = new Map<string, SituationBarrage>();

  // tslint:disable-next-line:variable-name
  private _index = 0;
  public myBareme: BaremeVolume = new BaremeVolume();
  private _myMap: Map<Date, Array<SituationVo>> = new Map<Date, Array<SituationVo>>();
  private _listSituations: Array<SituationJournaliere> = new Array<SituationJournaliere>();
  private _listSituations1: Array<SituationJournaliere> = new Array<SituationJournaliere>();

  private _mapVo: Map<Date, Array<SituationBarrageVo>> = new Map<Date, Array<SituationBarrageVo>>();

  // tslint:disable-next-line:typedef
  public findAll() {
    this.http.get<Array<SituationBarrage>>(this.urlBase + this._url + '/').subscribe(
      data => {
        this.situations = data;
      }, error => {
        alert('error' + error);
      }
    );
  }

  private clone(situation: SituationBarrage) {
    let myclone = new SituationBarrage();
    myclone.id = situation.id;
    myclone.barrage = situation.barrage;
    myclone.date = situation.date;
    myclone.debit = situation.debit;
    myclone.evacuateurCrues = situation.evacuateurCrues;
    myclone.hauteurActuel = situation.hauteurActuel;
    myclone.irrigation = situation.irrigation;
    myclone.neige = situation.neige;
    this.observationService.observation = myclone.observation = situation.observation;
    myclone.pluie = situation.pluie;
    myclone.tauxRemplissage = situation.tauxRemplissage;
    myclone.turbidite = situation.turbidite;
    myclone.turbinage = situation.turbinage;
    myclone.vidangeFond = situation.vidangeFond;
    myclone.volumeActuel = situation.volumeActuel;
    myclone.volumeNormal = situation.volumeNormal;
    myclone.bac = situation.bac;
    return myclone;
  }

  public update(index: number, situation: SituationBarrage) {
    this.situation = this.clone(situation);
    this._index = index;
  }

  public save() {
    if (this.situation.id == null) {
      this.http.post(this.urlBase + this._url + '/', this.situation).subscribe(
        data => {
          this.situations.push(this.clone(this.situation));
          this.onSuccess();
        }, error => {
          console.log('myerror:' + error);
          this.onError(error.message);
        }
      );
    } else {
      this.http.post(this.urlBase + this._url + '/', this.situation).subscribe(
        DATA => {
          this.situations[this._index] = this.clone(this.situation);
          this.findAll();
          this.onUpdate();
        });
    }
    let d = this.situation.date;
    // @ts-ignore
    this.situation = null;
    this.situation.date = d;
  }

  onSuccess() {
    this.service.success('Success', 'save success', {
      position: ['middle', 'center'],
      timeOut: 1000,
      animation: 'fade',
      pauseOnHover: true,
      showProgressBar: true
    });
  }

  onUpdate() {
    this.service.info('Info', 'update successfully', {
      position: ['middle', 'center'],
      timeOut: 1000,
      animation: 'fade',
      pauseOnHover: true,
      showProgressBar: true
    });
  }

  onError(message: any): void{
    this.service.error('Error', message, {
      position: ['middle', 'center'],
      timeOut: 3000,
      animation: 'fade',
      pauseOnHover: true,
      showProgressBar: true
    });
  }

  public findByDateAndBarrageName(nomBarrage: string, date: Date | undefined) {
    // tslint:disable-next-line:max-line-length
    this.http.get<SituationBarrage>(this.urlBase + this._url + '/dateSituation/' + date + '/nameBarrage/' + nomBarrage).subscribe(
      data => {
        // alert('data works');
        this.situation2 = data;
        console.log(data);
      }, error => {
        alert('error');
        console.log(error);
      }
    );
  }

  public findByBarrageName(situationBarrage: SituationBarrage) {
    alert(situationBarrage.barrage.name);
    // tslint:disable-next-line:max-line-length
    this.http.get <Array<SituationBarrage>>(this.urlBase + this._url + '/barrageName/' + situationBarrage.barrage.name).subscribe(
      data => {
        this.situations = data;
        alert('data work');
        console.log(data);
      }, error => {
        alert('eroor');
        console.log(error);
      }
    );
  }

  public findByDate(date: Date, index: number): void {
    // @ts-ignore
    this.situations1 = null;
    // @ts-ignore
    this.situations = null;
    // @ts-ignore
    this.situations2 = null;
    let dat = this.datepipe.transform(date, 'MM-dd-yyyy h:mm:ss a');
    this.http.get <Array<SituationBarrage>>(this.urlBase + this._url + '/date/' + dat).subscribe(
      data => {
        console.log(index);
        if (index === 0) {
          this.situations = data;
          console.log(this.situations);
        } else if (index === 1) {
          this.situations1 = data;
          console.log(this.situations1);
        } else if (index === 2) {
          this.situations2 = data;
          console.log(this.situations2);
        } else if (index === 3) {
          this.situations3 = data;
        }
      }, error => {
        this.onError(error.error.message);
      }
    );
  }
  public findSituationsBarrages(date: Date, index: number) {
    let dat = this.datepipe.transform(date, 'MM-dd-yyyy h:mm:ss a');
    this.http.get <Map<string, SituationBarrage>>(this.urlBase + this._url + '/situations-barrages/date/' + dat).subscribe(
      data => {
        console.log(index);
        if (index === 0) {
          this.mapDateToday = data;
          console.log(this.mapDateToday);
        } else if (index === 1) {
          this.mapDateLastYear = data;
          console.log(this.mapDateLastYear);
        } else if (index === 2) {
          this.mapDateFix = data;
          console.log(this.mapDateFix);
        }
      }, error => {
        alert('eroor');
      }
    );
  }

  public findsituationBetween(dateDebut: Date, dateFin: Date): void {
    // @ts-ignore
    this.situationList = null;
    let dat = this.datepipe.transform(dateDebut, 'MM-dd-yyyy h:mm:ss a');
    let dat2 = this.datepipe.transform(dateFin, 'MM-dd-yyyy h:mm:ss a');
    this.http.get <Map<Date, Array<SituationBarrageVo>>>(this.urlBase + this._url + '/dateDebit/' + dat + '/dateFin/' + dat2).subscribe(
      data => {
        this.mapVo = data;
        console.log(this.mapVo);
      }, error => {
        alert('eroor');
      }
    );
  }

  public findByDateBetweenAndBarrageName(dateDebut: Date, dateFin: Date, barrage: Barrage) {
    // @ts-ignore
    this.situationListTakerkoust = null;
    // @ts-ignore
    this.situationListHassanP = null;
    // @ts-ignore
    this.situationListJazouli = null;
    // @ts-ignore
    this.situationListYM = null;
    // @ts-ignore
    this.situationListSebti = null;
    // @ts-ignore
    this.situationListMyAbdrahmane = null;
    // @ts-ignore
    this.situationListMYoussef = null;
    // @ts-ignore
    this.situationListSidiDris = null;

    let dat = this.datepipe.transform(dateDebut, 'MM-dd-yyyy h:mm:ss a');
    let dat2 = this.datepipe.transform(dateFin, 'MM-dd-yyyy h:mm:ss a');
    this.http.get <Array<SituationBarrage>>(this.urlBase + this._url + '/dateDebit/' + dat + '/dateFin/' + dat2 + '/name/' + barrage.name).subscribe(
      data => {
        if (barrage.name === 'HASSAN 1er') {
          this.situationListHassanP = data;
        } else if (barrage.name === 'YAAKOUB EL MANSOUR') {
          this.situationListYM = data;
        } else if (barrage.name === 'S.M.B.S JAZOULI' ) {
          this.situationListJazouli = data;
        } else if (barrage.name === 'ABOU EL ABASS SEBTI') {
          this.situationListSebti = data;
        } else if (barrage.name === 'MY ABDRHMANE') {
          this.situationListMyAbdrahmane = data;
        } else if (barrage.name === 'M YOUSSEF') {
          this.situationListMYoussef = data;
        } else if (barrage.name === 'TAKERKOUST') {
          this.situationListTakerkoust = data;
        } else if (barrage.name === 'SIDI DRISS') {
          this.situationListSidiDris = data;
        }

      }, error => {
        alert('eroor');
      }
    );
  }

  public findPluie(dateDebut: Date, dateFin: Date) {
    let dat = this.datepipe.transform(dateDebut, 'MM-dd-yyyy h:mm:ss a');
    let dat2 = this.datepipe.transform(dateFin, 'MM-dd-yyyy h:mm:ss a');
    this.http.get <Map<Date, Array<SituationVo>>>(this.urlBase + this._url + '/dateDebut/' + dat + '/dateFin/' + dat2).subscribe(
      data => {
        this.myMap = data;
        console.log(this.myMap);
      }, error => {
        alert('error');
        console.log(error);
      });
  }

  public situationJournaliere(date: Date, dateYestrday: Date) {
    const dateToday = this.datepipe.transform(date, 'MM-dd-yyyy h:mm:ss a');
    const dateYesterday = this.datepipe.transform(dateYestrday, 'MM-dd-yyyy h:mm:ss a');
    this.http.get <Array<SituationJournaliere>>(this.urlBase + this._url + '/situation-Journaliere/date/' + dateToday + '/yesterday/' + dateYesterday).subscribe(
      data => {
        this.listSituations = data;
        this.listSituations1 = data;
        console.log(this.listSituations);
      }, error => {

      });
  }

  public situationJournaliere1(date: Date, dateYestrday: Date) {
    const dateToday = this.datepipe.transform(date, 'MM-dd-yyyy h:mm:ss a');
    const dateYesterday = this.datepipe.transform(dateYestrday, 'MM-dd-yyyy h:mm:ss a');
    this.http.get <Array<SituationJournaliere>>(this.urlBase + this._url + '/situation-Journaliere/date/' + dateToday + '/yesterday/' + dateYesterday).subscribe(
      data => {
        this.listSituations1 = data;
        console.log(this.listSituations);
      }, error => {

      });
  }
}
