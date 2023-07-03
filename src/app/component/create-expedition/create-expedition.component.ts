import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ExpeditionService} from "../../service/expedition/expedition.service";
import {CreateExpedition} from "../../model/createExpedition";
import {Animal} from "../../model/animal";
import {ExpeditionTargetId} from "../../model/expeditionTargetId";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {SelectAnimalsComponent} from "../select-animals/select-animals.component";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-create-expedition',
  templateUrl: './create-expedition.component.html',
  styleUrls: ['./create-expedition.component.css']
})

export class CreateExpeditionComponent {

  createForm: FormGroup = new FormGroup({
    expeditionName: new FormControl<string | null>(null, [Validators.required])
  });
  expeditionTargets: Animal[] = [];
  expeditionTargetsIds: ExpeditionTargetId[] = [];
  ref: DynamicDialogRef | undefined;
  loaded = false;

  constructor(private expeditionService: ExpeditionService, public dialogService: DialogService, private messageService: MessageService, private router: Router, private translate: TranslateService) {
  }

  onSubmit() {
    this.expeditionTargetsIds = this.expeditionTargets.map(animal => {
      const expeditionTargetId: ExpeditionTargetId = {
        animalId: animal.id
      }
      return expeditionTargetId
    })

    const expedition: CreateExpedition = {
      id: 0,
      name: this.createForm.controls.expeditionName.value,
      startDate: null,
      endDate: null,
      expeditionTargets: this.expeditionTargetsIds
    }
    if (expedition.name === null || expedition.name.length <= 0) {
      this.translate.get('toastr.noNameError').subscribe((res: string) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: res})
      })
      return;
    }
    if (expedition.expeditionTargets.length == 0) {
      this.translate.get('toastr.noAnimalsError').subscribe((res: string) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: res})
      })
      return;
    }
    this.expeditionService.createExpedition(expedition).subscribe(expedition => this.router.navigate(['/expedition/' + expedition.id]));
  }

  show() {
    const header = this.translate.instant('createExpedition.selectAnimals')
    this.ref = this.dialogService.open(SelectAnimalsComponent, {
      header: header,
      width: '95%',
      height: '100%',
      contentStyle: {overflow: 'auto'},
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((animals: Animal[]) => {
      if (animals) {
        this.expeditionTargets = animals;
        this.loaded = true;
      }
    });
  }

  deleteFromList(id: number) {
    this.expeditionTargets = this.expeditionTargets.filter(a => a.id !== id);
  }
}
