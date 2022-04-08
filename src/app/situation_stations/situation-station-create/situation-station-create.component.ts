import {Component, OnInit} from '@angular/core';
import {SituationstationService} from '../../controller/service/situationstation.service';
import {Situationstation} from '../../controller/model/situationstation.model';
import {Station} from '../../controller/model/station.model';
import {StationService} from '../../controller/service/station.service';
import {DatePipe} from '@angular/common';
import {BaremeDebitService} from '../../controller/service/bareme-debit.service';
import {HttpClient} from '@angular/common/http';
import {forkJoin} from 'rxjs';
import * as $ from 'jquery';
import {SituationStationListComponent} from '../situation-station-list/situation-station-list.component';

@Component({
  selector: 'app-situation-station-create',
  templateUrl: './situation-station-create.component.html',
  styleUrls: ['./situation-station-create.component.css']
})
export class SituationStationCreateComponent implements OnInit {

  constructor(private situationService: SituationstationService,
              private situationStationList: SituationStationListComponent,
              private http: HttpClient,
              public datepipe: DatePipe,
              private stationService: StationService,
              private baremeService: BaremeDebitService) {
  }


  get situationstation(): Situationstation {
    return this._situationstation;
  }

  set situationstation(value: Situationstation) {
    this._situationstation = value;
  }

  get situation(): Situationstation {
    return this.situationService.situationstation;
  }

  get stations(): Array<Station> {
    return this.stationService.stations;
  }

  private urlBase = 'http://localhost:8036';
  private url = '/sitpluv/sitpluv';

  // tslint:disable-next-line:new-parens
  column = Number();
  column1 = Number();
  station: Station = new Station();
  column2 = Number();
  column3 = Number();
  datenow = new Date();
  datenow1 = new Date();
  now = Date.UTC(this.datenow.getFullYear(), this.datenow.getMonth(), (this.datenow.getDay()),
    this.datenow.setHours(7, 0o0, 0o0, 0o0));
  now1 = Date.UTC(this.datenow1.getFullYear(), this.datenow1.getMonth(), (this.datenow1.setDate(this.datenow.getDate() - 1)),
    this.datenow1.setHours(7, 0o0, 0o0, 0o0));

  // @ts-ignore
  dateYesterday: Date = this.datepipe.transform(this.datenow1, 'MM-dd-yyyy h:mm:ss a');
  private _situationstation: Situationstation = new Situationstation();


  situations: Array<Situationstation> = new Array<Situationstation>();
  situations2: Array<Situationstation> = new Array<Situationstation>();
  st: Situationstation = new Situationstation();
  t = this.situationService.test;
  value = true;


  ngOnInit(): void {

    $(document).ready(function() {
      let disabled = false;
      $('.submit1').click(function() {
        if (disabled) {
          $('.coteAlerte').prop('disabled', true);       // if disabled, enable
        } else {
          $('.coteAlerte').prop('disabled', false);        // if enabled, disable
        }
        disabled = !disabled;
      });
    });

    this.stationService.findAll();
    // @ts-ignore
    this.situation.date = this.datepipe.transform(this.datenow, 'MM-dd-yyyy h:mm:ss a');
    this.findByDate(this.dateYesterday);

    $('.jumper').on('click', function(e) {

      e.preventDefault();


      $('body, html').animate({
        // @ts-ignore
        scrollTop: $($(this).attr('href')).offset().top
      }, 600);

    });

  }

  AfficheListSituation(station: Station): void {
    this.situations.splice(0, this.situations.length);
    if (this.situations2.length === 0) {
      for (let i = 0; i < this.stations.length; i++) {
        const situation: Situationstation = new Situationstation();
        situation.niveauEau = 0;
        situation.station = this.stations[i];
        situation.coteAlerte = 0;
        situation.cotePreAlerte = 0;
        situation.hauteurmax = 0;
        this.situations.push(situation);
        this.findByStationHydrologieNomStationAndHauteur(this.stations[i], this.situations[i].coteAlerte, 1);
        this.findByStationHydrologieNomStationAndHauteur(this.stations[i], this.situations[i].cotePreAlerte, 2);
        this.findByStationHydrologieNomStationAndHauteur(this.stations[i], this.situations[i].hauteurmax, 3);
        this.findByStationHydrologieNomStationAndHauteur(this.stations[i], this.situations[i].niveauEau, 0);
      }
    } else {


      for (let i = 0; i < this.situations2.length; i++) {
        if (this.situations2[i].station.nomStation === station.nomStation) {
          this.situations.push(this.situations2[i]);
        }
      }
      for (let i = 0; i < this.situations2.length; i++) {
        if (this.situations2[i].station.nomStation !== station.nomStation) {
          this.situations.push(this.situations2[i]);
        }
      }
    }

  }


  findByStationHydrologieNomStationAndHauteur(s: Station, cote: number, index: number): void {
    let c1 = '';
    let cc = 0;
    const cote_str = String(cote);
    if (index === 0) {
      cc = this.column = Number(cote_str[cote_str.length - 1]);
    } else if (index === 1) {
      cc = this.column1 = Number(cote_str[cote_str.length - 1]);
    } else if (index === 2) {
      cc = this.column2 = Number(cote_str[cote_str.length - 1]);
    } else if (index === 3) {
      cc = this.column3 = Number(cote_str[cote_str.length - 1]);
    }

    for (let i = 0; i < (cote_str.length - 1); i++) {
      c1 = cote_str[(cote_str.length - 2) - i] + c1;
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

    console.log(this.situation);
    this.situationService.save();
    this.situationStationList.ngOnInit();
  }

  public findByDate(date: Date | undefined): void {
// @ts-ignore
    this.situations2 = null;
    this.http.get<Array<Situationstation>>(this.urlBase + this.url + '/date/' + date).subscribe(
      data => {
        this.situations2 = data;
      }, error => {
        alert('error');
        console.log(error);
      }
    );
    console.log(this.situations2);
  }

  getValue(): void {
    this.value = !this.value;
  }
}
