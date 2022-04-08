import {Component, OnInit} from '@angular/core';
import {BaremeVolumeService} from '../../controller/service/bareme-volume.service';
import {BaremeVolume} from '../../controller/model/bareme-volume.model';
import {Barrage} from '../../controller/model/barrage.model';
import * as XLSX from 'xlsx';
import {Bareme} from '../../controller/model/bareme.model';
import {BaremeService} from '../../controller/service/bareme.service';
import {BaremeDebitComponent} from '../bareme-debit/bareme-debit.component';

@Component({
  selector: 'app-bareme-volume',
  templateUrl: './bareme-volume.component.html',
  styleUrls: ['./bareme-volume.component.css']
})
export class BaremeVolumeComponent implements OnInit {

  constructor(private baremeService: BaremeVolumeService,
              private baremeFixService: BaremeService,
              private baremeDebitComponent: BaremeDebitComponent) {
  }

  file: any;
  barrageName: any;
  data: [][] | undefined;

  get bareme(): BaremeVolume {
    return this.baremeService.bareme;
  }


  get baremeFix(): Bareme {
    return this.baremeFixService.bareme;
  }

  // tslint:disable-next-line:typedef
  public save() {
    return this.baremeService.save();
  }


  public save1() {
    return this.baremeFixService.save();
  }

  get barrages(): Array<Barrage> {
    return this.baremeService.barrageService.barrages;
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer> (evt.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    this.baremeService.deleteByNomBarrage(this.barrageName);

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      const wsname: string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));

      const x = this.data.slice(1);
      for (let i = 0; i < x.length; i++) {
        // console.log(x[i]);
        for (let j = 0; j <= x[i].length; j++) {
          // console.log(x[i][j]);
          this.bareme.barrage.name = this.barrageName;
          this.baremeFix.nom = this.barrageName;
          this.baremeFix.dateTime = this.baremeDebitComponent.date;
          if (j == 0) {
            // @ts-ignore
            this.bareme.cote = x[i][j];
            // @ts-ignore
            this.baremeFix.hauteur = x[i][j];
          } else if (j == 1) {
            // @ts-ignore
            this.bareme.a0 = x[i][j];
            // @ts-ignore
            this.baremeFix.a0 = x[i][j];
          } else if (j == 2) {
            // @ts-ignore
            this.bareme.a1 = x[i][j];
            // @ts-ignore
            this.baremeFix.a1 = x[i][j];
          } else if (j == 3) {// @ts-ignore
            this.bareme.a2 = x[i][j];
            // @ts-ignore
            this.baremeFix.a2 = x[i][j];
          } else if (j == 4) {// @ts-ignore
            this.bareme.a3 = x[i][j];
            // @ts-ignore
            this.baremeFix.a3 = x[i][j];
          } else if (j == 5) {// @ts-ignore
            this.bareme.a4 = x[i][j];
            // @ts-ignore
            this.baremeFix.a4 = x[i][j];
          } else if (j == 6) {// @ts-ignore
            this.bareme.a5 = x[i][j];
            // @ts-ignore
            this.baremeFix.a5 = x[i][j];
          } else if (j == 7) {// @ts-ignore
            this.bareme.a6 = x[i][j];
            // @ts-ignore
            this.baremeFix.a6 = x[i][j];
          } else if (j == 8) {// @ts-ignore
            this.bareme.a7 = x[i][j];
            // @ts-ignore
            this.baremeFix.a7 = x[i][j];
          } else if (j == 9) {// @ts-ignore
            this.bareme.a8 = x[i][j];
            // @ts-ignore
            this.baremeFix.a8 = x[i][j];
          } else if (j == 10) {// @ts-ignore
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

  get baremes(): Array<BaremeVolume> {
    return this.baremeService.barimes;
  }


  ngOnInit(): void {
    this.baremeService.findAll();
    this.baremeService.barrageService.findAll();
  }

}
