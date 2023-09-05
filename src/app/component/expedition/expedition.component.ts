import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ExpeditionService} from "../../service/expedition/expedition.service";
import {Expedition} from "../../model/expedition";
import {ExpeditionTargetCount} from "../../model/expeditionTargetCount";
import {ExpeditionTargetService} from "../../service/expedition-target/expedition-target.service";
import {AnimalService} from "../../service/animal/animal.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {TranslateService} from "@ngx-translate/core";
import {SelectAnimalsComponent} from "../select-animals/select-animals.component";
import {Animal} from "../../model/animal";

@Component({
  selector: 'app-expedition',
  templateUrl: './expedition.component.html',
  styleUrls: ['./expedition.component.css']
})
export class ExpeditionComponent implements OnInit {

  constructor(private route: ActivatedRoute, private expeditionService: ExpeditionService,
              private expeditionTargetService: ExpeditionTargetService, protected animalService: AnimalService,
              private _router: Router, private dialogService: DialogService, private translate: TranslateService) {
  }

  ref: DynamicDialogRef | undefined;
  expedition!: Expedition;
  expeditionDataLoaded = false;
  expeditionTargets!: ExpeditionTargetCount[];
  expeditionTargetsLoaded = false;
  targets!: any;

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.route.params.subscribe(params => {
      this.expeditionService.getExpeditionTargets(params['id']).subscribe(eT => {
        eT.sort((a, b) => {
          const animalA = this.animalService.getAnimalById(a.animalId);
          const animalB = this.animalService.getAnimalById(b.animalId);

          if (animalA && animalB && animalA.name < animalB.name) {
            return -1;
          } else if (animalA && animalB && animalA.name > animalB.name) {
            return 1;
          }
          return 0;
        })
        this.expeditionTargets = eT;
        this.expeditionTargetsLoaded = true;
      });
      this.expeditionService.getExpedition(params['id']).subscribe(exp => {
        this.expedition = exp;
        this.expeditionDataLoaded = true;
      });
    });
  }

  registerSighting(target: ExpeditionTargetCount) {
    this.expeditionTargetService.registerSighting(target.id).subscribe(() => target.sightingsCount++);
  }

  removeSighting(target: ExpeditionTargetCount) {
    if (target.sightingsCount > 0) {
      this.expeditionTargetService.removeSighting(target.id).subscribe(() => target.sightingsCount--);
    }
  }

  finishExpedition() {
    this.expeditionService.closeExpedition(this.expedition.id).subscribe(() => this._router.navigateByUrl("/closedExpedition/" + this.expedition.id));
  }

  addAnimals() {
    const header = this.translate.instant('createExpedition.selectAnimals')
    this.ref = this.dialogService.open(SelectAnimalsComponent, {
      data: {
        animals: this.expeditionTargets
      },
      header: header,
      width: '95%',
      height: '100%',
      contentStyle: {overflow: 'auto'},
      baseZIndex: 10000
    });
    this.ref.onClose.subscribe((animals: Animal[]) => {
      let animalIds = animals.map(a => a.id);
      this.expeditionService.addExpeditionTargets(animalIds, this.expedition.id).subscribe(() => this.getData());

    })

  }
}
