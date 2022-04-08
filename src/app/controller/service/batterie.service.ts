import {Injectable} from '@angular/core';
import {Batterie} from '../model/batterie.model';
import {HttpClient} from '@angular/common/http';
import {EvacuateurCrue} from '../model/evacuateur-crue.model';
import {BarrageService} from './barrage.service';
import {Station} from '../model/station.model';
import {Barrage} from '../model/barrage.model';

@Injectable({
  providedIn: 'root'
})
export class BatterieService {
  private urlBase = 'http://localhost:8036';
  private url = '/batterie/batterie';

  // tslint:disable-next-line:variable-name
  private _batterie: Batterie = new Batterie();
  // tslint:disable-next-line:variable-name
  private _batteries: Array<Batterie> = new Array<Batterie>();

// tslint:disable-next-line:variable-name
  _index = 0;

  // tslint:disable-next-line:typedef
  public update(index: number, batterie: Batterie) {
    this.batterie = this.clone(batterie);
    this._index = index;
  }

  // tslint:disable-next-line:typedef
  public save(batterie1: Batterie) {
    if (this.batterie.id == null) {
      this.http.post(this.urlBase + this.url + '/', batterie1).subscribe(
        data => {
          this.batteries.push(this.clone(batterie1));
          this.findAll();
        }, error => {
          alert('error batterie');
        }
      );
    } else {
      this.http.post<number>(this.urlBase + this.url + '/', batterie1).subscribe(
        data => {
          this.batteries[this._index] = this.clone(batterie1);
        });
    }
  }

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  public findAll() {
    this.http.get<Array<Batterie>>(this.urlBase + this.url + '/').subscribe(
      data => {
        this.batteries = data;
      }, error => {
        alert('error' + error);
      }
    );
  }

  public findByNomStation(station: Station): void{
    this.http.get<Array<Batterie>>(this.urlBase + this.url + '/nomStation/' + station.nomStation).subscribe(
      data => {
        this.batteries = data;
        console.log(this.batteries);
      }, error => {
        alert('error' + error);
      }
    );
  }

  get batterie(): Batterie {
    if (this._batterie == null) {
      this._batterie = new Batterie();
    }
    return this._batterie;
  }

  set batterie(value: Batterie) {
    this._batterie = value;
  }

  get batteries(): Array<Batterie> {
    if (this._batteries == null) {
      this._batteries = new Array<Batterie>();
    }
    return this._batteries;
  }

  set batteries(value: Array<Batterie>) {
    this._batteries = value;
  }

  // tslint:disable-next-line:typedef
  clone(batterie: Batterie) {
    let myClone = new Batterie();
    myClone.id = batterie.id;
    myClone.min = batterie.min;
    myClone.max = batterie.max;
    myClone.nre = batterie.nre;
    myClone.station = batterie.station;
    return myClone;
  }
}
