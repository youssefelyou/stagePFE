import {Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import {BaremeDebit} from '../../controller/model/bareme-debit.model';
import {BaremeDebitService} from '../../controller/service/bareme-debit.service';
import {Barrage} from '../../controller/model/barrage.model';
import {Station} from '../../controller/model/station.model';
import {BaremeService} from '../../controller/service/bareme.service';
import {Bareme} from '../../controller/model/bareme.model';
import {DatePipe} from '@angular/common';
import {BaremeVolumeService} from '../../controller/service/bareme-volume.service';
import {ExportAsConfig, ExportAsService} from 'ngx-export-as';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bareme-debit',
  templateUrl: './bareme-debit.component.html',
  styleUrls: ['./bareme-debit.component.css']
})
export class BaremeDebitComponent implements OnInit {

  constructor(private baremeService: BaremeDebitService,
              private baremeVolumeService: BaremeVolumeService,
              private modalService: NgbModal,
              private exportAsService: ExportAsService,
              public datepipe: DatePipe,
              private baremeFixService: BaremeService) {
  }

  get bareme(): BaremeDebit {
    return this.baremeService.bareme;
  }

  get baremeDates(): Array<Date>{
    return this.baremeFixService.baremeDate;
  }

  get baremeFix(): Bareme {
    return this.baremeFixService.bareme;
  }


  get baremesFix(): Array<Bareme> {
    return this.baremeFixService.baremes;
  }

  get stations(): Array<Station> {
    return this.baremeService.stationService.stations;
  }

  get barrages(): Array<Barrage> {
    return this.baremeVolumeService.barrageService.barrages;
  }

  get baremes(): Array<BaremeDebit> {
    return this.baremeService.barimes;
  }
  selected = 'tous';

  file: any;

  data: [][] | undefined;

  exportAsConfig: ExportAsConfig = {
    type: 'png',
    elementIdOrContent: 'print',
    download: false,
    fileName: 'graph',
    options: { // html-docx-js document options
      orientation: 'portrait',
      height: 1500,
      width: 1000,
      margins: {},
    }
  };

  exportAsConfig2: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'print',
    download: false,
    fileName: 'situation',
    options: { // html-docx-js document options
      orientation: 'portrait',
      margins: {},
    }
  };

  exportAsConfig1: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'print',
    download: false,
    fileName: 'graph',
    options: { // html-docx-js document options
      orientation: 'landscape',
      height: 2000,
      width: 1500,
      margins: {}
    }
  };

  // tslint:disable-next-line:typedef
  stationnom: any;
  datenow = new Date();
  now = Date.UTC(this.datenow.getFullYear(), this.datenow.getMonth(), this.datenow.getDate());
  // @ts-ignore
  date: Date = this.datepipe.transform(this.datenow, 'YYYY-MM-dd');


  closeResult = '';

  public save(): void {
    return this.baremeService.save();
  }

  public save1(): void {
    return this.baremeFixService.save();
  }

  // tslint:disable-next-line:typedef
  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer> (evt.target);

    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    this.baremeService.deleteByNomStation(this.stationnom);
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      const wsname: string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));

      const x = this.data.slice(1);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < x.length; i++) {

        for (let j = 0; j <= x[i].length; j++) {
          this.bareme.stationHydrologie.nomStation = this.stationnom;
          this.baremeFix.nom = this.stationnom;
          // @ts-ignore
          this.baremeFix.dateTime = this.date;
          if (j === 0) {
            // @ts-ignore
            this.bareme.hauteur = x[i][j];
            // @ts-ignore
            this.baremeFix.hauteur = x[i][j];
          } else if (j === 1) {
            // @ts-ignore
            this.bareme.a0 = x[i][j];
            // @ts-ignore
            this.baremeFix.a0 = x[i][j];
          } else if (j === 2) {
            // @ts-ignore
            this.bareme.a1 = x[i][j];
            // @ts-ignore
            this.baremeFix.a1 = x[i][j];
          } else if (j === 3) {// @ts-ignore
            this.bareme.a2 = x[i][j];
            // @ts-ignore
            this.baremeFix.a2 = x[i][j];
          } else if (j === 4) {
            // @ts-ignore
            this.bareme.a3 = x[i][j];
            // @ts-ignore
            this.baremeFix.a3 = x[i][j];
          } else if (j === 5) {
            // @ts-ignore
            this.bareme.a4 = x[i][j];
            // @ts-ignore
            this.baremeFix.a4 = x[i][j];
          } else if (j === 6) {
            // @ts-ignore
            this.bareme.a5 = x[i][j];
            // @ts-ignore
            this.baremeFix.a5 = x[i][j];
          } else if (j === 7) {
            // @ts-ignore
            this.bareme.a6 = x[i][j];
            // @ts-ignore
            this.baremeFix.a6 = x[i][j];
          } else if (j === 8) {
            // @ts-ignore
            this.bareme.a7 = x[i][j];
            // @ts-ignore
            this.baremeFix.a7 = x[i][j];
          } else if (j === 9) {
            // @ts-ignore
            this.bareme.a8 = x[i][j];
            // @ts-ignore
            this.baremeFix.a8 = x[i][j];
          } else if (j === 10) {
            // @ts-ignore
            this.bareme.a9 = x[i][j];
            // @ts-ignore
            this.baremeFix.a9 = x[i][j];
          }
        }
        this.save();
        this.save1();

      }
    };
    reader.readAsBinaryString(target.files[0]);

  }

  exportPdf(): void {
    this.exportAsService.save(this.exportAsConfig1, 'Bareme').subscribe(() => {
      // save started
    });
    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    this.exportAsService.get(this.exportAsConfig1).subscribe(content => {
      console.log(content);
    });
  }
  exportPng(): void {
    this.exportAsService.save(this.exportAsConfig, 'Bareme').subscribe(() => {
      // save started
    });
    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    this.exportAsService.get(this.exportAsConfig).subscribe(content => {
      console.log(content);
    });
  }
  exportXlsx(): void {
    this.exportAsService.save(this.exportAsConfig2, 'Bareme').subscribe(() => {
      // save started
    });
    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    this.exportAsService.get(this.exportAsConfig2).subscribe(content => {
    });
  }

  ngOnInit(): void {
    this.baremeService.stationService.findAll();
    this.baremeVolumeService.barrageService.findAll();
  }

  public findByDate( date: Date): void {
    this.baremeFixService.findByDateAndNom(date, this.selected);
  }

  public findBaremes(): void {
    this.baremeFixService.findBareme(this.selected);
  }

  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
