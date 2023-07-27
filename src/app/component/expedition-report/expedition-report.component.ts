import {Component, OnInit} from '@angular/core';
import {ExpeditionService} from "../../service/expedition/expedition.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ExpeditionTargetService} from "../../service/expedition-target/expedition-target.service";
import {ExpeditionData} from "../../model/expeditionData";
import {TranslateService} from "@ngx-translate/core";
import {saveAs} from "file-saver";
import {AnimalService} from "../../service/animal/animal.service";


@Component({
  selector: 'app-expedition-report',
  templateUrl: './expedition-report.component.html',
  styleUrls: ['./expedition-report.component.css']
})
export class ExpeditionReportComponent implements OnInit {

  loaded = false;
  expedition!: ExpeditionData;
  sightingsByDayData: object = {};
  sightingsByDayOptions: object = {};
  sightingsByAnimalData: object = {};
  sightingsByAnimalOptions: object = {};
  expeditionId!: number;


  constructor(protected animalService: AnimalService, private expeditionService: ExpeditionService, private expeditionTargetService: ExpeditionTargetService, private route: ActivatedRoute, private translate: TranslateService, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.expeditionId = params['id'];
      this.expeditionService.getExpeditionData(this.expeditionId).subscribe(e => {
        this.expedition = e;
        this.getSightingsByDayData();
        this.getSightingsByAnimalData();

      })
    })
  }

  getSightingsByDayData() {
    const labels: string[] = [];
    const data: any[] = [];
    this.expedition.sightingsByDays.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    this.expedition.sightingsByDays.forEach(day => {
      labels.push(String(day.date).slice(0, 10))
      data.push(day.count)
    })

    this.loaded = true;
    this.sightingsByDayData = {
      labels: labels,
      datasets: [{
        type: 'bar',
        label: this.translate.instant("expeditionReport.sightings"),
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        data: data
      }]
    };

    this.sightingsByDayOptions = {
      maintainAspectRatio: false,
      aspectRatio: 1,
    };

  }


  private getSightingsByAnimalData() {
    const labels: string[] = [];
    const data: any[] = [];
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.expedition.sightingsByAnimals.sort((a, b) => {
      return b.count - a.count;
    });

    if (this.expedition.sightingsByAnimals.length > 8) {
      let i = 1;
      let otherCount = 0;
      this.expedition.sightingsByAnimals.forEach(animal => {
        if (animal.count > 0 && i < 8) {
          labels.push(this.animalService.getAnimalById(animal.animal.id)?.name??"undefined");
          data.push(animal.count);
          i++;
        } else if (i >= 8) {
          otherCount += animal.count
        }

      });
      if (otherCount > 0){
        labels.push(this.translate.instant("expeditionReport.other"))
        data.push(otherCount)
      }

    } else {
      this.expedition.sightingsByAnimals.forEach(animal => {
        if (animal.count > 0) {
          labels.push(this.animalService.getAnimalById(animal.animal.id)?.name??"undefined");
          data.push(animal.count);
        }
      });
    }


    this.sightingsByAnimalData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--cyan-500'), documentStyle.getPropertyValue('--purple-900'), documentStyle.getPropertyValue('--orange-500'), documentStyle.getPropertyValue('--purple-200')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--cyan-400'), documentStyle.getPropertyValue('--purple-800'), documentStyle.getPropertyValue('--orange-400'), documentStyle.getPropertyValue('--purple-100')]
        }
      ]
    };
    this.sightingsByAnimalOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }

  downloadCSV(): void {
    this.expeditionService.downloadExpeditionData(this.expeditionId).subscribe((buffer) => {
      const data: Blob = new Blob([buffer], {
        type: "text/csv;charset=utf-8"
      });
      // you may improve this code to customize the name
      // of the export based on date or some other factors
      saveAs(data, "expedition" + this.expeditionId + ".csv");
    });
  }

  goBack() {
    this.router.navigate(['/expedition/' + this.expeditionId]);
  }
}


