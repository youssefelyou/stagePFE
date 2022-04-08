import {Injectable} from '@angular/core';
import {Situationstation} from '../model/situationstation.model';
import {HttpClient} from '@angular/common/http';
import {Station} from '../model/station.model';
import {SituationBarrage} from '../model/situation-barrage.model';
import {NotificationsService} from 'angular2-notifications';
import {Barrage} from '../model/barrage.model';
import {DatePipe} from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class SituationstationService {

  constructor(private http: HttpClient,
              public datepipe: DatePipe,
              private service: NotificationsService) {
  }




  get situationstation(): Situationstation {
    if (this._situationstation == null) {
      this._situationstation = new Situationstation();
    }
    return this._situationstation;
  }

  set situationstation(value: Situationstation) {
    this._situationstation = value;
  }

  get situationstations(): Array<Situationstation> {
    if (this._situationstations == null) {
      this._situationstations = new Array<Situationstation>();
    }
    return this._situationstations;
  }

  set situationstations(value: Array<Situationstation>) {
    this._situationstations = value;
  }


  get situationstationsList(): Array<Situationstation> {
    return this._situationstationsList;
  }

  set situationstationsList(value: Array<Situationstation>) {
    this._situationstationsList = value;
  }

  private urlBase = 'http://localhost:8036';
  private url = '/sitpluv/sitpluv';

  // tslint:disable-next-line:variable-name
  private _situationstation: Situationstation = new Situationstation();
  // tslint:disable-next-line:variable-name
  private _situationstations: Array<Situationstation> = [];
  private _situationstationsList: Array<Situationstation> = [];

  // tslint:disable-next-line:variable-name
  _index = 0;
  test = 0;

  // tslint:disable-next-line:typedef
  public update(index: number, situationstation: Situationstation) {
    // @ts-ignore
    this.situationstation = this.clone(situationstation);
    this._index = index;
  }

  public save() {
    if (this.situationstation.id == null || this.situationstation.id === 0) {
      this.http.post(this.urlBase + this.url + '/', this.situationstation).subscribe(
        data => {
          this.situationstations.push(this.clone(this.situationstation));
          this.onSuccess();
          this.findAll();
        }, error => {
          this.onError();
          console.log(error);
        });
    } else {
      this.http.post<number>(this.urlBase + this.url + '/', this.situationstation).subscribe(
        data => {
          this.situationstations[this._index] = this.clone(this.situationstation);
          this.onUpdate();
          this.findAll();
        });
    }
  }

  onSuccess() {
    this.service.success('Success', 'Save success', {
      position: ['top', 'center'],
      timeOut: 2000,
      animation: 'fade',
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

  onError() {
    this.service.error('Error', 'error to save', {
      position: ['top', 'center'],
      timeOut: 2000,
      animation: 'fade',
      showProgressBar: true
    });
  }

  // tslint:disable-next-line:typedef
  public findAll() {
    this.http.get<Array<Situationstation>>(this.urlBase + this.url + '/').subscribe(
      data => {
        this.situationstations = data;
      }, error => {
        alert('error in find All');
      }
    );
  }

  // tslint:disable-next-line:typedef
  public findByStationHydrologieNomStation(station: Station) {
    this.http.get<Array<Situationstation>>(this.urlBase + this.url + '/nomStation/ ' + station.nomStation).subscribe(
      data => {
        console.log(station);
        this.situationstations = data;
      }, error => {
      }
    );
  }

  public findByDate(date: Date | undefined) {

    this.http.get<Array<Situationstation>>(this.urlBase + this.url + '/date/' + date).subscribe(
      data => {
        this.situationstationsList = data;
      }, error => {
        this.onError();
      }
    );
  }


  // tslint:disable-next-line:typedef
  public deleteByStationHydrologieNomStation(station: Station) {
    this.http.delete<Array<Situationstation>>(this.urlBase + this.url + '/nomStation/' + station.nomStation).subscribe(
      data => {
        this.deleteByStationHydrologieNomStation(station);
        this.findAll();
      }, error => {
        alert('error' + error);
        console.log(this.http.delete<Array<Situationstation>>(this.urlBase + this.url + '/nomStation/' + station.nomStation));
      }
    );
  }

  // tslint:disable-next-line:typedef
  public clone(situationstation: Situationstation) {

    let myClone = new Situationstation();
    myClone.id = situationstation.id;
    myClone.pluie = situationstation.pluie;
    myClone.neige = situationstation.neige;
    myClone.niveauEau = situationstation.niveauEau;
    myClone.debit = situationstation.debit;
    myClone.hauteurmax = situationstation.hauteurmax;
    myClone.coteAlerte = situationstation.coteAlerte;
    myClone.cotePreAlerte = situationstation.cotePreAlerte;
    myClone.debitMax = situationstation.debitMax;
    myClone.heurDebitMax = situationstation.heurDebitMax;
    myClone.debitAlerte = situationstation.debitAlerte;
    myClone.debitPreAlerte = situationstation.debitPreAlerte;
    myClone.date = situationstation.date;
    myClone.station = situationstation.station;

    return myClone;

  }

  public findByDateAndStationName(nomStation: string | undefined, date: Date) {
    // tslint:disable-next-line:max-line-length
    this.http.get<Situationstation>(this.urlBase + this.url + '/date/' + date + '/nomStation/' + nomStation).subscribe(
      data => {
        this.situationstation = data;
      }, error => {
        alert('error');
        console.log(error);
      }
    );
  }

  public findByDateBetween(dateDebut: Date, dateFin: Date) {

    let datedebut = this.datepipe.transform(dateDebut, 'MM-dd-yyyy h:mm:ss a');
    let datfin = this.datepipe.transform(dateFin, 'MM-dd-yyyy h:mm:ss a');
    this.http.get <Array<Situationstation>>(this.urlBase + this.url + '/dateDebit/' + datedebut + '/dateFin/' + datfin).subscribe(
      data => {
        this.situationstations = data;
        console.log(this.situationstations);

      }, error => {
        alert('error to get data');
      }
    );
  }

}
