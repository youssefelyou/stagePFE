import {Component, OnInit} from '@angular/core';
import {SituationBarrage} from '../../controller/model/situation-barrage.model';
import {SituationBarrageService} from '../../controller/service/situation-barrage.service';
import {DatePipe} from '@angular/common';
import {ExportAsConfig, ExportAsService} from 'ngx-export-as';

@Component({
  selector: 'app-list-situation',
  templateUrl: './list-situation.component.html',
  styleUrls: ['./list-situation.component.css']
})
export class ListSituationComponent implements OnInit {

  constructor(private situationBarrageService: SituationBarrageService,
              private exportAsService: ExportAsService,
              public datepipe: DatePipe) {
  }

  get situations(): Array<SituationBarrage>{
    return this.situationBarrageService.situations3;
  }

  datenow = new Date();
  yesterday = new Date();
  yt = Date.UTC(this.yesterday.getFullYear(), this.yesterday.getMonth(), this.yesterday.setDate(this.datenow.getDate()),
    this.yesterday.setHours(7, 0o0, 0o0, 0o0));


  ngOnInit(): void {
    // @ts-ignore
    const yesterday: Date = this.datepipe.transform(this.yesterday, 'MM-dd-yyyy h:mm:ss a');
    this.situationBarrageService.findByDate(yesterday, 3);
  }

  exportAsConfig: ExportAsConfig = {
    type: 'xlsx',
    elementIdOrContent: 'print',
    download: false,
    fileName: 'situation-barrages',
    options: { // html-docx-js document options
      orientation: 'portrait',
      margins: {
        // top: '20',
      },
    }
  };

  // tslint:disable-next-line:typedef
  export() {
    this.exportAsService.save(this.exportAsConfig, 'situation-barrages').subscribe(() => {
      // save started
    });
  }

  public update(index: number, situation: SituationBarrage) {
    this.situationBarrageService.update(index, situation);
  }
}
