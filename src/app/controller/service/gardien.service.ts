import { Injectable } from '@angular/core';
import {Gardien} from '../model/gardien.model';
import {HttpClient} from '@angular/common/http';
import {EvacuateurCrue} from '../model/evacuateur-crue.model';
import {BarrageService} from './barrage.service';
import {NotificationService} from './notification.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GardienService {
  private urlBase = 'http://localhost:8036';
  private url = '/gardien/gardien';

  // tslint:disable-next-line:variable-name
  private _gardien: Gardien | undefined;
  // tslint:disable-next-line:variable-name
  private _gardiens: Array<Gardien> | undefined;

  // tslint:disable-next-line:variable-name
  _index = 0;

  // tslint:disable-next-line:typedef
  public update(index: number, gardien: Gardien) {
    this.gardien = this.clone(gardien);
    this._index = index;
  }

  // tslint:disable-next-line:typedef
  public save(){
    if (this.gardien.id == null) {
      this.http.post(this.urlBase + this.url + '/', this.gardien).subscribe(
        data => {
          if (data === 1) {
            this.gardiens.push(this.clone(this.gardien));
            this.findAll();
          }
        });
    } else{
      this.http.post<number>(this.urlBase + this.url + '/', this.gardien).subscribe(
        data => {
          this.gardiens[this._index] = this.clone(this.gardien);
        });
    }
    this.findAll();
  }
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  public findAll() {
    this.http.get<Array<Gardien>>(this.urlBase + this.url + '/').subscribe(
      data => {
        this.gardiens = data;
      }, error => {
        alert('error' + error);
      }
    );
  }
  get gardien(): Gardien {
    if (this._gardien == null){
      this._gardien = new Gardien();
    }
    return this._gardien;
  }

  set gardien(value: Gardien) {
    this._gardien = value;
  }

  get gardiens(): Array<Gardien> {
    if (this._gardiens == null) {
      this._gardiens = new Array<Gardien>();
    }
    return this._gardiens;
  }

  set gardiens(value: Array<Gardien>) {
    this._gardiens = value;
  }
  clone(gardien: Gardien): Gardien {
    const myClone = new Gardien();
    myClone.id = gardien.id;
    myClone.nomPrenom = gardien.nomPrenom;
    myClone.cin = gardien.cin;
    myClone.datenaissance = gardien.datenaissance;
    myClone.entrerFonction = gardien.entrerFonction;
    myClone.age = gardien.age;
    myClone.niveauscolaire = gardien.niveauscolaire;
    myClone.situationfami = gardien.situationfami;
    myClone.ntel = gardien.ntel;
    myClone.situationadministrative = gardien.situationadministrative;
    return myClone;
  }

}
