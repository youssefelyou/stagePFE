import {Component, OnInit} from '@angular/core';
import {StationClimatologiqueService} from '../../controller/service/station-climatologique.service';
import {StationClimatologique} from '../../controller/model/station-climatologique.model';
import {StationClimatologiqueListComponent} from '../station-climatologique-list/station-climatologique-list.component';

@Component({
  selector: 'app-station-climatologique-create',
  templateUrl: './station-climatologique-create.component.html',
  styleUrls: ['./station-climatologique-create.component.css']
})
export class StationClimatologiqueCreateComponent implements OnInit {

  constructor(private stationClimatologiqueService: StationClimatologiqueService,
              public stationList: StationClimatologiqueListComponent) {
  }

  ngOnInit(): void {
  }

  get stationclima(): StationClimatologique {
    return this.stationClimatologiqueService.stationclima;
  }

  public save() {
    this.stationClimatologiqueService.save();
    this.stationClimatologiqueService.findAll();
  }

  load() {
    this.stationClimatologiqueService.findAll();
    this.stationList.ngOnInit();
  }
}
