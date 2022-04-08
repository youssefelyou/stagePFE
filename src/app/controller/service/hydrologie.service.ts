import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EvacuateurCrue} from '../model/evacuateur-crue.model';
import {Hydrologie} from '../model/hydrologie.model';
import {BarrageService} from './barrage.service';

@Injectable({
  providedIn: 'root'
})
export class HydrologieService {
  private urlBase = 'http://localhost:8036';
  private _url = '/hydrologie/hydrologie';
  // tslint:disable-next-line:variable-name
  private _hydrologie: Hydrologie = new Hydrologie();
  // tslint:disable-next-line:variable-name
  private _hydrologies: Array<Hydrologie> = new Array<Hydrologie>();
  // tslint:disable-next-line:variable-name
  private _index = 0;

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  public findAll() {
    this.http.get<Array<Hydrologie>>(this.urlBase + this._url + '/').subscribe(
      data => {
        this.hydrologies = data;
      }, error => {
        alert('error' + error);
      }
    );
  }

  get hydrologie(): Hydrologie {
    if (this._hydrologie == null){
      this._hydrologie = new Hydrologie();
    }
    return this._hydrologie;
  }

  set hydrologie(value: Hydrologie) {
    this._hydrologie = value;
  }

  get hydrologies(): Array<Hydrologie> {
    if (this._hydrologies == null){
      this._hydrologies = new Array<Hydrologie>();
    }
    return this._hydrologies;
  }

  set hydrologies(value: Array<Hydrologie>) {
    this._hydrologies = value;
  }

  private clone(hydro: Hydrologie) {
    let myclone = new Hydrologie();
    myclone.id = hydro.id;
    myclone.apportMoyenAnnuel = hydro.apportMoyenAnnuel;
    myclone.courEau = hydro.courEau;
    myclone.crueChentier = hydro.crueChentier;
    myclone.crueProjet = hydro.crueProjet;
    myclone.surface = hydro.surface;
    return myclone;
  }

  public update(index: number, hydro: Hydrologie) {
    this.hydrologie = this.clone(hydro);
    this._index = index;
  }

  public save(): void {
    if (this.hydrologie.id == null) {
      this.http.post(this.urlBase + this._url + '/', this.hydrologie).subscribe(
        data => {
          this.hydrologies.push(this.clone(this.hydrologie));
          this.findAll();
        }
      );
    } else {
      this.http.post(this.urlBase + this._url + '/', this.hydrologie).subscribe(
        DATA => {
          this.hydrologies[this._index] = this.clone(this.hydrologie);
          this.findAll();
          alert(DATA);
        });
    }
  }
}
