import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Retenue} from '../model/retenue.model';
import {VidangeFond} from '../model/vidange-fond.model';
import {BarrageService} from './barrage.service';

@Injectable({
  providedIn: 'root'
})
export class VidangeFondService {
  private urlBase = 'http://localhost:8036';
  private _url = '/vidangeFond/vidangeFond';
  // tslint:disable-next-line:variable-name
  private _vidange: VidangeFond = new VidangeFond();
  // tslint:disable-next-line:variable-name
  private _vidanges: Array<VidangeFond> = new Array<VidangeFond>();
  // tslint:disable-next-line:variable-name
  private _index = 0;

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  public findAll() {
    this.http.get<Array<VidangeFond>>(this.urlBase + this._url + '/').subscribe(
      data => {
        this.vidanges = data;
      }, error => {
        alert('error' + error);
      }
    );
  }


  get vidanges(): Array<VidangeFond> {
    if (this._vidanges == null){
      this._vidanges = new Array<VidangeFond>();
    }
    return this._vidanges;
  }

  set vidanges(value: Array<VidangeFond>) {
    this._vidanges = value;
  }

  get vidange(): VidangeFond {
    if (this._vidange == null){
      this._vidange = new VidangeFond();
    }
    return this._vidange;
  }

  set vidange(value: VidangeFond) {
    this._vidange = value;
  }

  private clone(vdg: VidangeFond) {
    let myclone = new VidangeFond();
    myclone.id = vdg.id;
    myclone.coteSeuilEnter = vdg.coteSeuilEnter;
    myclone.debitMaxEvacue = vdg.debitMaxEvacue;
    myclone.pertuisBeton = vdg.pertuisBeton;
    return myclone;
  }

  public update(index: number, vidange: VidangeFond) {
    this.vidange = this.clone(vidange);
    this._index = index;
  }

  public save() {
    if (this.vidange.id == null) {
      this.http.post(this.urlBase + this._url + '/', this.vidange).subscribe(
        data => {
          this.vidanges.push(this.clone(this.vidange));
          this.findAll();
        }
      );
    } else {
      this.http.post(this.urlBase + this._url + '/', this.vidange).subscribe(
        DATA => {
          this.vidanges[this._index] = this.clone(this.vidange);
          this.findAll();
          alert(DATA);
        });
    }
    // @ts-ignore
    this.vidange = null;
  }
}
