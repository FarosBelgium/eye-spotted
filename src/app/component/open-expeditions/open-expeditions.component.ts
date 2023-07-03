import {Component, OnInit} from '@angular/core';
import {ExpeditionService} from "../../service/expedition/expedition.service";
import {Expedition} from "../../model/expedition";

@Component({
  selector: 'app-open-expeditions',
  templateUrl: './open-expeditions.component.html',
  styleUrls: ['./open-expeditions.component.css']
})
export class OpenExpeditionsComponent implements OnInit{
  expeditions : Expedition[] =[];
  constructor(private expeditionService: ExpeditionService) {
  }

  ngOnInit() {
    this.expeditionService.getOpenExpeditions().subscribe(expeditions => this.expeditions = expeditions);
  }


}
