import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { AdminComponent } from './pages/admin.component';
import { TagsComponent } from './pages/tags/tags.component';
import { MaterialModule } from '../@shared/material/material.module';

import { CategoriesComponent } from './pages/categories/categories.component';
import { SubCategoriesComponent } from './pages/sub-categories/sub-categories.component';
import { InputsComponent } from './pages/inputs/inputs.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    AdminComponent,
    TagsComponent,
    CategoriesComponent,
    SubCategoriesComponent,
    InputsComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, MaterialModule],
})
export class AdminModule {}
