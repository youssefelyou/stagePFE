import {Injectable, Input} from '@angular/core';
import {StationService} from './station.service';
import {BaremeDebit} from '../model/bareme-debit.model';
import {HttpClient} from '@angular/common/http';
import {BarrageService} from './barrage.service';
import {BaremeVolume} from '../model/bareme-volume.model';
import {Barrage} from '../model/barrage.model';
import {Subject} from 'rxjs';
import {NotificationsService} from 'angular2-notifications';


@Injectable({
  providedIn: 'root'
})
export class BaremeVolumeService {


  get bareme(): BaremeVolume {
    if (this._bareme == null) {
      this._bareme = new BaremeVolume();
    }
    return this._bareme;
  }

  set bareme(value: BaremeVolume) {
    this._bareme = value;
  }

  get barimes(): Array<BaremeVolume> {
    if (this._barimes == null) {
      this._barimes = new Array<BaremeVolume>();
    }
    return this._barimes;
  }

  set barimes(value: Array<BaremeVolume>) {
    this._barimes = value;
  }

  constructor(private http: HttpClient,
              private service: NotificationsService) {
  }

  public barrageService: BarrageService = new BarrageService(this.http , this.service);
  // public situationBarrage: SituationBarrageService = new SituationBarrageService(this.http);
  private urlBase = 'http://localhost:8036';
  // tslint:disable-next-line:variable-name
  private _url = '/baremevolume/baremevolume';
  // tslint:disable-next-line:variable-name
  private _bareme: BaremeVolume = new BaremeVolume();
  // tslint:disable-next-line:variable-name
  private _barimes: Array<BaremeVolume> = new Array<BaremeVolume>();
  // tslint:disable-next-line:variable-name
  private _index = 0;
  myBareme: BaremeVolume = new BaremeVolume();
  objc: object = {};

  private clone(bareme: BaremeVolume) {
    const myClone = new BaremeVolume();
    myClone.id = bareme.id;
    myClone.cote = bareme.cote;
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
    myClone.barrage = bareme.barrage;
    return myClone;
  }

  // tslint:disable-next-line:typedef
  public update(index: number, bareme: BaremeVolume) {
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
    this.http.get<Array<BaremeVolume>>(this.urlBase + this._url + '/').subscribe(
      data => {
        this.barimes = data;
      }, error => {
        console.log('error' + error);
      }
    );
  }

  public deleteByNomBarrage(barrageName: string) {
    this.http.delete<Array<BaremeVolume>>(this.urlBase + this._url + '/name/' + barrageName).subscribe(
      data => {
        this.barimes = data;
        this.onSuccess();
      }, error => {
        alert('error');
        console.log('error' + error);
        this.onError();
      });
  }

  public findByBarrageNameAndCote(barrage: Barrage, cote: number | undefined) {

    this.http.get<BaremeVolume>(this.urlBase + this._url + '/name/' + barrage.name + '/cote/' + cote).subscribe(
      data => {
        this.bareme = data;
        console.log(this.bareme.a4);
        console.log(this.bareme.a0);
      }, error => {
        alert('error find volume');
      }
    );
  }
}
