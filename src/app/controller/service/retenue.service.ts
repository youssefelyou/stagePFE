import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observation} from '../model/observation.model';
import {Retenue} from '../model/retenue.model';
import {BarrageService} from './barrage.service';

@Injectable({
  providedIn: 'root'
})
export class RetenueService {
  private urlBase = 'http://localhost:8036';
  private _url = '/retenue/retenue';
  // tslint:disable-next-line:variable-name
  private _retenue: Retenue = new Retenue();
  // tslint:disable-next-line:variable-name
  private _retenues: Array<Retenue> = new Array<Retenue>();
  // tslint:disable-next-line:variable-name
  private _index = 0;

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  public findAll() {
    this.http.get<Array<Retenue>>(this.urlBase + this._url + '/').subscribe(
      data => {
        this.retenues = data;
      }, error => {
        alert('error' + error);
      }
    );
  }


  get retenue(): Retenue {
    if (this._retenue == null){
      this._retenue = new Retenue();
    }
    return this._retenue;
  }

  set retenue(value: Retenue) {
    this._retenue = value;
  }

  get retenues(): Array<Retenue> {
    if (this._retenues == null){
      this._retenues = new Array<Retenue>();
    }
    return this._retenues;
  }

  set retenues(value: Array<Retenue>) {
    this._retenues = value;
  }

  private clone(retenue: Retenue) {
    let myclone = new Retenue();
    myclone.id = retenue.id;
    myclone.niveauEauMax = retenue.niveauEauMax;
    myclone.niveauRetenueNormal = retenue.niveauRetenueNormal;
    myclone.surfaceRetenueNormal = retenue.surfaceRetenueNormal;
    myclone.volumeRegularise = retenue.volumeRegularise;
    myclone.volumeRetenueNormal = retenue.volumeRetenueNormal;
    return myclone;
  }

  public update(index: number, retenue: Retenue) {
    this.retenue = this.clone(retenue);
    this._index = index;
  }

  public save() {
    if (this.retenue.id == null) {
      this.http.post(this.urlBase + this._url + '/', this.retenue).subscribe(
        data => {
          this.retenues.push(this.clone(this.retenue));
          this.findAll();
        }
      );
    } else {
      this.http.post(this.urlBase + this._url + '/', this.retenue).subscribe(
        DATA => {
          this.retenues[this._index] = this.clone(this.retenue);
          this.findAll();
          alert(DATA);
        });
    }
  }
}
