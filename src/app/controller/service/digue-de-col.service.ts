import {Injectable} from '@angular/core';
import {DigueDeCol} from '../model/digue-de-col.model';
import {HttpClient} from '@angular/common/http';
import {BarrageService} from './barrage.service';
import {NotificationsService} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class DigueDeColService {
  private urlBase = 'http://localhost:8036';
  private url = '/digue de col/ digue de col';
  private _index = 0;
  // tslint:disable-next-line:variable-name
  private _digueDeCol: DigueDeCol = new DigueDeCol();
  // tslint:disable-next-line:variable-name
  private _digueDeCols: Array<DigueDeCol> = new Array<DigueDeCol>();

  // tslint:disable-next-line:variable-name


  constructor(private http: HttpClient,
              private service: NotificationsService) {
  }

  // tslint:disable-next-line:typedef
  public findAll() {
    this.http.get<Array<DigueDeCol>>(this.urlBase + this.url + '/').subscribe(
      data => {
        this.digueDeCols = data;
      }, error => {
        alert('error' + error);
      }
    );
  }


  get digueDeCol(): DigueDeCol {
    if (this._digueDeCol == null) {
      this._digueDeCol = new DigueDeCol();
    }
    return this._digueDeCol;
  }

  set digueDeCol(value: DigueDeCol) {
    this._digueDeCol = value;
  }

  get digueDeCols(): Array<DigueDeCol> {
    if (this._digueDeCols == null) {
      this._digueDeCols = new Array<DigueDeCol>();
    }
    return this._digueDeCols;
  }

  set digueDeCols(value: Array<DigueDeCol>) {
    this._digueDeCols = value;
  }

  private clone(digueDeCol: DigueDeCol) {
    let myclone = new DigueDeCol();
    myclone.id = digueDeCol.id;
    myclone.hauteurSurFondation = digueDeCol.hauteurSurFondation;
    myclone.largeurCrete = digueDeCol.largeurCrete;
    myclone.longueurCrete = digueDeCol.longueurCrete;
    myclone.niveauCrete = digueDeCol.niveauCrete;
    myclone.type = digueDeCol.type;
    return myclone;
  }

  public update(index: number, digueDeCol: DigueDeCol) {
    this.digueDeCol = this.clone(digueDeCol);
    this._index = index;
  }

  public save() {
    if (this.digueDeCol.id == null) {
      this.http.post<number>(this.urlBase + this.url + '/', this.digueDeCol).subscribe(
        data => {
          this.digueDeCols.push(this.clone(this.digueDeCol));
        }, error => {
          console.log(error);
        }
      );
    } else {
      this.http.post(this.urlBase + this.url + '/', this.digueDeCol).subscribe(
        DATA => {
          this.digueDeCols[this._index] = this.clone(this.digueDeCol);
          alert('update');
          this.findAll();
          alert(DATA);
        });
    }
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
      position: ['top', 'center'],
      timeOut: 1000,
      animation: 'fade',
      pauseOnHover: true,
      showProgressBar: true
    });
  }
}
