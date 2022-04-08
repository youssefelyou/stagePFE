import { Component, OnInit } from '@angular/core';
import {ObservationService} from '../../controller/service/observation.service';
import {Observation} from '../../controller/model/observation.model';

@Component({
  selector: 'app-observation-list',
  templateUrl: './observation-list.component.html',
  styleUrls: ['./observation-list.component.css']
})
export class ObservationListComponent implements OnInit {

  constructor(private observationService: ObservationService) { }

  get observations(): Array<Observation> {
    return this.observationService.observations;
  }
  ngOnInit(): void {
    this.observationService.findAll();
  }

}
