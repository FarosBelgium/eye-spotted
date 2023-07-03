import {Component, OnInit} from '@angular/core';
import {ExpeditionService} from '../../service/expedition/expedition.service';
import {Expedition} from '../../model/expedition';
import {FormControl, FormGroup} from "@angular/forms";
import {ExpeditionFilter} from "../../model/expedition-filter";
import {MessageService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {Tag} from "../../model/tag";
import {TagService} from "../../service/tag/tag.service";

@Component({
  selector: 'app-closed-expeditions',
  templateUrl: './closed-expeditions.component.html',
  styleUrls: ['./closed-expeditions.component.css']
})
export class ClosedExpeditionsComponent implements OnInit {


  filterForm = new FormGroup({
    name: new FormControl<string>(''),
    animal: new FormControl<string>(''),
    dateFrom: new FormControl<Date | null>(null),
    dateTo: new FormControl<Date | null>(null),
    tags: new FormControl<Tag[]>([])
  })

  constructor(private expeditionService: ExpeditionService, private messageService: MessageService, private translateService: TranslateService, private tagService: TagService) {
  }

  expeditions: Expedition[] = [];
  visible = false;
  tags!: Tag[];

  ngOnInit(): void {
    this.tagService.getTags().subscribe(t => {
      this.tags = t;
    });
    this.expeditionService.getClosedExpeditions().subscribe(expeditions => this.expeditions = expeditions);
  }

  filterExpeditions(): void {
    console.log(this.filterForm.value.tags ?? 're')
    const filter: ExpeditionFilter = {
      name: this.filterForm.value.name as string,
      animal: this.filterForm.value.animal as string,
      dateFrom: this.filterForm.value.dateFrom?.toISOString(),
      dateTo: this.filterForm.value.dateTo?.toISOString(),
      tags: this.filterForm.value.tags?.map(a => a.name) ?? []
    }
    this.getClosedExpeditions(filter);
  }

  showDialog(): void {
    this.visible = true;
  }

  clearFilter() {
    this.filterForm.reset();
    const message = this.translateService.instant("closedExpeditions.filterCleared");
    this.messageService.add({severity: "success", detail: message})
    this.filterExpeditions();
  }

  private getClosedExpeditions(filter: ExpeditionFilter | {} = {}): void {
    this.expeditionService.getClosedExpeditions(filter).subscribe(expeditions => {
      this.expeditions = expeditions
      this.visible = false;
    });
  }

}
