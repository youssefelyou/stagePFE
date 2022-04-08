import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ExportAsConfig, ExportAsService} from 'ngx-export-as';
import {MatDialog} from '@angular/material/dialog';
import {BarrageService} from '../controller/service/barrage.service';
import {Barrage} from '../controller/model/barrage.model';

@Component({
  selector: 'app-barrages',
  templateUrl: './barrages.component.html',
  styleUrls: ['./barrages.component.css']
})
export class BarragesComponent implements OnInit {

  constructor(private barrageService: BarrageService,
              private modalService: NgbModal,
              private exportAsService: ExportAsService,
              public dialog: MatDialog) {
  }


  get barrages(): Array<Barrage> {
    return this.barrageService.barrages;
  }

  get barrage(): Barrage {
    return this.barrageService.barrage;
  }


  closeResult = '';

  exportAsConfig: ExportAsConfig = {
    type: 'png',
    elementIdOrContent: 'print',
    download: false,
    fileName: 'fiche barrage',
    options: { // html-docx-js document options
      orientation: 'portrait',
      width: 1000,
      height: 1400,
      margins: {},
    }
  };

  exportAsConfig1: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'print',
    download: false,
    fileName: 'fiche barrage',
    options: { // html-docx-js document options
      orientation: 'portrait',
      width: 1000,
      height: 1400,
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

  public info(barrage: Barrage): void {
    return this.barrageService.info(barrage);
  }

  public update(i: number, barrage: Barrage): void {
    return this.barrageService.update(i, barrage);
  }

  ngOnInit(): void {
    this.barrageService.findAll();
  }


  public searchBarrages(searchTerm: string): void {
    const results: Barrage[] = [];
    for (const barrage of this.barrages) {
      if (barrage.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        barrage.province.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        barrage.sousBassin.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        barrage.ire.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        barrage.oued.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
        results.push(barrage);
      }
    }
    if (results.length === 0 || !searchTerm) {
      this.barrageService.findAll();
    } else {
      this.barrages.splice(0, this.barrages.length);
      for (const item of results) {
        this.barrages.push(item);
      }
    }
  }


  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${BarragesComponent.getDismissReason(reason)}`;
    });
  }

  export(): void {
    this.exportAsService.save(this.exportAsConfig, 'FICHE SYNOPTIQUE DE BARRAGE').subscribe(() => {
      // save started
    });
    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    this.exportAsService.get(this.exportAsConfig).subscribe(content => {
      console.log(content);
    });
  }

  exportPdf(): void {
    this.exportAsService.save(this.exportAsConfig1, 'FICHE SYNOPTIQUE DE BARRAGE').subscribe(() => {
      // save started
    });
    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    this.exportAsService.get(this.exportAsConfig1).subscribe(content => {
      console.log(content);
    });
  }


  refresh(): void {
    // @ts-ignore
    this.barrageService.barrage = null;
  }
}
