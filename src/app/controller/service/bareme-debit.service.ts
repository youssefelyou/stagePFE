import {Injectable} from '@angular/core';
import {BaremeDebit} from '../model/bareme-debit.model';
import {HttpClient} from '@angular/common/http';
import {Barrage} from '../model/barrage.model';
import {StationService} from './station.service';
import {BaremeVolume} from '../model/bareme-volume.model';
import {Station} from '../model/station.model';
import {NotificationsService} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class BaremeDebitService {
  public stationService: StationService = new StationService(this.http , this.service);
  private urlBase = 'http://localhost:8036';
  // tslint:disable-next-line:variable-name
  private _url = '/baremeDebit/baremeDebit';
  // tslint:disable-next-line:variable-name
  private _bareme: BaremeDebit = new BaremeDebit();
  private _bareme1: BaremeDebit = new BaremeDebit();
  private _bareme2: BaremeDebit = new BaremeDebit();
  private _bareme3: BaremeDebit = new BaremeDebit();
  // tslint:disable-next-line:variable-name
  private _barimes: Array<BaremeDebit> = new Array<BaremeDebit>();
  // tslint:disable-next-line:variable-name
  private _index = 0;

  constructor(private http: HttpClient,
              private service: NotificationsService) {
  }


  get bareme1(): BaremeDebit {
    return this._bareme1;
  }

  set bareme1(value: BaremeDebit) {
    this._bareme1 = value;
  }

  get bareme2(): BaremeDebit {
    return this._bareme2;
  }

  set bareme2(value: BaremeDebit) {
    this._bareme2 = value;
  }

  get bareme3(): BaremeDebit {
    return this._bareme3;
  }

  set bareme3(value: BaremeDebit) {
    this._bareme3 = value;
  }

  get bareme(): BaremeDebit {
    if (this._bareme == null) {
      this._bareme = new BaremeDebit();
    }
    return this._bareme;
  }

  set bareme(value: BaremeDebit) {
    this._bareme = value;
  }

  get barimes(): Array<BaremeDebit> {
    if (this._barimes == null) {
      this._barimes = new Array<BaremeDebit>();
    }
    return this._barimes;
  }

  set barimes(value: Array<BaremeDebit>) {
    this._barimes = value;
  }

  // tslint:disable-next-line:typedef
  private clone(bareme: BaremeDebit) {
    const myClone = new BaremeDebit();
    myClone.id = bareme.id;
    myClone.hauteur = bareme.hauteur;
    myClone.a0 = bareme.a0;
    myClone.a1 = bareme.a1;
    myClone.a2 = bareme.a2;
    myClone.a3 = bareme.a3;
    myClone.a4 = bareme.a4;
    myClone.a5 = bareme.a5;
    myClone.a6 = bareme.a6;
    myClone.a7 = bareme.a7;
    myClone.a8 = bareme.a8;
    myClone.a9 = bareme.a9;
    myClone.stationHydrologie = bareme.stationHydrologie;
    return myClone;
  }

  // tslint:disable-next-line:typedef
  public update(index: number, bareme: BaremeDebit) {
    this.bareme = this.clone(bareme);
    this._index = index;
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

  onError() {
    this.service.error('Error', 'error to save', {
      position: ['middle', 'center'],
      timeOut: 1000,
      // animation: 'fade',
      pauseOnHover: true,
      showProgressBar: true
    });
  }
  onErrorBareme() {
    this.service.info('Info', 'aucun cote corecpant a cette valeur', {
      position: ['middle', 'center'],
      timeOut: 1000,
      // animation: 'fade',
      pauseOnHover: true,
      showProgressBar: true
    });
  }

  // tslint:disable-next-line:typedef
  public save() {
    if (this.bareme.id == null) {
      this.http.post(this.urlBase + this._url + '/', this.bareme).subscribe(
        data => {
          this.barimes.push(this.clone(this.bareme));
        }
      );
    } else {
      this.http.post(this.urlBase + this._url + '/', this.bareme).subscribe(
        DATA => {
          this.barimes[this._index] = this.clone(this.bareme);
        });
    }
    // @ts-ignore
    this.bareme = null;
  }

  public findAll() {
    this.http.get<Array<BaremeDebit>>(this.urlBase + this._url + '/').subscribe(
      data => {
        this.barimes = data;
      }, error => {
        console.log('error' + error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  public deleteByNomStation(stationNom: string) {
    this.http.delete<Array<BaremeDebit>>(this.urlBase + this._url + '/nomStation/' + stationNom).subscribe(
      data => {
        this.barimes = data;
        this.onSuccess();
      }, error => {
        this.onError();
        console.log('error' + error);
      });
  }


  public findByStationHydrologieNomStationAndHauteur(station: Station, hauteur: number | undefined, index: number) {
    this.http.get<BaremeDebit>(this.urlBase + this._url + '/nomStation/' + station.nomStation + '/hauteur/' + hauteur).subscribe(
      data => {
        if (index === 0) {
          this.bareme = data;
          console.log(this.bareme);
        } else if (index === 1) {
          this.bareme1 = data;
          console.log(this.bareme1);
        } else if (index === 2) {
          this.bareme2 = data;
          console.log(this.bareme2);
        } else {
          this.bareme3 = data;
          console.log(this.bareme3);
        }
      }, error => {
        this.onErrorBareme();
        console.log(error);
      }
    );
  }

}
