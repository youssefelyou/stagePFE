import {Injectable} from '@angular/core';
import {Station} from '../model/station.model';
import {HttpClient} from '@angular/common/http';
import {BatterieService} from './batterie.service';
import {GardienService} from './gardien.service';
import {NotificationsService} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  public batterieService: BatterieService = new BatterieService(this.http);
  public gardienService: GardienService = new GardienService(this.http);

  private urlBase = 'http://localhost:8036';
  private url = '/statpluv/statpluv';
  // tslint:disable-next-line:variable-name
  private _station: Station = new Station();
  // tslint:disable-next-line:variable-name
  private _stations: Array<Station> = [];
  private _listName: Array<string> = new Array<string>();

  // tslint:disable-next-line:typedef variable-name
  _index = 0;

  get listName(): Array<string> {
    if (this._listName == null){
      this._listName = new Array<string>();
    }
    return this._listName;
  }

  set listName(value: Array<string>) {
    this._listName = value;
  }
  // tslint:disable-next-line:typedef
  public update(index: number, station: Station) {
    // @ts-ignore
    this.station = this.clone(station);
    this._index = index;
  }

  public info(station: Station): void {
    this.station = this.clone(station);
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
    if (this.station.id == null) {
      this.http.post(this.urlBase + this.url + '/', this.station).subscribe(
        data => {
          if (data === 0 || data === -1) {
            this.onError();
          } else {
            this.stations.push(this.clone(this.station));
            this.findAll();
          }

        }, error => {
          this.onError();
        }
      );

    } else {
      this.http.post(this.urlBase + this.url + '/', this.station).subscribe(
        DATA => {
          // @ts-ignore
          this.stations[this._index] = this.clone(this.station);
          this.findAll();
          alert(DATA);
        });
    }
    // @ts-ignoreJ
    this.station = null;
  }

  // tslint:disable-next-line:typedef
  public findAll() {
    this.http.get<Array<Station>>(this.urlBase + this.url + '/').subscribe(
      data => {
        this.stations = data;
      }, error => {
        console.log('error' + error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  public findByNrePoste(station: Station) {
    this.http.get(this.urlBase + this.url + '/nrePoste/' + station.nrePoste).subscribe(
      data => {
        console.log(this.http.get(this.urlBase + this.url + '/nrePoste/' + station.nrePoste));
        this.findByNrePoste(station);
        this.findAll();
      }, error => {
        alert('error' + error);
        console.log(this.http.get(this.urlBase + this.url + '/nrePoste/' + station.nrePoste));
      }
    );
  }

  // tslint:disable-next-line:typedef
  public findByDateMiseEnService(station: Station) {
    this.http.get(this.urlBase + this.url + '/dateMiseEnService/' + station.dateMiseEnService).subscribe(
      data => {
        console.log(this.http.get(this.urlBase + this.url + '/dateMiseEnService/' + station.dateMiseEnService));
        this.findByDateMiseEnService(station);
        this.findAll();
      }, error => {
        alert('error' + error);
        console.log(this.http.get(this.urlBase + this.url + '/dateMiseEnService/' + station.dateMiseEnService));
      }
    );
  }

  // tslint:disable-next-line:typedef
  public findByProvince(station: Station) {
    this.http.get(this.urlBase + this.url + '/province/' + station.province).subscribe(
      data => {
        console.log(this.http.get(this.urlBase + this.url + '/province/' + station.province));
        this.findByProvince(station);
        this.findAll();
      }, error => {
        alert('error' + error);
        console.log(this.http.get(this.urlBase + this.url + '/province/' + station.province));
      }
    );
  }

  // tslint:disable-next-line:typedef
  public findByNomStation(station: Station) {

    this.http.get(this.urlBase + this.url + '/nomStation/' + station.nomStation).subscribe(
      data => {
        console.log(this.http.get(this.urlBase + this.url + '/nomStation/' + station.nomStation));
        this.findByNomStation(station);
        this.findAll();
      }, error => {
        alert('error' + error);
        console.log(this.http.get(this.urlBase + this.url + '/nomStation/' + station.nomStation));
      }
    );
  }

// tslint:disable-next-line:typedef
  public findBySousbassin(station: Station) {

    this.http.get(this.urlBase + this.url + '/sousbassin/' + station.sousbassin).subscribe(
      data => {
        console.log(this.http.get(this.urlBase + this.url + '/sousbassin/' + station.sousbassin));
        this.findBySousbassin(station);
        this.findAll();
      }, error => {
        alert('error' + error);
        console.log(this.http.get(this.urlBase + this.url + '/sousbassin/' + station.sousbassin));
      }
    );
  }

// tslint:disable-next-line:typedef
  public findByNire(station: Station) {
    this.http.get(this.urlBase + this.url + '/nire/' + station.nire).subscribe(
      data => {
        console.log(this.http.get(this.urlBase + this.url + '/nire/' + station.nire));
        this.findByNire(station);
        this.findAll();
      }, error => {
        alert('error' + error);
        console.log(this.http.get(this.urlBase + this.url + '/nire/' + station.nire));
      }
    );
  }

// tslint:disable-next-line:typedef
  public deleteByNrePoste(station: Station) {

    this.http.delete(this.urlBase + this.url + '/nrePoste/' + station.nrePoste).subscribe(
      data => {
        console.log(this.http.delete(this.urlBase + this.url + '/nrePoste/' + station.nrePoste));
        this.deleteByNrePoste(station);
        this.findAll();
      }, error => {
        alert('error' + error);
        console.log(this.http.delete(this.urlBase + this.url + '/nrePoste/' + station.nrePoste));
      }
    );
  }

// tslint:disable-next-line:typedef
  public deleteByNire(station: Station) {
    this.http.delete(this.urlBase + this.url + '/nire/' + station.nire).subscribe(
      data => {
        console.log(this.http.delete(this.urlBase + this.url + '/nire/' + station.nire));
        this.deleteByNire(station);
        this.findAll();
      }, error => {
        alert('error' + error);
        console.log(this.http.delete(this.urlBase + this.url + '/nire/' + station.nire));
      }
    );
  }

// tslint:disable-next-line:typedef
  public deleteByNomStation(station: Station) {
    this.http.delete(this.urlBase + this.url + '/nomStation/' + station.nomStation).subscribe(
      data => {
        console.log(this.http.delete(this.urlBase + this.url + '/nomStation/' + station.nomStation));
        this.deleteByNomStation(station);
        this.findAll();
      }, error => {
        alert('error' + error);
        console.log(this.http.delete(this.urlBase + this.url + '/nomStation/' + station.nomStation));
      }
    );
  }

  constructor(private http: HttpClient,
              private service: NotificationsService) {
  }


  // @ts-ignore
  get station(): Station {
    if (this._station == null) {
      this._station = new Station();
    }
    return this._station;
  }

  set station(value: Station) {
    this._station = value;
  }

  get stations(): Array<Station> {
    if (this._stations == null) {
      this._stations = new Array<Station>();
    }
    return this._stations;
  }

  set stations(value: Array<Station>) {
    this._stations = value;
  }

  // tslint:disable-next-line:typedef
  clone(station: Station) {
    const myClone = new Station();
    myClone.id = station.id;
    myClone.nrePoste = station.nrePoste;
    myClone.nire = station.nire;
    myClone.nomStation = station.nomStation;
    myClone.province = station.province;
    myClone.commune = station.commune;
    myClone.carte = station.carte;
    myClone.statutFoncier = station.statutFoncier;
    myClone.dateMiseEnService = station.dateMiseEnService;
    myClone.oued = station.oued;
    myClone.surface = station.surface;
    myClone.nature = station.nature;
    myClone.sousbassin = station.sousbassin;
    myClone.localiteplusproche = station.localiteplusproche;
    myClone.typeStation = station.typeStation;
    myClone.x = station.x;
    myClone.y = station.y;
    myClone.z = station.z;
    myClone.teletransmise = station.teletransmise;
    myClone.acces = station.acces;
    myClone.gardien = station.gardien;


    return myClone;
  }
  public listLibelle(): void{
    this.http.get <Array<string>>(this.urlBase + this.url + '/list/barrage-station').subscribe(
      data => {
        this.listName = data;
        console.log(this.listName);

      }, error => {
        alert('error to get data');
      }
    );
  }
}
