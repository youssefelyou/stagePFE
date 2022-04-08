import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DigueDeCol} from '../model/digue-de-col.model';
import {EvacuateurCrue} from '../model/evacuateur-crue.model';
import {newArray} from '@angular/compiler/src/util';
import {BarrageService} from './barrage.service';

@Injectable({
  providedIn: 'root'
})
export class EvacuateurCrueService {
  private urlBase = 'http://localhost:8036';
  private url = '/evacuateur/evacuateur';
  // tslint:disable-next-line:variable-name
  private _evCrue: EvacuateurCrue = new EvacuateurCrue();
  // tslint:disable-next-line:variable-name
  private _evCrues: Array<EvacuateurCrue> = new Array<EvacuateurCrue>();
  // tslint:disable-next-line:variable-name
  private _index = 0;

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  public findAll() {
    this.http.get<Array<EvacuateurCrue>>(this.urlBase + this.url + '/').subscribe(
      data => {
        this.evCrues = data;
      }, error => {
        alert('error' + error);
      }
    );
  }


  get evCrue(): EvacuateurCrue {
    if (this._evCrue == null) {
      this._evCrue = new EvacuateurCrue();
    }
    return this._evCrue;
  }

  set evCrue(value: EvacuateurCrue) {
    this._evCrue = value;
  }

  get evCrues(): Array<EvacuateurCrue> {
    if (this._evCrues == null) {
      this._evCrues = new Array<EvacuateurCrue>();
    }
    return this._evCrues;
  }

  set evCrues(value: Array<EvacuateurCrue>) {
    this._evCrues = value;
  }

  private clone(evacuateur: EvacuateurCrue) {
    let myclone = new EvacuateurCrue();
    myclone.id = evacuateur.id;
    myclone.cruesProjet = evacuateur.cruesProjet;
    myclone.debitMax = evacuateur.debitMax;
    myclone.hauteurSeuil = evacuateur.hauteurSeuil;
    myclone.largeurChenalRestitution = evacuateur.largeurChenalRestitution;
    myclone.longueurDeversante = evacuateur.longueurDeversante;
    myclone.type = evacuateur.type;
    return myclone;
  }

  public update(index: number, ev: EvacuateurCrue) {
    this.evCrue = this.clone(ev);
    this._index = index;
  }

  public save() {
    if (this.evCrue.id == null) {
      this.http.post(this.urlBase + this.url + '/', this.evCrue).subscribe(
        data => {
          this.evCrues.push(this.clone(this.evCrue));
          this.findAll();
        }
      );
    } else {
      this.http.post(this.urlBase + this.url + '/', this.evCrue).subscribe(
        DATA => {
          this.evCrues[this._index] = this.clone(this.evCrue);
          this.findAll();
          alert(DATA);
        });
    }
  }
}
