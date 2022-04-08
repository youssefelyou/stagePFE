import {Component, OnInit} from '@angular/core';
import {SituationBarrageService} from '../controller/service/situation-barrage.service';
import {SituationBarrageCreateComponent} from './situation-barrage-create/situation-barrage-create.component';
import {DatePipe} from '@angular/common';
import {ExportAsConfig, ExportAsService} from 'ngx-export-as';
import {SituationBarrage} from '../controller/model/situation-barrage.model';
import {BarrageService} from '../controller/service/barrage.service';
import {Barrage} from '../controller/model/barrage.model';
import * as Chart from 'chart.js';
import {ChartOptions, ChartType} from 'chart.js';
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from 'ng2-charts';
import {SituationBarrageVo} from '../controller/model/situation-barrage-vo.model';
import {MatDialog} from '@angular/material/dialog';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-situation-barrages',
  templateUrl: './situation-barrages.component.html',
  styleUrls: ['./situation-barrages.component.css']
})
export class SituationBarragesComponent implements OnInit {

  constructor(public situationService: SituationBarrageService,
              public barrageService: BarrageService,
              private modalService: NgbModal,
              public dialog: MatDialog,
              public stCreate: SituationBarrageCreateComponent,
              public datepipe: DatePipe,
              private exportAsService: ExportAsService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }


  get situationListYM(): Array<SituationBarrage> {
    return this.situationService.situationListYM;
  }

  get situationListJazouli(): Array<SituationBarrage> {
    return this.situationService.situationListJazouli;
  }

  get situationListMyAbdrahmane(): Array<SituationBarrage> {
    return this.situationService.situationListMyAbdrahmane;
  }

  get situationListMYoussef(): Array<SituationBarrage> {
    return this.situationService.situationListMYoussef;
  }

  get situationListHassanP(): Array<SituationBarrage> {
    return this.situationService.situationListHassanP;
  }

  get situationListSebti(): Array<SituationBarrage> {
    return this.situationService.situationListSebti;
  }

  get situationListSidiDris(): Array<SituationBarrage> {
    return this.situationService.situationListSidiDris;
  }

  get situationListTakerkoust(): Array<SituationBarrage> {
    return this.situationService.situationListTakerkoust;
  }


  get situationList(): Array<SituationBarrage> {
    return this.situationService.situationList;
  }

  get barrages(): Array<Barrage> {
    return this.barrageService.barrages;
  }


  get mapVo(): Map<Date, Array<SituationBarrageVo>> {
    return this.situationService.mapVo;
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {position: 'top'},

    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          return ctx.chart.data.labels[ctx.dataIndex];
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Totale hors bassin'], ['Totale bassin']];
  public pieChartData: SingleDataSet = [30, 50];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [{
    backgroundColor: ['rgb(97,172,255)', 'rgb(129,248,109)'],
  }, ];


  selectedOption: any;
  selectedOption1: any;
  TotaledBassinABHT = 0;
  TotaledHorsBassinABHT = 0;
  Totale = 0;


  chart = [];
  chart1 = [];
  chart2 = [];
  chart3 = [];


  datenow = new Date();
  datenow1 = new Date();
  listDate: Array<Date> = new Array<Date>();

  now = Date.UTC(this.datenow.getFullYear(), this.datenow.getMonth(), this.datenow.getDate(),
    this.datenow.setHours(7, 0o0, 0o0, 0o0));
  now1 = Date.UTC(this.datenow1.getFullYear(), this.datenow1.getMonth(), this.datenow1.setDate(this.datenow.getDate() - 7),
    this.datenow1.setHours(7, 0o0, 0o0, 0o0));
  // @ts-ignore
  dateFin: Date = this.datepipe.transform(this.datenow, 'YYYY-MM-ddThh:mm');
  // @ts-ignore
  dateDebut: Date = this.datepipe.transform(this.datenow1, 'YYYY-MM-ddThh:mm');
  list: Array<SituationBarrageVo> = new Array<SituationBarrageVo>();

  listNames = ['HASSAN 1er', 'SIDI DRISS', 'M YOUSSEF', 'TIMNOUTINE', 'YAAKOUB EL MANSOUR',
    'TAKERKOUST', 'S.M.B.S JAZOULI', 'MY ABDRAHMANE', 'BOURHAMINE',
    'ABOU EL ABASS SEBTI', 'LAGRAGRRA', 'Totale du bassin ABHT', 'Totale hors bassin ABHT',
    'Totale'];

  exportAsConfig: ExportAsConfig = {
    type: 'png',
    elementIdOrContent: 'divCanvas',
    download: false,
    fileName: 'graph',
    options: { // html-docx-js document options
      orientation: 'landscape',
      width: 1500,
      height: 900,
      margins: {},
    }
  };

  exportAsConfigPng: ExportAsConfig = {
    type: 'png',
    elementIdOrContent: 'canvas1',
    download: false,
    fileName: 'graph',
    options: { // html-docx-js document options
      orientation: 'landscape',
      width: 1500,
      height: 900,
      margins: {},
    }
  };

  exportAsConfigPng1: ExportAsConfig = {
    type: 'png',
    elementIdOrContent: 'canvas2',
    download: false,
    fileName: 'graph',
    options: { // html-docx-js document options
      orientation: 'landscape',
      width: 1500,
      height: 900,
      margins: {},
    }
  };

  exportAsConfigPng2: ExportAsConfig = {
    type: 'png',
    elementIdOrContent: 'canvas3',
    download: false,
    fileName: 'graph',
    options: { // html-docx-js document options
      orientation: 'landscape',
      width: 1500,
      height: 900,
      margins: {},
    }
  };

  exportAsConfig2: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'print',
    download: false,
    fileName: 'situation',
    options: { // html-docx-js document options
      orientation: 'landscape',
      margins: {},
    }
  };

  selected = 'volume actuel';
  selected1 = 'volumeActuel';
  barrageSelected: any;

  closeResult = '';

  public search(name: string, date: Date): SituationBarrageVo | any {
    const dateString = this.datepipe.transform(date, 'yyyy-MM-dd\'T\'HH:mm');
    for (const value of Object.entries(this.mapVo)) {
      if (value[0] === dateString) {
        this.list = value[1];
      }
    }

    for (const item of this.list) {
      if (item.barrage === name) {
        return item;
      }
    }
    return null;
  }


  ngOnInit(): void {
    this.barrageService.findAll();
    this.getData();
  }


  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) => {
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


  getData(): void {

    this.situationService.findsituationBetween(this.dateDebut, this.dateFin);

    for (let i = 0; i < this.barrages.length; i++) {
      this.situationService.findByDateBetweenAndBarrageName(this.dateDebut, this.dateFin, this.barrages[i]);
    }
  }


  public calculeTotale(index: number, key: Date): number {
    const dateString = this.datepipe.transform(key, 'yyyy-MM-dd\'T\'HH:mm');
    let pluiTotaleBassin = 0;
    let pluiTotaleHorsBassin = 0;
    let pluiTotale = 0;


    let vnTotaleBassin = 0;
    let vnTotaleHorsBassin = 0;
    let vnTotale = 0;

    let debitTotaleBassin = 0;
    let debitTotaleHorsBassin = 0;
    let debitTotale = 0;

    let vaTotaleBassin = 0;
    let vaTotaleHorsBassin = 0;
    let vaTotale = 0;

    let bacTotaleBassin = 0;
    let bacTotaleHorsBassin = 0;
    let bacTotale = 0;
    if (index === 0) {
      for (const value of Object.entries(this.mapVo)) {
        if (dateString === value[0]) {
          for (const item of value[1]) {
            pluiTotale = pluiTotale + item.pluie;
            debitTotale = debitTotale + item.debit;
            bacTotale = bacTotale + item.bac;
            vaTotale = vaTotale + item.volumeActuel;
            vnTotale += item.volumeNormal;
          }
        }
      }
      if (this.selected === 'pluie') {
        return pluiTotale;
      } else if (this.selected === 'volume actuel') {
        return vaTotale;
      } else if (this.selected === 'bac') {
        return bacTotale;
      } else if (this.selected === 'taux de remplissage') {
        return (vaTotale / vnTotale) * 100;
      } else if (this.selected === 'debit') {
        return debitTotale;
      } else {
        return 0;
      }
    } else if (index === 1) {
      for (const value of Object.entries(this.mapVo)) {
        if (dateString === value[0]) {
          for (const item of value[1]) {
            if (item.barrage === 'SIDI DRISS' || item.barrage === 'HASSAN 1er' || item.barrage === 'M YOUSSEF') {
              pluiTotaleHorsBassin = pluiTotaleHorsBassin + item.pluie;
              debitTotaleHorsBassin = debitTotaleHorsBassin + item.debit;
              bacTotaleHorsBassin = bacTotaleHorsBassin + item.bac;
              vaTotaleHorsBassin += item.volumeActuel;
              vnTotaleHorsBassin += item.volumeNormal;
            }

          }
        }
      }
      if (this.selected === 'pluie') {
        return pluiTotaleHorsBassin;
      } else if (this.selected === 'volume actuel') {
        return vaTotaleHorsBassin;
      } else if (this.selected === 'bac') {
        return bacTotaleHorsBassin;
      } else if (this.selected === 'taux de remplissage') {
        return (vaTotaleHorsBassin / vnTotaleHorsBassin) * 100;
      } else if (this.selected === 'debit') {
        return debitTotaleHorsBassin;
      } else {
        return 0;
      }
    } else {
      for (const value of Object.entries(this.mapVo)) {
        if (dateString === value[0]) {
          for (const item of value[1]) {
            if (item.barrage !== 'SIDI DRISS' && item.barrage !== 'HASSAN 1er' && item.barrage !== 'M YOUSSEF') {
              pluiTotaleBassin = pluiTotaleBassin + item.pluie;
              debitTotaleBassin = debitTotaleBassin + item.debit;
              bacTotaleBassin = bacTotaleBassin + item.bac;
              vaTotaleBassin += item.volumeActuel;
              vnTotaleBassin += item.volumeNormal;
            }

          }
        }
      }
      if (this.selected === 'pluie') {
        return pluiTotaleBassin;
      } else if (this.selected === 'volume actuel') {
        return vaTotaleBassin;
      } else if (this.selected === 'bac') {
        return bacTotaleBassin;
      } else if (this.selected === 'taux de remplissage') {
        return (vaTotaleBassin / vnTotaleBassin) * 100;
      } else if (this.selected === 'debit') {
        return debitTotaleBassin;
      } else {
        return 0;
      }
    }

  }


  export(): void {
    this.exportAsService.save(this.exportAsConfig, 'graph').subscribe(() => {

    });

    this.exportAsService.get(this.exportAsConfig).subscribe(content => {
      console.log(content);
    });
  }

  exportPng(): void {
    this.exportAsService.save(this.exportAsConfigPng, 'graph').subscribe(() => {

    });

    this.exportAsService.get(this.exportAsConfigPng).subscribe(content => {
      console.log(content);
    });
  }

  exportPng1(): void {
    this.exportAsService.save(this.exportAsConfigPng1, 'graph').subscribe(() => {

    });

    this.exportAsService.get(this.exportAsConfigPng1).subscribe(content => {
      console.log(content);
    });
  }

  exportPng2(): void {
    this.exportAsService.save(this.exportAsConfigPng2, 'graph').subscribe(() => {

    });

    this.exportAsService.get(this.exportAsConfigPng2).subscribe(content => {
      console.log(content);
    });
  }


  exportxlsx(): void {
    this.exportAsService.save(this.exportAsConfig2, 'situation').subscribe(() => {

    });

    this.exportAsService.get(this.exportAsConfig2).subscribe(content => {
      console.log(content);
    });
  }


  graphLine(): void {

    // tslint:disable-next-line:prefer-const
    let v0, p0, tr0, d0, b0;
    let v1, p1, tr1, d1, b1;
    let v2, p2, tr2, d2, b2;
    let v3, p3, tr3, d3, b3;
    let v4, p4, tr4, d4, b4;
    let v5, p5, tr5, d5, b5;
    let v6, p6, tr6, d6, b6;
    let v7, p7, tr7, d7, b7;

    const alldates = this.situationListTakerkoust.map(res => res.date);

    v0 = this.situationListTakerkoust.map(res => res.volumeActuel);
    v1 = this.situationListMYoussef.map(res => res.volumeActuel);
    v2 = this.situationListSidiDris.map(res => res.volumeActuel);
    v3 = this.situationListHassanP.map(res => res.volumeActuel);
    v4 = this.situationListYM.map(res => res.volumeActuel);
    v5 = this.situationListJazouli.map(res => res.volumeActuel);
    v6 = this.situationListSebti.map(res => res.volumeActuel);
    v7 = this.situationListMyAbdrahmane.map(res => res.volumeActuel);

    p0 = this.situationListTakerkoust.map(res => res.pluie);
    p1 = this.situationListMYoussef.map(res => res.pluie);
    p2 = this.situationListSidiDris.map(res => res.pluie);
    p3 = this.situationListHassanP.map(res => res.pluie);
    p4 = this.situationListYM.map(res => res.pluie);
    p5 = this.situationListJazouli.map(res => res.pluie);
    p6 = this.situationListSebti.map(res => res.pluie);
    p7 = this.situationListMyAbdrahmane.map(res => res.pluie);

    tr0 = this.situationListTakerkoust.map(res => res.tauxRemplissage);
    tr1 = this.situationListMYoussef.map(res => res.tauxRemplissage);
    tr2 = this.situationListSidiDris.map(res => res.tauxRemplissage);
    tr3 = this.situationListHassanP.map(res => res.tauxRemplissage);
    tr4 = this.situationListYM.map(res => res.tauxRemplissage);
    tr5 = this.situationListJazouli.map(res => res.tauxRemplissage);
    tr6 = this.situationListSebti.map(res => res.tauxRemplissage);
    tr7 = this.situationListMyAbdrahmane.map(res => res.tauxRemplissage);


    d0 = this.situationListTakerkoust.map(res => res.debit);
    d1 = this.situationListMYoussef.map(res => res.debit);
    d2 = this.situationListSidiDris.map(res => res.debit);
    d3 = this.situationListHassanP.map(res => res.debit);
    d4 = this.situationListYM.map(res => res.debit);
    d5 = this.situationListJazouli.map(res => res.debit);
    d6 = this.situationListSebti.map(res => res.debit);
    d7 = this.situationListMyAbdrahmane.map(res => res.debit);


    b0 = this.situationListTakerkoust.map(res => res.bac);
    b1 = this.situationListMYoussef.map(res => res.bac);
    b2 = this.situationListSidiDris.map(res => res.bac);
    b3 = this.situationListHassanP.map(res => res.bac);
    b4 = this.situationListYM.map(res => res.bac);
    b5 = this.situationListJazouli.map(res => res.bac);
    b6 = this.situationListSebti.map(res => res.bac);
    b7 = this.situationListMyAbdrahmane.map(res => res.bac);


    const weatherDates: string[] = [];
    alldates.forEach((res) => {
      const jsdate = new Date(res);
      weatherDates.push(jsdate.toLocaleString('fr', { month: 'numeric', day: 'numeric'}));
    });
    console.log(weatherDates);

    if (this.barrageSelected === 'TAKERKOUST') {

      if (this.selected1 === 'volumeActuel') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: v0,
                label: 'Lalla TAKERKOUST',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de volume actuel de LALLA TAKERKOUST ',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      } else if (this.selected1 === 'pluie') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: p0,
                label: 'LALLA TAKERKOUST',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de pluie de LALLA TAKERKOUST ',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });
      } else if (this.selected1 === 'tr') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: tr0,
                label: 'LALLA TAKERKOUST',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: true,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de taux de Remplissage de LALLA TAKERKOUST ',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });
      } else if (this.selected1 === 'bac') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: b0,
                label: 'LALLA TAKERKOUST',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de Bac de LALLA TAKERKOUST',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      } else if (this.selected1 === 'debit') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: d0,
                label: 'LALLA TAKERKOUST',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit de LALLA TAKERKOUST',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      } else if (this.selected1 === 'tr-vn-va') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              // {
              //   data: tr0,
              //   label: 'TAUX DE REMPLISSAGE',
              //   borderColor: '#3cba9f',
              //   backgroundColor: '#5cd0b4',
              //   fill: true,
              //   lineTension: 0.1,
              // },
              {
                data: this.situationListTakerkoust.map(res => res.volumeNormal),
                label: 'VOLUME NORMALE',
                borderColor: '#790505',
                backgroundColor: '#ff3e82',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListTakerkoust.map(res => res.volumeActuel),
                label: 'VOLUME ACTUEL',
                borderColor: '#10abff',
                backgroundColor: '#1c98fa',
                fill: true,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de volume actuel, volume normal de LALLA TAKERKOUST',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true,
              }]

            },

          }
        });
      } else if (this.selected1 === 'p-b-d') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'bar',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: p0,
                label: 'PLUIE',
                borderColor: '#3cba9f',
                backgroundColor: '#5cd0b4',
                yAxisID: 'PLUIE',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListTakerkoust.map(res => res.bac),
                label: 'BAC',
                borderColor: '#67baff',
                backgroundColor: '#3e98ff',
                yAxisID: 'BAC',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListTakerkoust.map(res => res.debit),
                label: 'DEBIT',
                borderColor: '#b0a21e',
                yAxisID: 'PLUIE',
                backgroundColor: '#0a2d21',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit, pluie, bac de LALLA TAKERKOUST',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'PLUIE',
                },
                id: 'PLUIE',
                type: 'linear',
                position: 'left',
              }, {
                id: 'BAC',
                scaleLabel: {
                  display: true,
                  labelString: 'BAC',
                },
                position: 'right',
              }]

            },

          }
        });
      } else if (this.selected1 === 'va-d') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'bar',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: this.situationListTakerkoust.map(res => res.volumeActuel),
                label: 'VOLUME ACTUEL',
                borderColor: '#67baff',
                backgroundColor: '#3e98ff',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListTakerkoust.map(res => res.debit),
                label: 'DEBIT',
                borderColor: '#b0a21e',
                backgroundColor: '#16810c',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit, volume actuel de LALLA TAKERKOUST',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              // yAxes: [{
              //   display: true
              // }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'VOLUME ACTUEL',
                },
                id: 'PLUIE',
                type: 'linear',
                position: 'left',
              }, {
                id: 'BAC',
                scaleLabel: {
                  display: true,
                  labelString: 'DEBIT',
                },
                position: 'right',
              }]

            },

          }
        });
      }

    } else if (this.barrageSelected === 'M YOUSSEF') {
      if (this.selected1 === 'volumeActuel') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: v1,
                label: 'M YOUSSEF',
                borderColor: '#17d9a0',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de volume actuel de M YOUSSEF',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      } else if (this.selected1 === 'pluie') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: p1,
                label: 'M YOUSSEF',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de pluie de M YOUSSEF ',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });
      } else if (this.selected1 === 'tr') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: tr1,
                label: 'M YOUSSEF',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: true,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de taux de Remplissage de M YOUSSEF ',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });
      } else if (this.selected1 === 'bac') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: b1,
                label: 'M YOUSSEF',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de Bac de M YOUSSEF',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      } else if (this.selected1 === 'debit') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: d1,
                label: 'M YOUSSEF',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit de M YOUSSEF',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      } else if (this.selected1 === 'tr-vn-va') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              // {
              //   data: tr0,
              //   label: 'TAUX DE REMPLISSAGE',
              //   yAxisID: 'TAUX DE REMPLISSAGE',
              //   borderColor: '#3cba9f',
              //   backgroundColor: '#5cd0b4',
              //   fill: true,
              //   lineTension: 0.1,
              // },
              {
                data: this.situationListMYoussef.map(res => res.volumeNormal),
                label: 'VOLUME NORMALE',
                borderColor: '#bc3112',

                backgroundColor: '#3e98ff',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListMYoussef.map(res => res.volumeActuel),
                label: 'VOLUME ACTUEL',
                borderColor: '#22b8ff',

                backgroundColor: '#0a2d21',
                fill: true,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de volume actuel, volume normal de M YOUSSEF',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true,
              }]

            },

          }
        });
      } else if (this.selected1 === 'p-b-d') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'bar',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: p0,
                label: 'PLUIE',
                borderColor: '#3cba9f',
                backgroundColor: '#5cd0b4',
                yAxisID: 'PLUIE',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListMYoussef.map(res => res.bac),
                label: 'BAC',
                borderColor: '#67baff',
                backgroundColor: '#3e98ff',
                yAxisID: 'BAC',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListMYoussef.map(res => res.debit),
                label: 'DEBIT',
                borderColor: '#b0a21e',
                yAxisID: 'PLUIE',
                backgroundColor: '#0a2d21',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit, pluie, bac de M YOUSSEF',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'PLUIE',
                },
                id: 'PLUIE',
                type: 'linear',
                position: 'left',
              }, {
                id: 'BAC',
                scaleLabel: {
                  display: true,
                  labelString: 'BAC',
                },
                position: 'right',
              }]

            },

          }
        });
      } else if (this.selected1 === 'va-d') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'bar',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: this.situationListMYoussef.map(res => res.volumeActuel),
                label: 'VOLUME ACTUEL',
                borderColor: '#67baff',
                backgroundColor: '#3e98ff',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListMYoussef.map(res => res.debit),
                label: 'DEBIT',
                borderColor: '#b0a21e',
                backgroundColor: '#16810c',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit, volume actuel de M YOUSSEF',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              // yAxes: [{
              //   display: true
              // }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'VOLUME ACTUEL',
                },
                id: 'PLUIE',
                type: 'linear',
                position: 'left',
              }, {
                id: 'BAC',
                scaleLabel: {
                  display: true,
                  labelString: 'DEBIT',
                },
                position: 'right',
              }]

            },

          }
        });
      }
    } else if (this.barrageSelected === 'SIDI DRISS') {

      if (this.selected1 === 'tr-vn-va') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              // {
              //   data: tr0,
              //   label: 'TAUX DE REMPLISSAGE',
              //   yAxisID: 'TAUX DE REMPLISSAGE',
              //   borderColor: '#3cba9f',
              //   backgroundColor: '#5cd0b4',
              //   fill: true,
              //   lineTension: 0.1,
              // },
              {
                data: this.situationListSidiDris.map(res => res.volumeNormal),
                label: 'VOLUME NORMALE',
                borderColor: '#7a0c3b',
                // yAxisID: 'VOLUME ACTUEL',
                backgroundColor: '#3e98ff',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListSidiDris.map(res => res.volumeActuel),
                label: 'VOLUME ACTUEL',
                borderColor: '#22a5ec',
                backgroundColor: '#0a2d21',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de volume actuel, volume normal de SIDI DRISS',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true,
              }]

            },

          }
        });
      } else if (this.selected1 === 'p-b-d') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'bar',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: p0,
                label: 'PLUIE',
                borderColor: '#3cba9f',
                backgroundColor: '#5cd0b4',
                yAxisID: 'PLUIE',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListSidiDris.map(res => res.bac),
                label: 'BAC',
                borderColor: '#67baff',
                backgroundColor: '#3e98ff',
                yAxisID: 'BAC',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListSidiDris.map(res => res.debit),
                label: 'DEBIT',
                borderColor: '#b0a21e',
                yAxisID: 'PLUIE',
                backgroundColor: '#0a2d21',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit, pluie, bac de SIDI DRISS',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'PLUIE',
                },
                id: 'PLUIE',
                type: 'linear',
                position: 'left',
              }, {
                id: 'BAC',
                scaleLabel: {
                  display: true,
                  labelString: 'BAC',
                },
                position: 'right',
              }]

            },

          }
        });
      } else if (this.selected1 === 'va-d') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'bar',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: this.situationListSidiDris.map(res => res.volumeActuel),
                label: 'VOLUME ACTUEL',
                borderColor: '#67baff',
                backgroundColor: '#3e98ff',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListSidiDris.map(res => res.debit),
                label: 'DEBIT',
                borderColor: '#b0a21e',
                backgroundColor: '#16810c',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit, volume actuel de SIDI DRISS',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              // yAxes: [{
              //   display: true
              // }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'VOLUME ACTUEL',
                },
                id: 'PLUIE',
                type: 'linear',
                position: 'left',
              }, {
                id: 'BAC',
                scaleLabel: {
                  display: true,
                  labelString: 'DEBIT',
                },
                position: 'right',
              }]

            },

          }
        });
      } else if (this.selected1 === 'volumeActuel') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: v2,
                label: 'SIDI DRISS',
                borderColor: '#17d9a0',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de volume actuel de SIDI DRISS',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      } else if (this.selected1 === 'pluie') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: p2,
                label: 'SIDI DRISS',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de pluie de SIDI DRISS ',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });
      } else if (this.selected1 === 'tr') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: tr2,
                label: 'SIDI DRISS',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: true,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de taux de Remplissage de SIDI DRISS ',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });
      } else if (this.selected1 === 'bac') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: b2,
                label: 'SIDI DRISS',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de Bac de SIDI DRISS',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      } else if (this.selected1 === 'debit') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: d2,
                label: 'SIDI DRISS',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit de SIDI DRISS',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      }
    } else if (this.barrageSelected === 'HASSAN 1er') {
      if (this.selected1 === 'tr-vn-va') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              // {
              //   data: tr0,
              //   label: 'TAUX DE REMPLISSAGE',
              //   yAxisID: 'TAUX DE REMPLISSAGE',
              //   borderColor: '#3cba9f',
              //   backgroundColor: '#5cd0b4',
              //   fill: true,
              //   lineTension: 0.1,
              // },
              {
                data: this.situationListHassanP.map(res => res.volumeNormal),
                label: 'VOLUME NORMALE',
                borderColor: '#f31717',
                // yAxisID: 'VOLUME ACTUEL',
                backgroundColor: '#3e98ff',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListSidiDris.map(res => res.volumeActuel),
                label: 'VOLUME ACTUEL',
                borderColor: '#2a7dd6',
                // yAxisID: 'VOLUME ACTUEL',
                backgroundColor: '#0a2d21',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de volume actuel, volume normal de HASSAN 1ere',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true,
              }]
            },

          }
        });
      } else if (this.selected1 === 'p-b-d') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'bar',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: p0,
                label: 'PLUIE',
                borderColor: '#3cba9f',
                backgroundColor: '#5cd0b4',
                yAxisID: 'PLUIE',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListHassanP.map(res => res.bac),
                label: 'BAC',
                borderColor: '#67baff',
                backgroundColor: '#3e98ff',
                yAxisID: 'BAC',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListHassanP.map(res => res.debit),
                label: 'DEBIT',
                borderColor: '#b0a21e',
                yAxisID: 'PLUIE',
                backgroundColor: '#0a2d21',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit, pluie, bac de HASSAN 1ere',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'PLUIE',
                },
                id: 'PLUIE',
                type: 'linear',
                position: 'left',
              }, {
                id: 'BAC',
                scaleLabel: {
                  display: true,
                  labelString: 'BAC',
                },
                position: 'right',
              }]

            },

          }
        });
      } else if (this.selected1 === 'va-d') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'bar',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: this.situationListHassanP.map(res => res.volumeActuel),
                label: 'VOLUME ACTUEL',
                borderColor: '#b51717',
                backgroundColor: '#3e98ff',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListHassanP.map(res => res.debit),
                label: 'DEBIT',
                borderColor: '#3d85e3',
                backgroundColor: '#16810c',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit, volume actuel de HASSAN 1ere',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              // yAxes: [{
              //   display: true
              // }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'VOLUME ACTUEL',
                },
                id: 'PLUIE',
                type: 'linear',
                position: 'left',
              }, {
                id: 'BAC',
                scaleLabel: {
                  display: true,
                  labelString: 'DEBIT',
                },
                position: 'right',
              }]

            },

          }
        });
      } else if (this.selected1 === 'volumeActuel') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: v3,
                label: 'HASSAN 1er',
                borderColor: '#17d9a0',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de volume actuel de HASSAN 1er',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      } else if (this.selected1 === 'pluie') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: p3,
                label: 'HASSAN 1er',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de pluie de HASSAN 1er ',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });
      } else if (this.selected1 === 'tr') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: tr3,
                label: 'HASSAN 1er',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: true,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de taux de Remplissage de HASSAN 1er ',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });
      } else if (this.selected1 === 'bac') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: b3,
                label: 'HASSAN 1er',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de Bac de HASSAN 1er',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      } else if (this.selected1 === 'debit') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: d3,
                label: 'HASSAN 1er',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit de HASSAN 1er',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      }
    } else if (this.barrageSelected === 'YAAKOUB EL MANSOUR') {
      if (this.selected1 === 'tr-vn-va') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: this.situationListYM.map(res => res.volumeNormal),
                label: 'VOLUME NORMALE',
                borderColor: '#b52626',
                // yAxisID: 'VOLUME ACTUEL',
                backgroundColor: '#3e98ff',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListYM.map(res => res.volumeActuel),
                label: 'VOLUME ACTUEL',
                borderColor: '#2da1e2',
                // yAxisID: 'VOLUME ACTUEL',
                backgroundColor: '#0a2d21',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de volume actuel, volume normal de YAAKOUB EL MANSOUR',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true,
              }]

            },

          }
        });
      } else if (this.selected1 === 'p-b-d') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'bar',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: p0,
                label: 'PLUIE',
                borderColor: '#3cba9f',
                backgroundColor: '#5cd0b4',
                yAxisID: 'PLUIE',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListYM.map(res => res.bac),
                label: 'BAC',
                borderColor: '#67baff',
                backgroundColor: '#3e98ff',
                yAxisID: 'BAC',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListYM.map(res => res.debit),
                label: 'DEBIT',
                borderColor: '#b0a21e',
                yAxisID: 'PLUIE',
                backgroundColor: '#0a2d21',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit, pluie, bac de YAAKOUB EL MANSOUR',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'PLUIE',
                },
                id: 'PLUIE',
                type: 'linear',
                position: 'left',
              }, {
                id: 'BAC',
                scaleLabel: {
                  display: true,
                  labelString: 'BAC',
                },
                position: 'right',
              }]

            },

          }
        });
      } else if (this.selected1 === 'va-d') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'bar',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: this.situationListYM.map(res => res.volumeActuel),
                label: 'VOLUME ACTUEL',
                borderColor: '#67baff',
                backgroundColor: '#3e98ff',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListYM.map(res => res.debit),
                label: 'DEBIT',
                borderColor: '#b0a21e',
                backgroundColor: '#16810c',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit, volume actuel de YAAKOUB EL MANSOUR',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              // yAxes: [{
              //   display: true
              // }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'VOLUME ACTUEL',
                },
                id: 'PLUIE',
                type: 'linear',
                position: 'left',
              }, {
                id: 'BAC',
                scaleLabel: {
                  display: true,
                  labelString: 'DEBIT',
                },
                position: 'right',
              }]

            },

          }
        });
      } else if (this.selected1 === 'volumeActuel') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: v4,
                label: 'YAAKOUB EL MANSOUR',
                borderColor: '#17d9a0',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de volume actuel de YAAKOUB EL MANSOUR',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      } else if (this.selected1 === 'pluie') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: p4,
                label: 'YAAKOUB EL MANSOUR',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de pluie de YAAKOUB EL MANSOUR',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });
      } else if (this.selected1 === 'tr') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: tr4,
                label: 'YAAKOUB EL MANSOUR',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: true,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de taux de Remplissage de YAAKOUB EL MANSOUR ',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });
      } else if (this.selected1 === 'bac') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: b4,
                label: 'YAAKOUB EL MANSOUR',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de Bac de YAAKOUB EL MANSOUR',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      } else if (this.selected1 === 'debit') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: d4,
                label: 'YAAKOUB EL MANSOUR',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit de YAAKOUB EL MANSOUR',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      }
    } else if (this.barrageSelected === 'S.M.B.S JAZOULI') {
      if (this.selected1 === 'tr-vn-va') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              // {
              //   data: tr0,
              //   label: 'TAUX DE REMPLISSAGE',
              //   yAxisID: 'TAUX DE REMPLISSAGE',
              //   borderColor: '#3cba9f',
              //   backgroundColor: '#5cd0b4',
              //   fill: true,
              //   lineTension: 0.1,
              // },
              {
                data: this.situationListJazouli.map(res => res.volumeNormal),
                label: 'VOLUME NORMALE',
                borderColor: '#a51f3a',
                // yAxisID: 'VOLUME ACTUEL',
                backgroundColor: '#3e98ff',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListJazouli.map(res => res.volumeActuel),
                label: 'VOLUME ACTUEL',
                borderColor: '#2a7bf5',
                // yAxisID: 'VOLUME ACTUEL',
                backgroundColor: '#0a2d21',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de volume actuel, volume normal de Sd Mohamed Ben Slimane El Jazouli',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true,
              }]

            },

          }
        });
      } else if (this.selected1 === 'p-b-d') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'bar',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: p0,
                label: 'PLUIE',
                borderColor: '#3cba9f',
                backgroundColor: '#5cd0b4',
                yAxisID: 'PLUIE',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListJazouli.map(res => res.bac),
                label: 'BAC',
                borderColor: '#67baff',
                backgroundColor: '#3e98ff',
                yAxisID: 'BAC',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListJazouli.map(res => res.debit),
                label: 'DEBIT',
                borderColor: '#b0a21e',
                yAxisID: 'PLUIE',
                backgroundColor: '#0a2d21',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit, pluie, bac de Sd Mohamed Ben Slimane El Jazouli',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'PLUIE',
                },
                id: 'PLUIE',
                type: 'linear',
                position: 'left',
              }, {
                id: 'BAC',
                scaleLabel: {
                  display: true,
                  labelString: 'BAC',
                },
                position: 'right',
              }]

            },

          }
        });
      } else if (this.selected1 === 'va-d') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'bar',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: this.situationListJazouli.map(res => res.volumeActuel),
                label: 'VOLUME ACTUEL',
                borderColor: '#67baff',
                backgroundColor: '#3e98ff',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListJazouli.map(res => res.debit),
                label: 'DEBIT',
                borderColor: '#b0a21e',
                backgroundColor: '#16810c',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit, volume actuel de Sd Mohamed Ben Slimane El Jazouli',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              // yAxes: [{
              //   display: true
              // }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'VOLUME ACTUEL',
                },
                id: 'PLUIE',
                type: 'linear',
                position: 'left',
              }, {
                id: 'BAC',
                scaleLabel: {
                  display: true,
                  labelString: 'DEBIT',
                },
                position: 'right',
              }]

            },

          }
        });
      } else if (this.selected1 === 'volumeActuel') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: v5,
                label: 'Sd Mohamed Ben Slimane El Jazouli',
                borderColor: '#17d9a0',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de volume actuel de Sd Mohamed Ben Slimane El Jazouli',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      } else if (this.selected1 === 'pluie') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: p5,
                label: 'Sd Mohamed Ben Slimane El Jazouli',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de pluie de Sd Mohamed Ben Slimane El Jazouli',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });
      } else if (this.selected1 === 'tr') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: tr5,
                label: 'Sd Mohamed Ben Slimane El Jazouli',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: true,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de taux de Remplissage de Sd Mohamed Ben Slimane El Jazouli',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });
      } else if (this.selected1 === 'bac') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: b5,
                label: 'Sd Mohamed Ben Slimane El Jazouli',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de Bac de Sd Mohamed Ben Slimane El Jazouli',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      } else if (this.selected1 === 'debit') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: d5,
                label: 'Sd Mohamed Ben Slimane El Jazouli',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit de Sd Mohamed Ben Slimane El Jazouli',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      }
    } else if (this.barrageSelected === 'ABOU EL ABASS SEBTI') {
      if (this.selected1 === 'tr-vn-va') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              // {
              //   data: tr0,
              //   label: 'TAUX DE REMPLISSAGE',
              //   yAxisID: 'TAUX DE REMPLISSAGE',
              //   borderColor: '#3cba9f',
              //   backgroundColor: '#5cd0b4',
              //   fill: true,
              //   lineTension: 0.1,
              // },
              {
                data: this.situationListSebti.map(res => res.volumeNormal),
                label: 'VOLUME NORMALE',
                borderColor: '#67baff',
                // yAxisID: 'VOLUME ACTUEL',
                backgroundColor: '#3e98ff',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListSebti.map(res => res.volumeActuel),
                label: 'VOLUME ACTUEL',
                borderColor: '#b0a21e',
                // yAxisID: 'VOLUME ACTUEL',
                backgroundColor: '#0a2d21',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de  volume actuel, volume normal de ABOU EL ABASS SEBTI',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true,
              }]

            },

          }
        });
      } else if (this.selected1 === 'p-b-d') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'bar',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: p0,
                label: 'PLUIE',
                borderColor: '#3cba9f',
                backgroundColor: '#5cd0b4',
                yAxisID: 'PLUIE',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListSebti.map(res => res.bac),
                label: 'BAC',
                borderColor: '#67baff',
                backgroundColor: '#3e98ff',
                yAxisID: 'BAC',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListSebti.map(res => res.debit),
                label: 'DEBIT',
                borderColor: '#b0a21e',
                yAxisID: 'PLUIE',
                backgroundColor: '#0a2d21',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit, pluie, bac de ABOU EL ABASS SEBTI',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'PLUIE',
                },
                id: 'PLUIE',
                type: 'linear',
                position: 'left',
              }, {
                id: 'BAC',
                scaleLabel: {
                  display: true,
                  labelString: 'BAC',
                },
                position: 'right',
              }]

            },

          }
        });
      } else if (this.selected1 === 'va-d') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'bar',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: this.situationListSebti.map(res => res.volumeActuel),
                label: 'VOLUME ACTUEL',
                borderColor: '#67baff',
                backgroundColor: '#3e98ff',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListSebti.map(res => res.debit),
                label: 'DEBIT',
                borderColor: '#b0a21e',
                backgroundColor: '#16810c',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit, volume actuel de ABOU EL ABASS SEBTI',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              // yAxes: [{
              //   display: true
              // }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'VOLUME ACTUEL',
                },
                id: 'PLUIE',
                type: 'linear',
                position: 'left',
              }, {
                id: 'BAC',
                scaleLabel: {
                  display: true,
                  labelString: 'DEBIT',
                },
                position: 'right',
              }]

            },

          }
        });
      } else if (this.selected1 === 'volumeActuel') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: v6,
                label: 'ABOU EL ABASS SEBTI',
                borderColor: '#17d9a0',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de volume actuel de ABOU EL ABASS SEBTI',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      } else if (this.selected1 === 'pluie') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: p6,
                label: 'ABOU EL ABASS SEBTI',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de pluie de ABOU EL ABASS SEBTI',
              position: 'top'
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });
      } else if (this.selected1 === 'tr') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: tr6,
                label: 'ABOU EL ABASS SEBTI',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: true,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de taux de Remplissage de ABOU EL ABASS SEBTI',
              position: 'top'
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });
      } else if (this.selected1 === 'bac') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: b6,
                label: 'ABOU EL ABASS SEBTI',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de Bac de ABOU EL ABASS SEBTI',
              position: 'top'
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      } else if (this.selected1 === 'debit') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: d6,
                label: 'ABOU EL ABASS SEBTI',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit de ABOU EL ABASS SEBTI',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      }
    } else if (this.barrageSelected === ',MY ABDRAHMANE') {
      if (this.selected1 === 'tr-vn-va') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              // {
              //   data: tr0,
              //   label: 'TAUX DE REMPLISSAGE',
              //   yAxisID: 'TAUX DE REMPLISSAGE',
              //   borderColor: '#3cba9f',
              //   backgroundColor: '#5cd0b4',
              //   fill: true,
              //   lineTension: 0.1,
              // },
              {
                data: this.situationListMyAbdrahmane.map(res => res.volumeNormal),
                label: 'VOLUME NORMALE',
                borderColor: '#67baff',
                // yAxisID: 'VOLUME ACTUEL',
                backgroundColor: '#3e98ff',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListMyAbdrahmane.map(res => res.volumeActuel),
                label: 'VOLUME ACTUEL',
                borderColor: '#b0a21e',
                // yAxisID: 'VOLUME ACTUEL',
                backgroundColor: '#0a2d21',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de volume actuel, volume normal de ,MY ABDRAHMANE',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true,
              }]

            },

          }
        });
      } else if (this.selected1 === 'p-b-d') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'bar',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: p0,
                label: 'PLUIE',
                borderColor: '#3cba9f',
                backgroundColor: '#5cd0b4',
                yAxisID: 'PLUIE',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListMyAbdrahmane.map(res => res.bac),
                label: 'BAC',
                borderColor: '#67baff',
                backgroundColor: '#3e98ff',
                yAxisID: 'BAC',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListMyAbdrahmane.map(res => res.debit),
                label: 'DEBIT',
                borderColor: '#b0a21e',
                yAxisID: 'PLUIE',
                backgroundColor: '#0a2d21',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit, pluie, bac de ,MY ABDRAHMANE',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'PLUIE',
                },
                id: 'PLUIE',
                type: 'linear',
                position: 'left',
              }, {
                id: 'BAC',
                scaleLabel: {
                  display: true,
                  labelString: 'BAC',
                },
                position: 'right',
              }]

            },

          }
        });
      } else if (this.selected1 === 'va-d') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'bar',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: this.situationListMyAbdrahmane.map(res => res.volumeActuel),
                label: 'VOLUME ACTUEL',
                borderColor: '#67baff',
                backgroundColor: '#3e98ff',
                fill: false,
                lineTension: 0.1,
              }, {
                data: this.situationListMyAbdrahmane.map(res => res.debit),
                label: 'DEBIT',
                borderColor: '#b0a21e',
                backgroundColor: '#16810c',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit, volume actuel de ,MY ABDRAHMANE',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              // yAxes: [{
              //   display: true
              // }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'VOLUME ACTUEL',
                },
                id: 'PLUIE',
                type: 'linear',
                position: 'left',
              }, {
                id: 'BAC',
                scaleLabel: {
                  display: true,
                  labelString: 'DEBIT',
                },
                position: 'right',
              }]

            },

          }
        });
      } else if (this.selected1 === 'volumeActuel') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: v7,
                label: ',MY ABDRAHMANE',
                borderColor: '#17d9a0',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de volume actuel de ,MY ABDRAHMANE',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      } else if (this.selected1 === 'pluie') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: p7,
                label: ',MY ABDRAHMANE',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de pluie de ,MY ABDRAHMANE',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });
      } else if (this.selected1 === 'tr') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: tr7,
                label: ',MY ABDRAHMANE',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: true,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de taux de ,MY ABDRAHMANE',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });
      } else if (this.selected1 === 'bac') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: b7,
                label: ',MY ABDRAHMANE',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de Bac de ,MY ABDRAHMANE',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      } else if (this.selected1 === 'debit') {
        // @ts-ignore
        this.chart = new Chart('canvas', {
          type: 'line',

          data: {
            labels: weatherDates,
            datasets: [
              {
                data: d7,
                label: ',MY ABDRAHMANE',
                borderColor: '#3cba9f',
                backgroundColor: '#305F72',
                fill: false,
                lineTension: 0.1,
              },
            ],
          },
          options: {
            title: {
              display: true,
              text: 'Evolution de debit de ,MY ABDRAHMANE',
            },
            legend: {
              display: true,
              position: 'top',
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],

            },

          }
        });

      }
    }


  }


  graphLine1(): void {
    // @ts-ignore
    this.chart1 = null;
    const v0 = this.situationListTakerkoust.map(res => res.volumeActuel),
      p0 = this.situationListTakerkoust.map(res => res.pluie),
      tr0 = this.situationListTakerkoust.map(res => res.tauxRemplissage),
      d0 = this.situationListTakerkoust.map(res => res.debit),
      b0 = this.situationListTakerkoust.map(res => res.bac);

    const v1 = this.situationListMYoussef.map(res => res.volumeActuel),
      p1 = this.situationListMYoussef.map(res => res.pluie),
      tr1 = this.situationListMYoussef.map(res => res.tauxRemplissage),
      d1 = this.situationListMYoussef.map(res => res.debit),
      b1 = this.situationListMYoussef.map(res => res.bac);

    const v2 = this.situationListSidiDris.map(res => res.volumeActuel),
      p2 = this.situationListSidiDris.map(res => res.pluie),
      tr2 = this.situationListSidiDris.map(res => res.tauxRemplissage),
      d2 = this.situationListSidiDris.map(res => res.debit),
      b2 = this.situationListSidiDris.map(res => res.bac);


    const v3 = this.situationListHassanP.map(res => res.volumeActuel),
      p3 = this.situationListHassanP.map(res => res.pluie),
      tr3 = this.situationListHassanP.map(res => res.tauxRemplissage),
      d3 = this.situationListHassanP.map(res => res.debit),
      b3 = this.situationListHassanP.map(res => res.bac);


    const v4 = this.situationListYM.map(res => res.volumeActuel),
      p4 = this.situationListYM.map(res => res.pluie),
      tr4 = this.situationListYM.map(res => res.tauxRemplissage),
      d4 = this.situationListYM.map(res => res.debit),
      b4 = this.situationListYM.map(res => res.bac);


    const v5 = this.situationListJazouli.map(res => res.volumeActuel),
      p5 = this.situationListJazouli.map(res => res.pluie),
      tr5 = this.situationListJazouli.map(res => res.tauxRemplissage),
      d5 = this.situationListJazouli.map(res => res.debit),
      b5 = this.situationListJazouli.map(res => res.bac);


    const v6 = this.situationListSebti.map(res => res.volumeActuel),
      p6 = this.situationListSebti.map(res => res.pluie),
      tr6 = this.situationListSebti.map(res => res.tauxRemplissage),
      d6 = this.situationListSebti.map(res => res.debit),
      b6 = this.situationListSebti.map(res => res.bac);


    const v7 = this.situationListMyAbdrahmane.map(res => res.volumeActuel),
      p7 = this.situationListMyAbdrahmane.map(res => res.pluie),
      tr7 = this.situationListMyAbdrahmane.map(res => res.tauxRemplissage),
      d7 = this.situationListMyAbdrahmane.map(res => res.debit),
      b7 = this.situationListMyAbdrahmane.map(res => res.bac);
    const alldates = this.situationListTakerkoust.map(res => res.date);
    const weatherDates: string[] = [];
    alldates.forEach((res) => {
      const jsdate = new Date(res);
      weatherDates.push(jsdate.toLocaleString('fr', { month: 'numeric', day: 'numeric'}));
    });
    if (this.selected1 === 'volumeActuel') {

      // @ts-ignore
      this.chart1 = new Chart('canvas1', {
        type: 'line',

        data: {
          labels: weatherDates,

          datasets: [
            {
              data: v0,
              label: 'Lalla TAKERKOUST',
              borderColor: '#3cba9f',
              backgroundColor: '#305F72',
              fill: false,
              lineTension: 0.1,
            },
            {
              data: v1,
              label: 'M.Youssef',
              borderColor: '#ffcc00',
              fill: false
            },
            {
              data: v2,
              label: 'Sidi Driss',
              borderColor: '#2c4cb8',
              fill: false
            },
            {
              data: v3,
              label: 'HASSAN 1er',
              borderColor: '#15e718',
              fill: false
            },
            {
              data: v4,
              label: 'YAAKOUB EL MANSOUR',
              borderColor: '#ff2600',
              fill: false
            },
            {
              data: v5,
              label: 'S.M.B.S El Jazouli',
              borderColor: '#ff00f2',
              fill: false
            },
            {
              data: v6,
              label: 'ABOU EL ABASS SEBTI',
              borderColor: '#58dbd0',
              fill: false
            },
            {
              label: 'Bge MY ABDRHMANE',
              data: v7,
              // borderColor: '#943CBA',
              borderColor: '#f7ff00',
              fill: false
            },
          ],
        },
        options: {

          title: {
            display: true,
            text: 'EVOLUTION DE VOLUME ACTUEL',
            position: 'top'
          },
          legend: {
            display: true,
            position: 'left',
            fullWidth: true
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],

          },

        }
      });

    } else if (this.selected1 === 'pluie') {

      // @ts-ignore
      this.chart1 = new Chart('canvas1', {
        type: 'line',

        data: {
          labels: weatherDates,


          datasets: [
            {
              data: p0,
              label: 'Lalla TAKERKOUST',
              borderColor: '#3cba9f',
              backgroundColor: '#305F72',
              fill: false,
              lineTension: 0.1,
            },
            {
              data: p1,
              label: 'M.Youssef',
              borderColor: '#ffcc00',
              fill: false
            },
            {
              data: p2,
              label: 'Sidi Driss',
              borderColor: '#2c4cb8',
              fill: false
            },
            {
              data: p3,
              label: 'HASSAN 1er',
              borderColor: '#15e718',
              fill: false
            },
            {
              data: p4,
              label: 'YAAKOUB EL MANSOUR',
              borderColor: '#ff2600',
              fill: false
            },
            {
              data: p5,
              label: 'S.M.B.S El Jazouli',
              borderColor: '#ff00f2',
              fill: false
            },
            {
              data: p6,
              label: 'ABOU EL ABASS SEBTI',
              borderColor: '#58dbd0',
              fill: false
            },
            {
              label: 'Bge MY ABDRHMANE',
              data: p7,
              // borderColor: '#943CBA',
              borderColor: '#f7ff00',
              fill: false
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: 'EVOLUTION DE PLUIE',
            position: 'top'
          },
          legend: {
            display: true,
            position: 'left',
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],

          },

        }
      });

    } else if (this.selected1 === 'tr') {

      // @ts-ignore
      this.chart1 = new Chart('canvas1', {
        type: 'line',

        data: {
          labels: weatherDates,


          datasets: [
            {
              data: tr0,
              label: 'Lalla TAKERKOUST',
              borderColor: '#3cba9f',
              backgroundColor: '#305F72',
              fill: true,
              lineTension: 0.1,
            },
            {
              data: tr1,
              label: 'M.Youssef',
              borderColor: '#ffcc00',
              fill: true
            },
            {
              data: tr2,
              label: 'Sidi Driss',
              borderColor: '#2c4cb8',
              fill: true
            },
            {
              data: tr3,
              label: 'HASSAN 1er',
              borderColor: '#15e718',
              fill: true
            },
            {
              data: tr4,
              label: 'YAAKOUB EL MANSOUR',
              borderColor: '#ff2600',
              fill: true
            },
            {
              data: tr5,
              label: 'S.M.B.S El Jazouli',
              borderColor: '#ff00f2',
              fill: true
            },
            {
              data: tr6,
              label: 'ABOU EL ABASS SEBTI',
              borderColor: '#58dbd0',
              fill: true
            },
            {
              label: 'Bge MY ABDRHMANE',
              data: tr7,
              // borderColor: '#943CBA',
              borderColor: '#f7ff00',
              fill: true
            },
          ],
        },
        options: {

          title: {
            display: true,
            text: 'EVOLUTION DE TAUX DE REMPLISSAGE',
            position: 'top',
          },
          legend: {
            display: true,
            position: 'left',
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],

          },

        }
      });

    } else if (this.selected1 === 'debit') {


      // @ts-ignore
      this.chart1 = new Chart('canvas1', {
        type: 'line',

        data: {
          labels: weatherDates,


          datasets: [
            {
              data: d0,
              label: 'Lalla TAKERKOUST',
              borderColor: '#3cba9f',
              backgroundColor: '#305F72',
              fill: false,
              lineTension: 0.1,
            },
            {
              data: d1,
              label: 'M.Youssef',
              borderColor: '#ffcc00',
              fill: false
            },
            {
              data: d2,
              label: 'Sidi Driss',
              borderColor: '#2c4cb8',
              fill: false
            },
            {
              data: d3,
              label: 'HASSAN 1er',
              borderColor: '#15e718',
              fill: false
            },
            {
              data: d4,
              label: 'YAAKOUB EL MANSOUR',
              borderColor: '#ff2600',
              fill: false
            },
            {
              data: d5,
              label: 'S.M.B.S El Jazouli',
              borderColor: '#ff00f2',
              fill: false
            },
            {
              data: d6,
              label: 'ABOU EL ABASS SEBTI',
              borderColor: '#58dbd0',
              fill: false
            },
            {
              label: 'Bge MY ABDRHMANE',
              data: d7,
              // borderColor: '#943CBA',
              borderColor: '#f7ff00',
              fill: false
            },
          ],
        },
        options: {

          title: {
            display: true,
            text: 'EVOLUTION DE DEBIT',
            position: 'top',
          },
          legend: {
            display: true,
            position: 'left',
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],

          },

        }
      });

    } else if (this.selected1 === 'bac') {

      // @ts-ignore
      this.chart1 = new Chart('canvas1', {
        type: 'line',

        data: {
          labels: weatherDates,


          datasets: [
            {
              data: b0,
              label: 'Lalla TAKERKOUST',
              borderColor: '#3cba9f',
              backgroundColor: '#305F72',
              fill: false,
              lineTension: 0.1,
            },
            {
              data: b1,
              label: 'M.Youssef',
              borderColor: '#ffcc00',
              fill: false
            },
            {
              data: b2,
              label: 'Sidi Driss',
              borderColor: '#2c4cb8',
              fill: false
            },
            {
              data: b3,
              label: 'HASSAN 1er',
              borderColor: '#15e718',
              fill: false
            },
            {
              data: b4,
              label: 'YAAKOUB EL MANSOUR',
              borderColor: '#ff2600',
              fill: false
            },
            {
              data: b5,
              label: 'S.M.B.S El Jazouli',
              borderColor: '#ff00f2',
              fill: false
            },
            {
              data: b6,
              label: 'ABOU EL ABASS SEBTI',
              borderColor: '#58dbd0',
              fill: false
            },
            {
              label: 'Bge MY ABDRHMANE',
              data: b7,
              // borderColor: '#943CBA',
              borderColor: '#f7ff00',
              fill: false
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: 'EVOLUTION DE BAC ',
            position: 'top',
          },
          legend: {
            display: true,
            position: 'left',
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],

          },

        }
      });

    }


  }

  graphBar(): void {
    // @ts-ignore
    this.chart2 = null;
    const alldates = this.situationListTakerkoust.map(res => res.date);
    const weatherDates: string[] = [];
    alldates.forEach((res) => {
      const jsdate = new Date(res);
      weatherDates.push(jsdate.toLocaleString('fr', { month: 'numeric', day: 'numeric'}));
    });

    // @ts-ignore
    this.chart2 = new Chart('canvas2', {
      type: 'bar',
      data: {
        labels: weatherDates,
        datasets: [
          {
            data: this.situationListTakerkoust.map(res => res.volumeActuel),
            label: 'Lalla TAKERKOUST',
            borderColor: '#3cba9f',
            backgroundColor: '#305F72',
            fill: false,
            lineTension: 0.1
          },
          {
            data: this.situationListMYoussef.map(res => res.volumeActuel),
            label: 'M.Youssef',
            backgroundColor: '#ffcc00',
            fill: false
          },
          {
            data: this.situationListSidiDris.map(res => res.volumeActuel),
            label: 'Sidi Driss',
            backgroundColor: '#2c4cb8',
            fill: false
          },
          {
            data: this.situationListHassanP.map(res => res.volumeActuel),
            label: 'HASSAN 1er',
            backgroundColor: '#15e718',
            fill: false
          },
          {
            data: this.situationListYM.map(res => res.volumeActuel),
            label: 'YAAKOUB EL MANSOUR',
            backgroundColor: '#ff2600',
            fill: false
          },
          {
            data: this.situationListJazouli.map(res => res.volumeActuel),
            label: 'S.M.B.S El Jazouli',
            backgroundColor: '#ff00f2',
            fill: false
          },
          {
            data: this.situationListSebti.map(res => res.volumeActuel),
            label: 'ABOU EL ABASS SEBTI',
            backgroundColor: '#58dbd0',
            fill: false
          },
          {
            label: 'Bge MY ABDRHMANE',
            data: this.situationListMyAbdrahmane.map(res => res.volumeActuel),
            // borderColor: '#943CBA',
            backgroundColor: '#f7ff00',
            fill: false
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: 'evolution des volumes actuel des barrages',
          position: 'top',
        },
        legend: {
          display: true,
          position: 'left'
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],

        },
      }
    });

  }

  graphAnneau(dateSelected: Date): void {
    const dateString = this.datepipe.transform(dateSelected, 'yyyy-MM-dd\'T\'HH:mm');
    let totaleHorsBassin = Number();
    let totaleBassin = Number();
    this.selected = 'taux de remplissage';
    for (const key of Object.keys(this.mapVo)) {
      if (dateString === key) {
        const date = new Date(key);
        totaleHorsBassin = this.calculeTotale(1, date); // totale hors bassin
        totaleBassin = this.calculeTotale(2, date); // totale bassin
      }
    }
    this.pieChartData = [totaleHorsBassin, totaleBassin];
  }

}
