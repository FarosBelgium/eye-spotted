import {ClosedExpeditionsComponent} from './component/closed-expeditions/closed-expeditions.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./component/login/login.component";
import {OpenExpeditionsComponent} from "./component/open-expeditions/open-expeditions.component";
import {CreateExpeditionComponent} from "./component/create-expedition/create-expedition.component";
import {RegisterComponent} from "./component/register/register.component";
import {ExpeditionComponent} from "./component/expedition/expedition.component";
import {authGuard} from "./guard/auth/auth.guard";
import {ExpeditionReportComponent} from "./component/expedition-report/expedition-report.component";
import {animalGuard} from "./guard/animal/animal.guard";


const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: 'full'
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "expeditions",
    component: OpenExpeditionsComponent,
    canActivate: [authGuard, animalGuard]
  },
  {
    path: "expedition/:id",
    component: ExpeditionComponent,
    canActivate: [authGuard, animalGuard]
  },

  {
    path: "expedition/:id/report",
    component: ExpeditionReportComponent,
    canActivate: [authGuard, animalGuard]
  },
  {
    path: "closedExpedition/:id/report",
    component: ExpeditionReportComponent,
    canActivate: [authGuard, animalGuard]
  }

  ,
  {
    path: "closedExpeditions",
    component: ClosedExpeditionsComponent,
    canActivate: [authGuard, animalGuard]
  },
  {
    path: "closedExpedition/:id",
    component: ExpeditionComponent,
    canActivate: [authGuard, animalGuard]
  },
  {
    path: "createExpedition",
    component: CreateExpeditionComponent,
    canActivate: [authGuard, animalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
