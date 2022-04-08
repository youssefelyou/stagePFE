import { Injectable } from '@angular/core';
import {Barrage} from '../model/barrage.model';
import {HttpClient} from '@angular/common/http';
import {BatterieService} from './batterie.service';
import {DigueDeColService} from './digue-de-col.service';
import {EvacuateurCrueService} from './evacuateur-crue.service';
import {GardienService} from './gardien.service';
import {HydrologieService} from './hydrologie.service';
import {RetenueService} from './retenue.service';
import {VidangeFondService} from './vidange-fond.service';
import {NotificationsService} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class BarrageService {

  constructor(private http: HttpClient,
              private service: NotificationsService) {
  }

  get barrage(): Barrage {
    if (this._barrage == null){
      this._barrage = new Barrage();
    }
    return this._barrage;
  }

  set barrage(value: Barrage) {
    this._barrage = value;
  }

  get barrages(): Array<Barrage> {
    if (this._barrages == null){
      this._barrages =  new Array<Barrage>();
    }
    return this._barrages;
  }

  set barrages(value: Array<Barrage>) {
    this._barrages = value;
  }
  public batterieService: BatterieService = new BatterieService(this.http);
  public digueService: DigueDeColService = new DigueDeColService(this.http, this.service);
  public evacuateurService: EvacuateurCrueService = new EvacuateurCrueService(this.http);
  public gardienService: GardienService = new GardienService(this.http);
  public hydroService: HydrologieService = new HydrologieService(this.http);
  public retenueService: RetenueService = new RetenueService(this.http);
  public vidangeService: VidangeFondService = new VidangeFondService(this.http);
  private urlBase = 'http://localhost:8036';
  private _url = '/barrage/barrage';
  private _index = 0;
private _barrage: Barrage = new Barrage();
private _barrages: Array<Barrage> = [];

  private static clone(barrage: Barrage): Barrage {
    const myClone = new Barrage();
    myClone.id = barrage.id;
    myClone.ire = barrage.ire;
    myClone.cr = barrage.cr;
    myClone.diametreConduite = barrage.diametreConduite;
    myClone.hauteurSurFondation = barrage.hauteurSurFondation;
    myClone.largeurEnCrete = barrage.largeurEnCrete;
    myClone.longueurEnCrete = barrage.longueurEnCrete;
    myClone.name = barrage.name;
    myClone.niveauCrete = barrage.niveauCrete;
    myClone.nmbrePrises = barrage.nmbrePrises;
    myClone.oued = barrage.oued;
    myClone.priseRestitution = barrage.priseRestitution;
    myClone.province = barrage.province;
    myClone.sousBassin = barrage.sousBassin;
    myClone.vidangeFond = barrage.vidangeFond;
    myClone.retenue = barrage.retenue;
    myClone.gardien = barrage.gardien;
    myClone.hydrologie = barrage.hydrologie;
    myClone.evacuateurCrues = barrage.evacuateurCrues;
    myClone.digueDeCol = barrage.digueDeCol;
    myClone.dateMiseService = barrage.dateMiseService;
    myClone.type = barrage.type;
    myClone.type1 = barrage.type1;
    myClone.x = barrage.x;
    myClone.y = barrage.y;
    myClone.z = barrage.z;
    return myClone;
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
  public update(index: number, barrage: Barrage) {
    this.barrage = BarrageService.clone(barrage);
    this._index = index;
  }

  public save() {
    if (this.barrage.id == null) {
      this.http.post(this.urlBase + this._url + '/', this.barrage).subscribe(
        data => {
          this.barrages.push(BarrageService.clone(this.barrage));
          this.onSuccess();
          this.findAll();
        }, error => {
          this.onError();
        }
      );
    } else {
      this.http.post(this.urlBase + this._url + '/', this.barrage).subscribe(
        DATA => {
          this.barrages[this._index] = BarrageService.clone(this.barrage);
          this.findAll();
          alert(DATA);
        });
    }
    // @ts-ignore
    this.barrage = null;
  }
  // tslint:disable-next-line:typedef
  public findAll() {
    this.http.get<Array<Barrage>>(this.urlBase + this._url + '/').subscribe(
      data => {
        this.barrages = data;
      }, error => {
        console.log('error' + error);
      }
    );
  }

  info(barrage: Barrage): void {
   this.barrage = BarrageService.clone(barrage);
  }
}
