import {Component, OnInit} from '@angular/core';
import {SituationstationService} from '../../controller/service/situationstation.service';
import {Situationstation} from '../../controller/model/situationstation.model';
import {ExportAsConfig, ExportAsService} from 'ngx-export-as';
import {SituationBarrage} from '../../controller/model/situation-barrage.model';
import {DatePipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {StationService} from '../../controller/service/station.service';
import {BaremeDebitService} from '../../controller/service/bareme-debit.service';
import {Station} from '../../controller/model/station.model';
import * as $ from 'jquery';

@Component({
  selector: 'app-situation-station-list',
  templateUrl: './situation-station-list.component.html',
  styleUrls: ['./situation-station-list.component.css']
})
export class SituationStationListComponent implements OnInit {


  constructor(public situationstationService: SituationstationService,
              public datepipe: DatePipe,
              public dialog: MatDialog,
              private exportAsService: ExportAsService) {
  }

  get situationstations(): Array<Situationstation> {
    return this.situationstationService.situationstationsList;
  }

  get situat(): Situationstation {
    return this.situationstationService.situationstation;
  }

  datenow = new Date();
  datenow1 = new Date();

  now = Date.UTC(this.datenow.getFullYear(), this.datenow.getMonth(), this.datenow.setDate(this.datenow1.getDate()),
    this.datenow.setHours(7, 0o0, 0o0, 0o0));


  // @ts-ignore
  dateToday: Date = this.datepipe.transform(this.datenow, 'MM-dd-yyyy h:mm:ss a');


  exportAsConfig: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'print',
    download: false,
    fileName: 'situation',
    options: { // html-docx-js document options
      orientation: 'landscape',
      margins: {},
    }
  };


  // tslint:disable-next-line:typedef
  export() {
    this.exportAsService.save(this.exportAsConfig, 'situation').subscribe(() => {
      // save started
    });
    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    this.exportAsService.get(this.exportAsConfig).subscribe(content => {
      console.log(content);
    });
  }


  ngOnInit(): void {
    this.situationstationService.findByDate(this.dateToday);
  }

  public update(index: number, situation: Situationstation): void {
    this.situationstationService.update(index, situation);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-content-example-dialog',
  templateUrl: 'dialog-content.html',
  styleUrls: ['./dialog-style.css']
})
export class DialogContentComponent {

  constructor(public situationstationService: SituationstationService,
              private situationService: SituationstationService,
              private situationStationList: SituationStationListComponent,
              private http: HttpClient,
              public datepipe: DatePipe,
              private stationService: StationService,
              private baremeService: BaremeDebitService,
              public dialog: MatDialog) {
  }

  column = Number();
  column1 = Number();
  column2 = Number();
  column3 = Number();

  get situation(): Situationstation {
    return this.situationstationService.situationstation;
  }

  public save(): void {
    return this.situationstationService.save();
  }


  get stations(): Array<Station> {
    return this.stationService.stations;
  }


  findByStationHydrologieNomStationAndHauteur(s: Station, cote: number, index: number): void {
    let c1 = '';
    let cc = 0;
    const coteString = String(cote);
    if (index === 0) {
      cc = this.column = Number(coteString[coteString.length - 1]);
    } else if (index === 1) {
      cc = this.column1 = Number(coteString[coteString.length - 1]);
    } else if (index === 2) {
      cc = this.column2 = Number(coteString[coteString.length - 1]);
    } else if (index === 3) {
      cc = this.column3 = Number(coteString[coteString.length - 1]);
    }

    for (let i = 0; i < (coteString.length - 1); i++) {
      c1 = coteString[(coteString.length - 2) - i] + c1;
    }

    const c = Number(c1);
    if (cc === 0) {
      this.baremeService.findByStationHydrologieNomStationAndHauteur(s, cote, index);

    } else {
      const newHauteurEau = Number(c1 + '0');
      // alert(newHauteurEau);
      this.baremeService.findByStationHydrologieNomStationAndHauteur(s, newHauteurEau, index);
    }
  }

  addSit(s: Situationstation): void {
    alert(s.id);
    this.situation.id = s.id;
    this.situation.station = s.station;
    this.situation.station.id = s.station.id;
    this.situation.hauteurmax = s.hauteurmax;
    this.situation.coteAlerte = s.coteAlerte;
    this.situation.cotePreAlerte = s.cotePreAlerte;
    this.situation.niveauEau = s.niveauEau;
    this.situation.neige = s.neige;
    this.situation.pluie = s.pluie;
    this.situation.heurDebitMax = s.heurDebitMax;
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        if (this.baremeService.bareme.hauteur !== undefined) {
          if (this.column === 0) {// @ts-ignore
            this.situation.debit = this.baremeService.bareme.a0;
          } else if (this.column === 1) {// @ts-ignore
            this.situation.debit = this.baremeService.bareme.a1;
          } else if (this.column === 2) {// @ts-ignore
            this.situation.debit = this.baremeService.bareme.a2;
          } else if (this.column === 3) {// @ts-ignore
            this.situation.debit = this.baremeService.bareme.a3;
          } else if (this.column === 4) {// @ts-ignore
            this.situation.debit = this.baremeService.bareme.a4;
          } else if (this.column === 5) {// @ts-ignore
            this.situation.debit = this.baremeService.bareme.a5;
          } else if (this.column === 6) {// @ts-ignore
            this.situation.debit = this.baremeService.bareme.a6;
          } else if (this.column === 7) {// @ts-ignore
            this.situation.debit = this.baremeService.bareme.a7;
          } else if (this.column === 8) {// @ts-ignore
            this.situation.debit = this.baremeService.bareme.a8;
          } else if (this.column === 9) {// @ts-ignore
            this.situation.debit = this.baremeService.bareme.a9;
          }
        } else {
          this.situation.debit = s.debit;
        }
      } else if (i === 1) {
        if (this.baremeService.bareme1.hauteur !== undefined) {


          if (this.column1 === 0) {// @ts-ignore
            this.situation.debitAlerte = this.baremeService.bareme1.a0;
          } else if (this.column1 === 1) {// @ts-ignore
            this.situation.debitAlerte = this.baremeService.bareme1.a1;
          } else if (this.column1 === 2) {// @ts-ignore
            this.situation.debitAlerte = this.baremeService.bareme1.a2;
          } else if (this.column1 === 3) {// @ts-ignore
            this.situation.debitAlerte = this.baremeService.bareme1.a3;
          } else if (this.column1 === 4) {// @ts-ignore
            this.situation.debitAlerte = this.baremeService.bareme1.a4;
          } else if (this.column1 === 5) {// @ts-ignore
            this.situation.debitAlerte = this.baremeService.bareme1.a5;
          } else if (this.column1 === 6) {// @ts-ignore
            this.situation.debitAlerte = this.baremeService.bareme1.a6;
          } else if (this.column1 === 7) {// @ts-ignore
            this.situation.debitAlerte = this.baremeService.bareme1.a7;
          } else if (this.column1 === 8) {// @ts-ignore
            this.situation.debitAlerte = this.baremeService.bareme1.a8;
          } else if (this.column1 === 9) {// @ts-ignore
            this.situation.debitAlerte = this.baremeService.bareme1.a9;
          }
        } else {
          this.situation.debitAlerte = s.debitAlerte;
        }
      } else if (i === 2) {
        if (this.baremeService.bareme2.hauteur !== undefined) {


          if (this.column2 === 0) {// @ts-ignore
            this.situation.debitPreAlerte = this.baremeService.bareme2.a0;
          } else if (this.column2 === 1) {// @ts-ignore
            this.situation.debitPreAlerte = this.baremeService.bareme2.a1;
          } else if (this.column2 === 2) {// @ts-ignore
            this.situation.debitPreAlerte = this.baremeService.bareme2.a2;
          } else if (this.column2 === 3) {// @ts-ignore
            this.situation.debitPreAlerte = this.baremeService.bareme2.a3;
          } else if (this.column2 === 4) {// @ts-ignore
            this.situation.debitPreAlerte = this.baremeService.bareme2.a4;
          } else if (this.column2 === 5) {// @ts-ignore
            this.situation.debitPreAlerte = this.baremeService.bareme2.a5;
          } else if (this.column2 === 6) {// @ts-ignore
            this.situation.debitPreAlerte = this.baremeService.bareme2.a6;
          } else if (this.column2 === 7) {// @ts-ignore
            this.situation.debitPreAlerte = this.baremeService.bareme2.a7;
          } else if (this.column2 === 8) {// @ts-ignore
            this.situation.debitPreAlerte = this.baremeService.bareme2.a8;
          } else if (this.column2 === 9) {// @ts-ignore
            this.situation.debitPreAlerte = this.baremeService.bareme2.a9;
          }
        } else {
          this.situation.debitPreAlerte = s.debitPreAlerte;
        }
      } else if (i === 3) {
        if (this.baremeService.bareme3.hauteur !== undefined) {


          if (this.column3 === 0) {// @ts-ignore
            this.situation.debitMax = this.baremeService.bareme3.a0;
          } else if (this.column3 === 1) {// @ts-ignore
            this.situation.debitMax = this.baremeService.bareme3.a1;
          } else if (this.column3 === 2) {// @ts-ignore
            this.situation.debitMax = this.baremeService.bareme3.a2;
          } else if (this.column3 === 3) {// @ts-ignore
            this.situation.debitMax = this.baremeService.bareme3.a3;
          } else if (this.column3 === 4) {// @ts-ignore
            this.situation.debitMax = this.baremeService.bareme3.a4;
          } else if (this.column3 === 5) {// @ts-ignore
            this.situation.debitMax = this.baremeService.bareme3.a5;
          } else if (this.column3 === 6) {// @ts-ignore
            this.situation.debitMax = this.baremeService.bareme3.a6;
          } else if (this.column3 === 7) {// @ts-ignore
            this.situation.debitMax = this.baremeService.bareme3.a7;
          } else if (this.column3 === 8) {// @ts-ignore
            this.situation.debitMax = this.baremeService.bareme3.a8;
          } else if (this.column3 === 9) {// @ts-ignore
            this.situation.debitMax = this.baremeService.bareme3.a9;
          }
        } else {
          this.situation.debitMax = s.debitMax;
        }
      }
    }
    this.baremeService.bareme.hauteur = undefined;
    this.baremeService.bareme1.hauteur = undefined;
    this.baremeService.bareme2.hauteur = undefined;
    this.baremeService.bareme3.hauteur = undefined;

    this.situationService.save();
    return this.situationService.findAll();
  }


}
