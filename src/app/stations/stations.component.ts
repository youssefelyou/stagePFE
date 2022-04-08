import {Component, OnInit} from '@angular/core';
import {BarrageService} from '../controller/service/barrage.service';
import {StationService} from '../controller/service/station.service';
import {Station} from '../controller/model/station.model';
import {SituationstationService} from '../controller/service/situationstation.service';
import {DatePipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ExportAsConfig, ExportAsService} from 'ngx-export-as';
import {Situationstation} from '../controller/model/situationstation.model';
import {DialogContentComponent} from '../situation_stations/situation-station-list/situation-station-list.component';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Batterie} from '../controller/model/batterie.model';
import {BatterieService} from '../controller/service/batterie.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {

  constructor(private stationService: StationService,
              private batterieService: BatterieService,
              private modalService: NgbModal,
              private exportAsService: ExportAsService,
              public dialog: MatDialog) {
  }


  get stations(): Array<Station> {
    return this.stationService.stations;
  }

  get station(): Station {
    return this.stationService.station;
  }


  get batteries(): Array<Batterie> {
    return this.batterieService.batteries;
  }

  closeResult = '';

  exportAsConfig: ExportAsConfig = {
    type: 'png',
    elementIdOrContent: 'print',
    download: false,
    fileName: 'fiche station',
    options: { // html-docx-js document options
      orientation: 'portrait',
      width: 900,
      height: 1000,
      margins: {},
    }
  };

  exportAsConfig1: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'print',
    download: false,
    fileName: 'fiche station',
    options: { // html-docx-js document options
      orientation: 'portrait',
      width: 900,
      height: 1000,
      margins: {},
    }
  };

  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public info(station: Station): void {
    this.batterieService.findByNomStation(station);
    return this.stationService.info(station);
  }

  public update(i: number, station: Station): void {
    return this.stationService.update(i, station);
  }

  ngOnInit(): void {
    this.stationService.findAll();
  }


  public searchStations(searchTerm: string): void {
    const results: Station[] = [];
    // @ts-ignore
    for (const station of this.stations) {
      if (station.nomStation.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        // @ts-ignore
        station.province.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        // @ts-ignore
        station.sousbassin.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        station.nire.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        // @ts-ignore
        station.oued.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
        results.push(station);
      }
    }
    if (results.length === 0 || !searchTerm) {
      this.stationService.findAll();
    } else {
      this.stations.splice(0, this.stations.length);
      for (const item of results) {
        this.stations.push(item);
      }
    }
  }


  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${StationsComponent.getDismissReason(reason)}`;
    });
  }

  export(): void {
    this.exportAsService.save(this.exportAsConfig, 'FICHE SYNOPTIQUE DE STATION').subscribe(() => {
      // save started
    });
    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    this.exportAsService.get(this.exportAsConfig).subscribe(content => {
      console.log(content);
    });
  }

  exportPdf(): void {
    this.exportAsService.save(this.exportAsConfig1, 'FICHE SYNOPTIQUE DE STATION').subscribe(() => {
      // save started
    });
    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    this.exportAsService.get(this.exportAsConfig1).subscribe(content => {
      console.log(content);
    });
  }

  refresh(): void {
    // @ts-ignore
    this.stationService.station = null;
  }
}



