import {Component, OnInit} from '@angular/core';
import {SituationBarrage} from '../../controller/model/situation-barrage.model';
import {SituationBarrageService} from '../../controller/service/situation-barrage.service';
import {SituationBarrageCreateComponent} from '../situation-barrage-create/situation-barrage-create.component';
import {DatePipe} from '@angular/common';
import {ExportAsConfig, ExportAsService} from 'ngx-export-as';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import * as JSPDF from 'jspdf';
import {Barrage} from '../../controller/model/barrage.model';
import {SituationBarrageVo} from '../../controller/model/situation-barrage-vo.model';


@Component({
  selector: 'app-situation-barrage-list',
  templateUrl: './situation-barrage-list.component.html',
  styleUrls: ['./situation-barrage-list.component.css']
})
export class SituationBarrageListComponent implements OnInit {
  private listMap: SituationBarrage = new SituationBarrage();


  constructor(public situationService: SituationBarrageService,
              public stCreate: SituationBarrageCreateComponent,
              public datepipe: DatePipe,
              private exportAsService: ExportAsService
  ) {
  }


  get mapDateLastYear(): Map<string, SituationBarrage> {
    return this.situationService.mapDateLastYear;
  }

  get mapDateToday(): Map<string, SituationBarrage> {
    return this.situationService.mapDateToday;
  }

  get mapDateFix(): Map<string, SituationBarrage> {
    return this.situationService.mapDateFix;
  }

  get barrages(): Array<Barrage> {
    return this.situationService.barrageService.barrages;
  }

  get situations(): Array<SituationBarrage> {
    return this.situationService.situations;
  }

  get situationsLastYear(): Array<SituationBarrage> {
    return this.situationService.situations1;
  }

  get sitDateFix(): Array<SituationBarrage> {
    return this.situationService.situations2;
  }

  datenow = new Date();
  datenow1 = new Date();
  datenow0 = new Date();
  capaciteTotal = 0;
  reserveTotal = 0;
  reserveTotalLastYear = 0;
  reserveTotalDateFix = 0;
  tauxRemplissageMoyen = 0;
  tauxRemplissageMoyen1 = 0;
  listmap = new Map();
  lastYearlistmap = new Map();
  fixlistmap = new Map();

  now = Date.UTC(this.datenow.getFullYear(), this.datenow.getMonth(), this.datenow.getDate(),
    this.datenow.setHours(7, 0o0, 0o0, 0o0));

  // @ts-ignore
  dateToday: Date = this.datepipe.transform(this.datenow, 'yyyy-MM-ddThh:mm');


  now1 = Date.UTC(this.datenow1.setFullYear(this.datenow1.getFullYear() - 1), this.datenow1.getMonth(), this.datenow1.getDate(),
    this.datenow1.setHours(7, 0o0, 0o0, 0o0));
  now0 = Date.UTC(this.datenow0.setFullYear(this.datenow1.getFullYear()), this.datenow0.setMonth(8), this.datenow0.setDate(1),
    this.datenow0.setHours(7, 0o0, 0o0, 0o0));


  // @ts-ignore
  dateLastYear: Date = this.datepipe.transform(this.datenow1, 'YYYY-MM-ddThh:mm');
  // @ts-ignore
  fixDate: Date = this.datepipe.transform(this.datenow0, 'MM-dd-yyyy h:mm:ss a');


  exportAsConfig: ExportAsConfig = {
    type: 'png',
    elementIdOrContent: 'print',
    download: false,
    fileName: 'situation',
    options: { // html-docx-js document options
      orientation: 'landscape',
      height: 800,
      width: 1300,
    }
  };

  exportAsConfig1: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'print',
    download: false,
    fileName: 'situation',
    options: {
      orientation: 'landscape',
      height: 1400,
      width: 1000,
    }
  };


  export() {
    this.exportAsService.save(this.exportAsConfig, 'situation').subscribe(() => {

    });

    this.exportAsService.get(this.exportAsConfig).subscribe(content => {
      console.log(content);
    });
  }


  exportpdf() {
    this.exportAsService.save(this.exportAsConfig1, 'situation').subscribe(() => {

    });

    this.exportAsService.get(this.exportAsConfig1).subscribe(content => {
      console.log(content);
    });
  }


  daounlod() {
    const element = document.getElementById('ccc');
    // @ts-ignore
    html2canvas(element).then((canvas) => {
      console.log(canvas);
      const imgData = canvas.toDataURL('image/png');
      const doc = new JSPDF.jsPDF();
      const imageHeight = canvas.height * 1111 / canvas.width;
      doc.addImage(imgData, 0, 0, 1111, canvas.width);
      doc.save('situation.pdf');
    });
  }


  public search(name: string, index: number): SituationBarrage | any {

    if (index === 0) {
      for (const value of Object.entries(this.mapDateToday)) {
        if (value[0] === name) {
          this.listMap = value[1];
          return value[1];
        }
      }
    } else if (index === 1) {
      for (const value of Object.entries(this.mapDateLastYear)) {
        if (value[0] === name) {
          this.listMap = value[1];
          return value[1];
        }
      }
    } else if (index === 2) {
      for (const value of Object.entries(this.mapDateFix)) {
        if (value[0] === name) {
          this.listMap = value[1];
          return value[1];
        }
      }
    }
    return null;


  }

  calcules(index: number): number {
    let capacieTotal = 0;
    let reserveTotalToday = 0;
    if (index === 0) {
      for (const value of Object.values(this.mapDateToday)) {
        capacieTotal += value.volumeNormal;
      }
      return capacieTotal;
    } else if (index === 1) {
      for (const value of Object.values(this.mapDateToday)) {
        reserveTotalToday += value.volumeActuel;
      }
      return reserveTotalToday;
    } else if (index === 2) {
      for (const value of Object.values(this.mapDateToday)) {
        capacieTotal += value.volumeNormal;
        reserveTotalToday += value.volumeActuel;
      }
      return (reserveTotalToday / capacieTotal) * 100;
    } else if (index === 3) {
      for (const value of Object.values(this.mapDateLastYear)) {
        reserveTotalToday += value.volumeActuel;
      }
      return reserveTotalToday;
    } else if (index === 4) {
      for (const value of Object.values(this.mapDateLastYear)) {
        capacieTotal += value.volumeNormal;
        reserveTotalToday += value.volumeActuel;
      }
      return (reserveTotalToday / capacieTotal) * 100;
    } else {
      for (const value of Object.values(this.mapDateFix)) {
        reserveTotalToday += value.volumeActuel;
      }
      return reserveTotalToday;
    }
  }

  getData(): void {
    this.listmap.clear();
    this.lastYearlistmap.clear();
    this.fixlistmap.clear();
    this.datenow1 = new Date(this.dateToday);
    const now11 = Date.UTC(this.datenow1.setFullYear(this.datenow1.getFullYear() - 1), this.datenow1.getMonth(), this.datenow1.getDate(),
      this.datenow1.setHours(7, 0o0, 0o0, 0o0));
    const now0 = Date.UTC(this.datenow0.setFullYear(this.datenow1.getFullYear()), this.datenow0.setMonth(8), this.datenow0.setDate(1),
      this.datenow1.setHours(7, 0o0, 0o0, 0o0));

    // @ts-ignore
    this.dateLastYear = this.datepipe.transform(this.datenow1, 'YYYY-MM-ddThh:mm');
    // @ts-ignore
    this.fixDate = this.datepipe.transform(this.datenow0, 'MM-dd-yyyy h:mm:ss a');

    this.situationService.findSituationsBarrages(this.dateToday, 0);
    this.situationService.findSituationsBarrages(this.dateLastYear, 1);
    this.situationService.findSituationsBarrages(this.fixDate, 2);
  }


  ngOnInit(): void {
    this.situationService.barrageService.findAll();
    this.getData();
  }
}
