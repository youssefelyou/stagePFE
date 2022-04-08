import {Component, OnInit} from '@angular/core';
import {SituationBarrage} from '../../controller/model/situation-barrage.model';
import {SituationBarrageService} from '../../controller/service/situation-barrage.service';
import {Barrage} from '../../controller/model/barrage.model';
import {DatePipe} from '@angular/common';
import * as $ from 'jquery';
import {Observation} from '../../controller/model/observation.model';
import {BaremeVolume} from '../../controller/model/bareme-volume.model';
import {BaremeVolumeService} from '../../controller/service/bareme-volume.service';
import {ListSituationComponent} from '../list-situation/list-situation.component';

@Component({
  selector: 'app-situation-barrage-create',
  templateUrl: './situation-barrage-create.component.html',
  styleUrls: ['./situation-barrage-create.component.css']
})
export class SituationBarrageCreateComponent implements OnInit {
  constructor(public datepipe: DatePipe,
              private situationBarrageService: SituationBarrageService,
              public stationList: ListSituationComponent,
              private baremeService: BaremeVolumeService) {
  }


  get situation(): SituationBarrage {
    return this.situationBarrageService.situation;
  }

  // set situation(value: SituationBarrage) {
  //   this._situation = value;
  // }

  get situations(): Array<SituationBarrage> {
    return this.situationBarrageService.situations;
  }


  //
  // get situationYesterday(): SituationBarrage {
  //   return this.situationBarrageService.situation2;
  // }

  get barrages(): Array<Barrage> {
    return this.situationBarrageService.barrageService.barrages;
  }

  get observation(): Observation {
    return this.situationBarrageService.observationService.observation;
  }

  get bareme(): BaremeVolume {
    return this.baremeService.bareme;
  }

  // tslint:disable-next-line:ban-types
  toggle = true;
  status = 'Enable';

  datenow = new Date();
  now = Date.UTC(this.datenow.getFullYear(), this.datenow.getMonth(), (this.datenow.getDay()),
    this.datenow.setHours(7, 0o0, 0o0, 0o0));
  yesterday = new Date();
  yt = Date.UTC(this.yesterday.getFullYear(), this.yesterday.getMonth(), this.yesterday.setDate(this.datenow.getDate() - 1),
    this.yesterday.setHours(7, 0o0, 0o0, 0o0));

  column!: number;



  enableDisableRule() {
    // @ts-ignore
    document.getElementById('toggle').style.backgroundColor = '#ced4da';
  }


  public save() {

    let volume = this.situation.volumeActuel;
    // if ( this.observation.fuits !== '' ||  this.observation.cr !== 0
    //   || this.observation.cmg !== 0 || this.observation.cam !== 0 || this.observation.bp !== 0 || this.observation.aep !== 0) {
    this.situation.observation = this.observation;
    // }
    if (this.baremeService.bareme.cote !== undefined) {
      if (this.column === 0) {
        this.situation.volumeActuel = this.baremeService.bareme.a0;
      } else if (this.column === 1) {
        this.situation.volumeActuel = this.baremeService.bareme.a1;
      } else if (this.column === 2) {
        this.situation.volumeActuel = this.baremeService.bareme.a2;
      } else if (this.column === 3) {
        this.situation.volumeActuel = this.baremeService.bareme.a3;
      } else if (this.column === 4) {
        this.situation.volumeActuel = this.baremeService.bareme.a4;
      } else if (this.column === 5) {
        this.situation.volumeActuel = this.baremeService.bareme.a5;
      } else if (this.column === 6) {
        this.situation.volumeActuel = this.baremeService.bareme.a6;
      } else if (this.column === 7) {
        this.situation.volumeActuel = this.baremeService.bareme.a7;
      } else if (this.column === 8) {
        this.situation.volumeActuel = this.baremeService.bareme.a8;
      } else if (this.column === 9) {
        this.situation.volumeActuel = this.baremeService.bareme.a9;
      }
    } else {
      this.situation.volumeActuel = volume;
    }
    this.situation.tauxRemplissage = (this.situation.volumeActuel / this.situation.volumeNormal) * 100;
    this.baremeService.bareme.cote = undefined;
    this.situationBarrageService.save();
    this.situationBarrageService.findByDate(this.situation.date, 3);
    // @ts-ignore
    this.situationBarrageService.observationService.observation = null;
    this.findList();
  }

  public saveObservation() {
    return this.situationBarrageService.observationService.save();
  }

  ngOnInit(): void {
    $(() => {
      'use strict';
      // $(this).toggleClass('toggle');
      $('.toggle').click(function() {
        $(this).toggleClass('pressed');
      });
    });

    jQuery(function() {
      jQuery('.showObservation').click(function() {
        jQuery('.observationDiv').show();
      });
      jQuery('.hideObservation').click(function() {
        jQuery('.observationDiv').hide();
      });
    });
    // @ts-ignore
    this.situation.date = this.datepipe.transform(this.datenow, 'MM-dd-yyyy h:mm:ss a');
    this.situationBarrageService.barrageService.findAll();
    // @ts-ignore
    const yesterday: Date = this.datepipe.transform(this.yesterday, 'MM-dd-yyyy h:mm:ss a');
    this.situationBarrageService.findByDate(yesterday, 0);

    $(document).ready(function() {
      var disabled = false;
      $('#submit').click(function() {
        if (disabled) {
          $('#volumeNormal').prop('disabled', true);       // if disabled, enable
        } else {
          $('#volumeNormal').prop('disabled', false);        // if enabled, disable
        }
        disabled = !disabled;
      });
    });
  }

  load() {
    this.situationBarrageService.findByDateAndBarrageName(this.situation.barrage.name, this.situation.date);
  }

  findByBarrageNameAndCote(): void {
    let test = 0;
    let c1 = '';
    let cote_str = String(this.situation.hauteurActuel);
    this.column = 0;
    for (let i = 0; i < cote_str.length; i++) {
      if (cote_str[i] === '.') {
        if (cote_str[i + 2] === undefined) {
          this.column = 0;
        } else {
          this.column = Number(cote_str[cote_str.length - 1]);
        }
        test = 1;
      }
    }
    // alert(this.column);

    for (let i = 0; i < (cote_str.length - 1); i++) {
      c1 = cote_str[(cote_str.length - 2) - i] + c1;
    }
    if (this.column === 0) {
      return this.baremeService.findByBarrageNameAndCote(this.situation.barrage, this.situation.hauteurActuel);
    } else {
      if (test === 1) {
        const newHauteurEau = Number(c1 + '0');
        return this.baremeService.findByBarrageNameAndCote(this.situation.barrage, newHauteurEau);
      } else {
        return this.baremeService.findByBarrageNameAndCote(this.situation.barrage, this.situation.hauteurActuel);
      }

    }
  }

  test() {
    console.log(this.situation.barrage.name);
  }


  getVolumeNormal(): void {

    const name = this.situation.barrage.name;

    for (let i = 0; i < this.situations.length; i++) {
      if (this.situations[i].barrage.name === name) {
        this.situation.barrage = this.situations[i].barrage;
        this.situation.pluie = this.situations[i].pluie;
        this.situation.volumeActuel = this.situations[i].volumeActuel;
        this.situation.volumeNormal = this.situations[i].volumeNormal;
        this.situation.tauxRemplissage = this.situations[i].tauxRemplissage;
        this.situation.debit = this.situations[i].debit;
        this.situation.hauteurActuel = this.situations[i].hauteurActuel;
        this.observation.cmg = this.situations[i].observation.cmg;
        this.observation.cam = this.situations[i].observation.cam;
        this.observation.aep = this.situations[i].observation.aep;
        this.observation.bp = this.situations[i].observation.bp;
        this.observation.cr = this.situations[i].observation.cr;
        this.observation.fuits = this.situations[i].observation.fuits;
        this.situation.irrigation = this.situations[i].irrigation;
        this.situation.turbidite = this.situations[i].turbidite;
        this.situation.evacuateurCrues = this.situations[i].evacuateurCrues;
        this.situation.neige = this.situations[i].neige;
        this.situation.turbinage = this.situations[i].turbinage;
        this.situation.vidangeFond = this.situations[i].vidangeFond;
        this.situation.bac = this.situations[i].bac;
        break;
      }
    }
    // @ts-ignore
    const yesterday: Date = this.datepipe.transform(this.yesterday, 'MM-dd-yyyy h:mm:ss a');
    this.situationBarrageService.findByDate(yesterday, 0);

  }

  findList() {
    this.situationBarrageService.findByDate(this.situation.date, 3);
    this.stationList.ngOnInit();
  }
}
