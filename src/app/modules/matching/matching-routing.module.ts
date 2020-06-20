import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchingMainComponent } from './pages/matching-main/matching-main.component';

const routes: Routes = [
  {
    path: '',
    component: MatchingMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatchingRoutingModule {}
