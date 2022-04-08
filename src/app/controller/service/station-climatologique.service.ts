import {Injectable} from '@angular/core';
import {StationClimatologique} from '../model/station-climatologique.model';
import {HttpClient} from '@angular/common/http';
import {NotificationsService} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class StationClimatologiqueService {

  private urlBase = 'http://localhost:8036';
  private url = '/climat/climat';

  // tslint:disable-next-line:variable-name
  private _stationclima: StationClimatologique = new StationClimatologique();
  // tslint:disable-next-line:variable-name
  private _stationclimas: Array<StationClimatologique> = [];

  constructor(private http: HttpClient,
              private service: NotificationsService) {
  }

  // tslint:disable-next-line:variable-name
  _index = 0;

  // tslint:disable-next-line:typedef
  public update(index: number, stationclima: StationClimatologique) {
    // @ts-ignore
    this.stationclima = this.clone(stationclima);
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
    if (this.stationclima.id == null) {
      this.http.post(this.urlBase + this.url + '/', this.stationclima).subscribe(
        data => {
          this.stationclimas.push(this.clone(this.stationclima));
          this.onSuccess();
        }, error => {
          this.onError();
        });
    } else {
      this.http.post<number>(this.urlBase + this.url + '/', this.stationclima).subscribe(
        data => {

          // @ts-ignore
          this.stationclimas[this._index] = this.clone(this.stationclima);
        });
    }

    // @ts-ignore
    this.stationclima = null;
  }

  public findAll() {
    this.http.get<Array<StationClimatologique>>(this.urlBase + this.url + '/').subscribe(
      data => {
        this.stationclimas = data;
      }, error => {
        alert('error' + error);
      }
    );
  }

  get stationclima(): StationClimatologique {
    if (this._stationclima == null) {
      this._stationclima = new StationClimatologique();
    }
    return this._stationclima;
  }

  set stationclima(value: StationClimatologique) {
    this._stationclima = value;
  }

  get stationclimas(): Array<StationClimatologique> {
    if (this._stationclimas == null) {
      this._stationclimas = new Array<StationClimatologique>();
    }
    return this._stationclimas;
  }

  set stationclimas(value: Array<StationClimatologique>) {
    this._stationclimas = value;
  }

  // tslint:disable-next-line:typedef
  clone(stationclima: StationClimatologique) {
    let myClone = new StationClimatologique();
    myClone.id = stationclima.id;
    myClone.name = stationclima.name;
    myClone.pluie = stationclima.pluie;
    myClone.neige = stationclima.neige;
    myClone.vent = stationclima.vent;
    myClone.directionVent = stationclima.directionVent;
    myClone.humidite = stationclima.humidite;
    myClone.rayonnement = stationclima.rayonnement;
    myClone.evaporation = stationclima.evaporation;
    myClone.temperatureSec = stationclima.temperatureSec;
    myClone.temperatureMouille = stationclima.temperatureMouille;
    myClone.temperatureMin = stationclima.temperatureMin;
    myClone.temperatureMax = stationclima.temperatureMax;
    return myClone;
  }
}
