import {Component, OnInit} from '@angular/core';
import {SituationstationService} from '../../controller/service/situationstation.service';
import {DatePipe} from '@angular/common';
import {ExportAsConfig, ExportAsService} from 'ngx-export-as';
import {Situationstation} from '../../controller/model/situationstation.model';
import {SituationBarrageService} from '../../controller/service/situation-barrage.service';
import {SituationVo} from '../../controller/model/situation-vo.model';
import {StationService} from '../../controller/service/station.service';
import {ChartColor, ChartDataSets, ChartOptions, ChartPluginsOptions, ChartTitleOptions, ChartType, PositionType} from 'chart.js';
import {Label, SingleDataSet} from 'ng2-charts';
@Component({
  selector: 'app-evolution-situations',
  templateUrl: './evolution-situations.component.html',
  styleUrls: ['./evolution-situations.component.css']
})
export class EvolutionSituationsComponent implements OnInit {

  constructor(private situationService: SituationstationService,
              private stationService: StationService,
              private situationBarrageService: SituationBarrageService,
              public datepipe: DatePipe,
              private exportAsService: ExportAsService) {
  }
  nameSelected = 'HASSAN 1er';

  get situationstations(): Array<Situationstation> {
    return this.situationService.situationstations;
  }

  get listNames(): Array<string> {
    return this.stationService.listName;
  }


  get myMap(): Map<Date, Array<SituationVo>> {
    return this.situationBarrageService.myMap;
  }

  selected = 'pluie';
  public newMap: Map<string, Array<SituationVo>> = new Map<string, Array<SituationVo>>();
  // public dates: IterableIterator<Date> = this.myMap.keys();


  public pieChartLabels: Label[] = [['Jour pluvieuse'], ['Jour non pluvieuse']];
  public pieChartLabels1: Label[] = [];
  public pieChartData: SingleDataSet = [30, 50];
  public pieChartData1: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartType1: ChartType = 'line';
  public pieChartLegend = true;
  public datasets: ChartDataSets[] = [{
    fill: false
  }] ;
  public pieChartLegend1 = false;
  public pieChartPlugins = [];
  public titre: ChartTitleOptions = {
    display: true,
    position: 'top',
    fullWidth: true,
    fontColor: '#305F72',
    text: 'Les jours pluvieuse et non  pluvieuse de ' + this.nameSelected
  };
  public pieChartColors = [{backgroundColor: ['rgb(136,246,95)', 'rgb(86,142,255)']}];
  public pieChartColors1 = [{backgroundColor: 'rgb(51,133,252)',
    borderColor: 'rgb(5,25,86)'
  }];
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {position: 'right'},
    title: this.titre,

  };
  public pieChartOptions1: ChartOptions = {
    responsive: true,
  };


  datenow = new Date();
  datenow1 = new Date();
  now = Date.UTC(this.datenow.getFullYear(), this.datenow.getMonth(), this.datenow.getDate(),
    this.datenow.setHours(7, 0o0, 0o0, 0o0));
  now1 = Date.UTC(this.datenow1.getFullYear(), this.datenow1.getMonth(), this.datenow1.setDate(this.datenow.getDate() - 4),
    this.datenow1.setHours(7, 0o0, 0o0, 0o0));
  // @ts-ignore
  dateFin: Date = this.datepipe.transform(this.datenow, 'YYYY-MM-ddThh:mm');
  // @ts-ignore
  dateDebut: Date = this.datepipe.transform(this.datenow1, 'YYYY-MM-ddThh:mm');

  exportAsConfig: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'print',
    download: false,
    fileName: 'graph',
    options: {
      orientation: 'landscape',
      margins: {},
    }
  };
  exportAsConfigpng: ExportAsConfig = {
    type: 'png',
    elementIdOrContent: 'canvas3',
    download: false,
    fileName: 'graph',
    options: {
      orientation: 'landscape',
      width: 1000,
      height: 800,
      margins: {},
    }
  };
  exportAsConfigpng1: ExportAsConfig = {
    type: 'png',
    elementIdOrContent: 'canvas2',
    download: false,
    fileName: 'graph',
    options: {
      orientation: 'landscape',
      width: 1500,
      height: 900,
      margins: {},
    }
  };

  // tslint:disable-next-line:typedef
  myvalue = 'vide';
  list: Array<SituationVo> = new Array<SituationVo>();

  // tslint:disable-next-line:typedef
  public search(name: string, date: Date): SituationVo | any {
    const dateString = this.datepipe.transform(date, 'yyyy-MM-dd\'T\'HH:mm');
    for (const value of Object.entries(this.myMap)) {
      if (value[0] === dateString) {
        this.list = value[1];
      }

    }

    for (const item of this.list) {
      if (item.libelle === name) {
        return item;
      }
    }
    return null;
  }


  ngOnInit(): void {
    this.stationService.listLibelle();
    this.getData();

  }

  getData(): void {
    return this.situationBarrageService.findPluie(this.dateDebut, this.dateFin);
  }




  // tslint:disable-next-line:typedef
  getKeys(map) {
    return Array.from(map.keys());
  }

  export(): void {
    this.exportAsService.save(this.exportAsConfig, 'situation').subscribe(() => {
    });
    this.exportAsService.get(this.exportAsConfig).subscribe(content => {
      console.log(content);
    });
  }
  exportPng(): void {
    this.exportAsService.save(this.exportAsConfigpng, 'situation').subscribe(() => {
    });
    this.exportAsService.get(this.exportAsConfigpng).subscribe(content => {
      console.log(content);
    });
  }
  exportPng1(): void {
    this.exportAsService.save(this.exportAsConfigpng1, 'situation').subscribe(() => {
    });
    this.exportAsService.get(this.exportAsConfigpng1).subscribe(content => {
      console.log(content);
    });
  }


  graphAnneau(nameSelected: string): void {
    this.titre = {
      display: true,
      position: 'top',
      fullWidth: true,
      fontColor: '#305F72',
      text:  'Les jours pluvieuse et non  pluvieuse de ' +  nameSelected
    };
    let jourPluvieuse = Number();
    let jourNonPluvieuse = Number();
    for (const map of Object.entries(this.myMap)) {
      let list: SituationVo = new SituationVo();
      const date = new Date(map[0]);
      this.search(nameSelected, date);
      if (this.search(nameSelected, date) !== null){
        list = this.search(nameSelected, date);
        if (list?.pluie === 0){
          jourNonPluvieuse = jourNonPluvieuse + 1;
        } else {
          jourPluvieuse = jourPluvieuse + 1;
        }
      }
    }
    this.pieChartData = [jourPluvieuse, jourNonPluvieuse];
    this.pieChartOptions = {
      responsive: true,
      legend: {position: 'right'},
      title: this.titre,
    };
  }


  graphEvolution(nom: string): void {
    const titre: ChartTitleOptions = {
      display: true,
      position: 'top',
      fullWidth: true,
      fontColor: '#305F72',
      text:  'Evolution de pluie de ' +  nom
    };
    this.pieChartLabels1.splice(0, this.pieChartLabels1.length);
    this.pieChartData1.splice(0, this.pieChartData1.length);
    for (const map of Object.entries(this.myMap)) {
      const date = new Date(map[0]);
      this.pieChartLabels1.push( date.toLocaleString('fr', { month: 'numeric', day: 'numeric'}));
      let list: SituationVo = new SituationVo();
      this.search(nom, date);
      if (this.search(nom, date) !== null){
        list = this.search(nom, date);
        this.pieChartData1.push(list.pluie);
        }
      }
    this.pieChartOptions1 = {
      responsive: true,
      legend: {position: 'right'},
      title: titre,
    };
    }
}
