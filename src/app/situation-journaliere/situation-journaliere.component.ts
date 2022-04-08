import {Component, OnInit} from '@angular/core';
import {SituationBarrageService} from '../controller/service/situation-barrage.service';
import {SituationJournaliere} from '../controller/model/situation-journaliere.model';
import {DatePipe} from '@angular/common';
import {ExportAsConfig, ExportAsService} from 'ngx-export-as';

@Component({
  selector: 'app-situation-journaliere',
  templateUrl: './situation-journaliere.component.html',
  styleUrls: ['./situation-journaliere.component.css']
})
export class SituationJournaliereComponent implements OnInit {

  constructor(private situationService: SituationBarrageService,
              public datepipe: DatePipe,
              private exportAsService: ExportAsService) {
  }

  get listSituations(): Array<SituationJournaliere> {
    return this.situationService.listSituations;
  }

  get listVo(): Array<SituationJournaliere> {
    return this.situationService.listSituations1;
  }

  datenow = new Date();
  dateYesterday = new Date();
  now = Date.UTC(this.datenow.getFullYear(), this.datenow.getMonth(), this.datenow.getDate(),
    this.datenow.setHours(7, 0o0, 0o0, 0o0));
  // @ts-ignore
  dateToday: Date = this.datepipe.transform(this.datenow, 'YYYY-MM-ddThh:mm');

  exportAsConfig: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'print',
    download: false,
    fileName: 'graph',
    options: { // html-docx-js document options
      orientation: 'landscape',
      margins: {},
    }
  };
  exportAsConfig1: ExportAsConfig = {
    type: 'png',
    elementIdOrContent: 'print',
    download: false,
    fileName: 'graph',
    options: { // html-docx-js document options
      orientation: 'landscape',
      width: 1500,
      height: 2000 ,
      margins: {},
    }
  };
  title = 'Situation journalière des données hydrologiques ';
  selected = 'bassin';
  selectedOued = 'oued';
  selectedProvince = 'province';

  getData(): void {
    const date = new Date(this.dateToday);
    const dateHier = Date.UTC(date.getFullYear(), date.getMonth(),
      date.setDate(date.getDate() - 1), date.setHours(7, 0o0, 0o0, 0o0));
    // @ts-ignore
    const dateYesterday: Date = this.datepipe.transform(date, 'YYYY-MM-ddThh:mm');
    this.situationService.situationJournaliere(this.dateToday, dateYesterday);
  }

  getData1(): void {
    const date = new Date(this.dateToday);
    const dateHier = Date.UTC(date.getFullYear(), date.getMonth(),
      date.setDate(date.getDate() - 1), date.setHours(7, 0o0, 0o0, 0o0));
    // @ts-ignore
    const dateYesterday: Date = this.datepipe.transform(date, 'YYYY-MM-ddThh:mm');
    this.situationService.situationJournaliere1(this.dateToday, dateYesterday);
  }

  export(): void {
    this.exportAsService.save(this.exportAsConfig, 'situation').subscribe(() => {
      // save started
    });
    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    this.exportAsService.get(this.exportAsConfig).subscribe(content => {
      console.log(content);
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  export1(): void {
    this.exportAsService.save(this.exportAsConfig1, 'situation').subscribe(() => {
      // save started
    });
    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    this.exportAsService.get(this.exportAsConfig1).subscribe(content => {
      console.log(content);
    });
  }

  getOrderByBassin(): void {
    this.getData1();
    if (this.selected !== 'Tous') {
      console.log(this.listVo);
      if (this.listSituations.length < this.listVo.length) {
        this.listSituations.splice(0, this.listSituations.length);
        for (const item of this.listVo) {
          this.listSituations.push(item);
        }
      }

      const result = this.listSituations.filter(s => s.sousBassin === this.selected);
      if (result.length !== 0) {
        this.listSituations.splice(0, this.listSituations.length);
        for (const item of result) {
          console.log(item);
          this.listSituations.push(item);
        }
      } else {
        this.listSituations.splice(0, this.listSituations.length);
      }
    } else {
      this.listSituations.splice(0, this.listSituations.length);
      for (const item of this.listVo) {
        this.listSituations.push(item);
      }
    }
  }


  getOrderByProvince(): void{
    this.getData1();
    if (this.selectedProvince !== 'Tous') {
      console.log(this.listVo);
      if (this.listSituations.length < this.listVo.length) {
        this.listSituations.splice(0, this.listSituations.length);
        for (const item of this.listVo) {
          this.listSituations.push(item);
        }
      }

      const result = this.listSituations.filter(s => s.province === this.selectedProvince);
      if (result.length !== 0) {
        this.listSituations.splice(0, this.listSituations.length);
        for (const item of result) {
          console.log(item);
          this.listSituations.push(item);
        }
      } else {
        this.listSituations.splice(0, this.listSituations.length);
      }
    } else {
      this.listSituations.splice(0, this.listSituations.length);
      for (const item of this.listVo) {
        this.listSituations.push(item);
      }
    }
  }


  getOrderByOued(): void {
    this.getData1();
    if (this.selectedOued !== 'Tous') {
      console.log(this.listVo);
      if (this.listSituations.length < this.listVo.length) {
        this.listSituations.splice(0, this.listSituations.length);
        for (const item of this.listVo) {
          this.listSituations.push(item);
        }
      }

      const result = this.listSituations.filter(s => s.oued === this.selectedOued);
      if (result.length !== 0) {
        this.listSituations.splice(0, this.listSituations.length);
        for (const item of result) {
          console.log(item);
          this.listSituations.push(item);
        }
      } else {
        this.listSituations.splice(0, this.listSituations.length);
      }
    } else {
      this.listSituations.splice(0, this.listSituations.length);
      for (const item of this.listVo) {
        this.listSituations.push(item);
      }
    }
  }

}
