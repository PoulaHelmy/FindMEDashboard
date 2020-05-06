import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagDetailsComponent } from './pages/tag-details/tag-details.component';
import { TagsComponent } from './pages/tags/tags.component';
import { TagControlsComponent } from './pages/tag-controls/tag-controls.component';
import { TagUpdateComponent } from './pages/tag-update/tag-update.component';
const routes: Routes = [
  { path: '', component: TagsComponent },
  { path: 'create', component: TagControlsComponent, pathMatch: 'full' },
  { path: 'view/:id', component: TagDetailsComponent },
  { path: 'update/:id', component: TagUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagsRoutingModule {}
