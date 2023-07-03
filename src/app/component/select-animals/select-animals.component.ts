import {Component, OnInit} from '@angular/core';
import {AnimalService} from "../../service/animal/animal.service";
import {Animal} from "../../model/animal";
import {MessageService, TreeNode} from "primeng/api";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Column} from "../../model/elements/column";
import {TranslateService} from "@ngx-translate/core";
import {Tag} from "../../model/tag";
import {TagService} from "../../service/tag/tag.service";
import {ExpeditionTargetCount} from "../../model/expeditionTargetCount";


@Component({
  selector: 'app-select-animals',
  templateUrl: './select-animals.component.html',
  styleUrls: ['./select-animals.component.css']
})
export class SelectAnimalsComponent implements OnInit {
  constructor(protected animalService: AnimalService, public ref: DynamicDialogRef,
              private messageService: MessageService, private translate: TranslateService,
              private tagService: TagService, public config: DynamicDialogConfig) {

  }

  animals!: Animal[];
  categorizedAnimals!: TreeNode[];
  categorizedAnimals$!: TreeNode[];
  cols!: Column[];
  selectedNodes!: any;
  selectedTags: Tag[] = [];
  tags!: Tag[];
  animalsInExpedition!: ExpeditionTargetCount[];


  containsAllObjectsByName(array1: Tag[], array2: Tag[]): boolean {
    return array2.every((obj2) => array1.some((obj1) => obj1.name === obj2.name));
  }

  getAnimals() {
    let retrieved = this.animalService.animals;
    if (this.animalsInExpedition != null) {
      retrieved = retrieved.filter(animal => !this.animalsInExpedition.some(target => target.animalId === animal.id))
    }
    this.categorizedAnimals = [];
    if (this.selectedTags.length > 0) {
      retrieved = retrieved.filter(animal =>
        this.containsAllObjectsByName(animal.tags, this.selectedTags)
      );
    }
    retrieved.forEach(a => {
      if (this.categorizedAnimals.some(e => e.label === a.category.name)) {
        this.categorizedAnimals.forEach(c => {
          if (c.label === a.category?.name) {
            if (c.children !== undefined) {
              c.children.push({
                label: a.name, data: a
              });
            }
          }
        })
      } else {
        this.categorizedAnimals.push({
          label: a.category.name,
          data: a.category,
          children: [{label: a.name, data: a}]
        });
      }
    })
    this.categorizedAnimals$ = this.categorizedAnimals;
  }


  close() {
    this.animals = [];
    if (this.selectedNodes !== undefined) {
      for (let i = 0; i < this.selectedNodes.length; i++) {
        if (this.selectedNodes[i].children === undefined) {
          this.animals.push(this.selectedNodes[i].data);
        }
      }
      this.ref.close(this.animals);
    } else {
      this.translate.get('toastr.noAnimalsError').subscribe((res: string) => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: res})
      })
    }
  }

  ngOnInit() {
    this.tagService.getTags().subscribe(t => {
      this.tags = t;
    });
    if (this.config.data !== undefined) {
      this.animalsInExpedition = this.config.data.animals;
    }
    this.getAnimals();
    this.cols = [{field: 'name', header: 'Name'}]
  }

}
