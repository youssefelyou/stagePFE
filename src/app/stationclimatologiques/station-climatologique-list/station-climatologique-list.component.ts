import { Component, OnInit } from '@angular/core';
import {StationClimatologiqueService} from '../../controller/service/station-climatologique.service';
import {StationClimatologique} from '../../controller/model/station-climatologique.model';


@Component({
  selector: 'app-station-climatologique-list',
  templateUrl: './station-climatologique-list.component.html',
  styleUrls: ['./station-climatologique-list.component.css']
})
export class StationClimatologiqueListComponent implements OnInit {

  constructor(private stationClimatologiqueService: StationClimatologiqueService) { }


  get stationclimas(): Array<StationClimatologique> {
    return this.stationClimatologiqueService.stationclimas;
  }

  // tslint:disable-next-line:typedef
  public update(index: number, stationclima: StationClimatologique){
    this.stationClimatologiqueService.update(index, stationclima );
  }

  ngOnInit(): void {
    this.stationClimatologiqueService.findAll();
  }

}
