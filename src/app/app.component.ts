import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "./service/auth/auth.service";
import {Router} from "@angular/router";
import {filter, first} from "rxjs";
import {LanguageService} from "./service/language/language.service";
import {AnimalService} from "./service/animal/animal.service";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  private readonly languageKey = "eyeSpottedLanguage";
  private readonly defaultLanguage = 'en';
  title = 'eyeSpotted Frontend';

  constructor(private translate: TranslateService, private languageService: LanguageService,
              protected authService: AuthService, private animalService: AnimalService,
              router: Router, messageService: MessageService) {
    languageService.selectedLanguage = localStorage[this.languageKey] ?? this.defaultLanguage;
    translate.setDefaultLang(this.defaultLanguage);
    translate.use(languageService.selectedLanguage);

    authService.tryContinueSession().pipe(first()).subscribe(success => {
      if (success) {
        router.navigate(['expeditions'])
      } else {
        router.navigate(['login'])
      }
    });

    translate.onLangChange.pipe(filter(() => authService.username !== undefined))
      .subscribe(() => {
        console.log("language changed");
        animalService.loadAnimals().subscribe();
      });
  }

  useLanguage(language: string): void {
    this.languageService.selectedLanguage = language;
    this.translate.use(language);
    localStorage[this.languageKey] = language;
  }

  get selectedLanguage(): string {
    return this.languageService.selectedLanguage;
  }
}
