import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [SharedModule, NavbarModule],
  declarations: [HomeComponent],
  providers: [],
})
export class HomeModule {}
