import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './layouts/footer/footer.component';
import { MainNavComponent } from './layouts/main-nav/main-nav.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { ConfirmDialogComponent } from '@@shared/pages/dialogs/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from '@@shared/pages/dialogs/confirm-dialog/confirm.service';
import { SnackbarComponent } from './pages/snackbar/snackbar.component';

@NgModule({
  declarations: [
    FooterComponent,
    MainNavComponent,
    NotFoundComponent,
    FilterPipePipe,
    ConfirmDialogComponent,
    SnackbarComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FooterComponent,
    MaterialModule,
    MainNavComponent,
    NotFoundComponent,
    FilterPipePipe,
    ConfirmDialogComponent,
    SnackbarComponent,
  ],
  providers: [ConfirmDialogService],
})
export class SharedModule {}
