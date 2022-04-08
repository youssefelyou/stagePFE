import { Component, OnInit } from '@angular/core';
import {Observation} from '../../controller/model/observation.model';
import {ObservationService} from '../../controller/service/observation.service';
import {SituationBarrage} from '../../controller/model/situation-barrage.model';

@Component({
  selector: 'app-observation-create',
  templateUrl: './observation-create.component.html',
  styleUrls: ['./observation-create.component.css']
})
export class ObservationCreateComponent implements OnInit {

  constructor(private  observationService: ObservationService) { }

  get observation(): Observation {
    return this.observationService.observation;
  }
  public save(){
    return this.observationService.save();
  }
  ngOnInit(): void {
    this.observation.fuits = '';
    this.observation.aep = 0;
    this.observation.bp = 0;
    this.observation.cam = 0;
    this.observation.cmg = 0;
    this.observation.cr = 0;

  }
}
