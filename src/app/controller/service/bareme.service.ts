import {Injectable} from '@angular/core';
import {Bareme} from '../model/bareme.model';
import {HttpClient} from '@angular/common/http';
import {BaremeDebit} from '../model/bareme-debit.model';
import {BaremeVolume} from '../model/bareme-volume.model';
import {DatePipe} from '@angular/common';
import {BaremeVo} from '../model/bareme-vo.model';

@Injectable({
  providedIn: 'root'
})
export class BaremeService {
  private _bareme: Bareme = new Bareme();
  private _baremes: Array<Bareme> = new Array<Bareme>();
  private _baremeDate: Array<Date> = new Array<Date>();
  private _index: any;
  private urlBase = 'http://localhost:8036';
  // tslint:disable-next-line:variable-name
  private _url = '/bareme/bareme';

  constructor(private http: HttpClient, public datepipe: DatePipe) {
  }


  get baremeDate(): Array<Date> {
    if (this._baremeDate == null){
      this._baremeDate = new Array<Date>();
    }
    return this._baremeDate;
  }

  set baremeDate(value: Array<Date>) {
    this._baremeDate = value;
  }

  get bareme(): Bareme {
    if (this._bareme === null){
      this._bareme = new Bareme();
    }
    return this._bareme;
  }

  set bareme(value: Bareme) {
    this._bareme = value;
  }

  get baremes(): Array<Bareme> {
    if (this._baremes === null){
      this._baremes = new Array<Bareme>();
    }
    return this._baremes;
  }

  set baremes(value: Array<Bareme>) {
    this._baremes = value;
  }

  // tslint:disable-next-line:typedef
  private clone(bareme: Bareme) {
    let myClone = new Bareme();
    myClone.id = bareme.id;
    myClone.hauteur = bareme.hauteur;
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
    myClone.nom = bareme.nom;
    myClone.dateTime = bareme.dateTime;
    return myClone;
  }

  // tslint:disable-next-line:typedef
  public update(index: number, bareme: Bareme) {
    this.bareme = this.clone(bareme);
    this._index = index;
  }

  // tslint:disable-next-line:typedef
  public save() {
    if (this.bareme.id == null) {
      this.http.post(this.urlBase + this._url + '/', this.bareme).subscribe(
        data => {
          this.baremes.push(this.clone(this.bareme));
        }
      );
    } else {
      this.http.post(this.urlBase + this._url + '/', this.bareme).subscribe(
        DATA => {
          this.baremes[this._index] = this.clone(this.bareme);
        });
    }
    // @ts-ignore
    this.bareme = null;
  }

  public findAll() {
    this.http.get<Array<Bareme>>(this.urlBase + this._url + '/').subscribe(
      data => {
        this.baremes = data;
      }, error => {
        console.log('error' + error);
      }
    );
  }

  public findBydate(date: Date) {
    const dateTime = this.datepipe.transform(date, 'MM-dd-yyyy h:mm:ss a');
    this.http.get<Array<Bareme>>(this.urlBase + this._url + '/dateTime/' + dateTime).subscribe(
      data => {
        this.baremes = data;
      }, error => {
        console.log('error' + error);
      }
    );
  }
  public findByNom(nom: string) {
    this.http.get<Array<Bareme>>(this.urlBase + this._url + '/nom/' + nom).subscribe(
      data => {
        this.baremes = data;
      }, error => {
        console.log('error' + error);
      }
    );
  }

  public findBareme(nom: string): void {
    this.http.get<Array<Date>>(this.urlBase + this._url + '/lists/' + nom).subscribe(
      data => {
        this.baremeDate = data;
        console.log(this.baremeDate);
      }, error => {
        console.log('error' + error);
      }
    );
  }

  public findByDateAndNom(date: Date, nom: string) {

    this.http.get<Array<Bareme>>(this.urlBase + this._url + '/dateTime/' + date + '/nom/' + nom).subscribe(
      data => {
        this.baremes = data;
      }, error => {
        console.log('error' + error);
      }
    );
  }
}
