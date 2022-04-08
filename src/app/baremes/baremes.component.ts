import {Component, OnInit} from '@angular/core';
import {BaremeDebitService} from '../controller/service/bareme-debit.service';
import {BaremeDebit} from '../controller/model/bareme-debit.model';
import {Station} from '../controller/model/station.model';
import * as XLSX from 'xlsx';
import {BaremeVolumeService} from '../controller/service/bareme-volume.service';
import {BaremeVolume} from '../controller/model/bareme-volume.model';
import {Barrage} from '../controller/model/barrage.model';
import {BaremeService} from '../controller/service/bareme.service';
import {Bareme} from '../controller/model/bareme.model';

@Component({
  selector: 'app-baremes',
  templateUrl: './baremes.component.html',
  styleUrls: ['./baremes.component.css']
})
export class BaremesComponent implements OnInit {
  constructor(private baremeService: BaremeService) {
  }

  get bareme(): Bareme {
    return this.baremeService.bareme;
  }

  get baremes(): Array<Bareme> {
    return this.baremeService.baremes;
  }

  public findByNom(nom: string) {
    this.baremeService.findByNom(nom);
  }

  public findAll() {
    this.baremeService.findAll();
  }


  ngOnInit(): void {
  }
}
