import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { HomeComponent } from './pages/home.component';

@NgModule({
  declarations: [AboutUsComponent, ContactUsComponent, HomeComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
