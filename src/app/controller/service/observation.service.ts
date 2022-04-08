import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Hydrologie} from '../model/hydrologie.model';
import {Observation} from '../model/observation.model';
import {SituationBarrageService} from './situation-barrage.service';
import {ObservationCreateComponent} from '../../observations/observation-create/observation-create.component';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {
  private urlBase = 'http://localhost:8036';
  private _url = '/observation/observation';
  // tslint:disable-next-line:variable-name
  private _observation: Observation = new Observation();
  // tslint:disable-next-line:variable-name
  private _observations: Array<Observation> = new Array<Observation>();
  // tslint:disable-next-line:variable-name
  private _index = 0;
  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  public findAll() {
    this.http.get<Array<Observation>>(this.urlBase + this._url + '/').subscribe(
      data => {
        this.observations = data;
      }, error => {
        alert('error' + error);
      }
    );
  }


  get observation(): Observation {
    if (this._observation == null){
      this._observation = new Observation();
    }
    return this._observation;
  }

  set observation(value: Observation) {
    this._observation = value;
  }

  get observations(): Array<Observation> {
    if (this._observations == null){
      this._observations = new Array<Observation>();
    }
    return this._observations;
  }

  set observations(value: Array<Observation>) {
    this._observations = value;
  }

  private clone(obs: Observation) {
    let myclone = new Observation();
    myclone.id = obs.id;
    myclone.aep = obs.aep;
    myclone.bp = obs.bp;
    myclone.cam = obs.cam;
    myclone.cmg = obs.cmg;
    myclone.cr = obs.cr;
    myclone.fuits = obs.fuits;
    return myclone;
  }

  public update(index: number, observation: Observation) {
    this.observation = this.clone(observation);
    this._index = index;
  }

  public save() {
    if (this.observation.id == null) {
      this.http.post(this.urlBase + this._url + '/', this.observation).subscribe(
        data => {
          this.observations.push(this.clone(this.observation));
          this.findAll();
        }
      );
    } else {
      this.http.post(this.urlBase + this._url + '/', this.observation).subscribe(
        DATA => {
          this.observations[this._index] = this.clone(this.observation);
          this.findAll();
          alert('update');
        });
    }
  }
}
