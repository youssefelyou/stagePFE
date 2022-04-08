import {Component, OnInit} from '@angular/core';
import {BarrageService} from '../../controller/service/barrage.service';
import {Barrage} from '../../controller/model/barrage.model';
import * as $ from 'jquery';
import {DigueDeCol} from '../../controller/model/digue-de-col.model';


@Component({
  selector: 'app-barrage-create',
  templateUrl: './barrage-create.component.html',
  styleUrls: ['./barrage-create.component.css']
})
export class BarrageCreateComponent implements OnInit {
  target = 0;

  public fct(): void {
    alert(this.target);
  }

  constructor(private barrageService: BarrageService) {
  }

  get barrage(): Barrage {
    return this.barrageService.barrage;
  }

  get digueCol(): DigueDeCol {
    return this.barrageService.digueService.digueDeCol;
  }


  public saveDig(): void {
    this.barrage.digueDeCol = this.digueCol;
    return this.barrageService.digueService.save();
  }

  public saveEv(): void {
    this.barrageService.evacuateurService.evCrue = this.barrage.evacuateurCrues;
    return this.barrageService.evacuateurService.save();
  }

  public saveHydro(): void {
    this.barrageService.hydroService.hydrologie = this.barrage.hydrologie;
    return this.barrageService.hydroService.save();
  }

  public saveRetenue(): void {
    this.barrageService.retenueService.retenue = this.barrage.retenue;
    return this.barrageService.retenueService.save();
  }

  public saveGardien(): void {
    this.barrageService.gardienService.gardien = this.barrage.gardien;
    this.barrageService.gardienService.save();
    this.barrageService.save();
    // @ts-ignore
    this.barrageService.digueService.digueDeCol = null;
    // @ts-ignore
    this.barrageService.vidangeService.vidange = null;
    // @ts-ignore
    this.barrageService.retenueService.retenue = null;
    // @ts-ignore
    this.barrageService.gardienService.gardien = null;
    // @ts-ignore
    this.barrageService.hydroService.hydrologie = null;
    // @ts-ignore
    this.barrageService.evacuateurService.evCrue = null;

  }

  public saveVidange(): void {
    this.barrageService.vidangeService.vidange = this.barrage.vidangeFond;
    return this.barrageService.vidangeService.save();
  }


  ngOnInit(): void {
    jQuery(function() {
      jQuery('#showall').click(function() {
        jQuery('.targetDiv').show();
      });

      jQuery('.showDernier').click(function() {
        jQuery('.targetDiv').hide();
        jQuery('#div' + $(this).attr('target')).show();
      });
      jQuery('.showSingle').click(function() {
        jQuery('.targetDiv').hide();
        jQuery('#div' + $(this).attr('target')).show();
      });

    });
  }

}
