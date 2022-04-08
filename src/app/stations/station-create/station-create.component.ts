import {Component, OnInit} from '@angular/core';
import {StationService} from '../../controller/service/station.service';
import {Station} from '../../controller/model/station.model';
import * as $ from 'jquery';
import {Batterie} from '../../controller/model/batterie.model';

@Component({
  selector: 'app-station-create',
  templateUrl: './station-create.component.html',
  styleUrls: ['./station-create.component.css']
})
export class StationCreateComponent implements OnInit {

  constructor(private stationService: StationService) {
  }


  get station(): Station {
    return this.stationService.station;
  }

  get batterie(): Batterie {
    return this.stationService.batterieService.batterie;
  }

  target = 0;
  stationName: any;

  listbatterie: Array<Batterie> = new Array<Batterie>();


  ngOnInit(): void {
    console.log(this.station.nire);
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


  // tslint:disable-next-line:typedef
  public saveBatterie() {
    if (this.listbatterie.length === 0){
      this.stationService.save();
    }
    this.listbatterie.push(this.stationService.batterieService.clone(this.batterie));
    // @ts-ignore
    this.stationService.batterieService.batterie = null;

  }

  public saveGardien(): void {
    this.stationName = this.station.nomStation;
    this.stationService.gardienService.gardien = this.station.gardien;
    this.stationService.gardienService.save();
  }

  save(): void {
    return this.stationService.save();
  }

  saveListBatterie(): void {
    if (this.listbatterie.length === 0){
      this.stationService.save();
      this.stationService.onSuccess();
    }else{
      for (let i = 0; i < this.listbatterie.length; i++) {
        this.listbatterie[i].station.nomStation = this.stationName;
        this.stationService.batterieService.save(this.listbatterie[i]);
      }
      this.stationService.onSuccess();
    }
  }

}
