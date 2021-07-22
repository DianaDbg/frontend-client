import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SharedModule } from '../../shared/shared.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [MatToolbarModule, SharedModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  providers: [],
})
export class NavbarModule {}
