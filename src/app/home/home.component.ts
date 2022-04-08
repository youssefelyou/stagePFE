import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbCarousel, NgbSlideEvent, NgbSlideEventSource} from '@ng-bootstrap/ng-bootstrap';
import * as Chart from 'chart.js';
import {SituationBarrage} from '../controller/model/situation-barrage.model';
import {SituationBarrageService} from '../controller/service/situation-barrage.service';
import {DatePipe} from '@angular/common';
import {ChartOptions, ChartType} from 'chart.js';
import {Label, SingleDataSet} from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private situationBarrageService: SituationBarrageService,
              public datepipe: DatePipe) {
  }

  get situations(): Array<SituationBarrage> {
    return this.situationBarrageService.situations3;
  }

  mixedChart: Chart | undefined;


  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  chart: Chart | undefined;
  // @ts-ignore
  @ViewChild('carousel', {static: true}) carousel: NgbCarousel;

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
  public pieChartLabels: Label[] = [['Taux de remplissage des barrages hors bassin'], ['Taux de remplissage des barrages sous bassin']];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [{
    backgroundColor: ['rgb(97,172,255)', '#6dba54'],
  }];

  datenow = new Date();
  today = new Date();
  yt = Date.UTC(this.today.getFullYear(), this.today.getMonth(), this.today.setDate(this.datenow.getDate()),
    this.today.setHours(7, 0o0, 0o0, 0o0));


  // tslint:disable-next-line:typedef
  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  // tslint:disable-next-line:typedef
  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  ngOnInit(): void {
    // @ts-ignore
    const yesterday: Date = this.datepipe.transform(this.today, 'MM-dd-yyyy h:mm:ss a');
    this.situationBarrageService.findByDate(yesterday, 3);
    this.getGraph();
  }

  getGraph(): void {
    this.mixedChart = new Chart('canvas1', {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Taux de remplissage',
          data: this.situations.map(res => res.tauxRemplissage),
          backgroundColor: '#6dba54',
          borderColor: '#041d4e',
          order: 2,
        }],
        labels: this.situations.map(res => res.barrage.name),

      },
    });
  }


  calculeTotale(index: number): number {
    let volumeActuelTotaleBassin = 0;
    let volumeActuelTotaleHorsBassin = 0;
    let volumeNormalTotaleBassin = 0;
    let volumeNormalTotaleHorsBassin = 0;
    for (const item of this.situations) {
      if (item.barrage.type1 === 'bassin') {
        volumeActuelTotaleBassin = volumeActuelTotaleBassin + item.volumeActuel;
        volumeNormalTotaleBassin = volumeNormalTotaleBassin + item.volumeNormal;
      } else {
        volumeActuelTotaleHorsBassin = volumeActuelTotaleHorsBassin + item.volumeActuel;
        volumeNormalTotaleHorsBassin = volumeNormalTotaleHorsBassin + item.volumeNormal;
      }
    }
    if (index === 1) {
      return ((volumeActuelTotaleBassin / volumeNormalTotaleBassin) * 100);
    } else {
      return (volumeActuelTotaleHorsBassin / volumeNormalTotaleHorsBassin) * 100;
    }
  }

}
