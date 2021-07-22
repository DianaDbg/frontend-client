import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import { SharedModule } from '../../shared/shared.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { SidenavModule } from '../../components/sidenav/sidenav.module';
import { FooterModule } from '../../components/footer/footer.module';
import { MasterComponent } from './master.component';

@NgModule({
  imports: [SharedModule, MatSidenavModule, NavbarModule, SidenavModule, FooterModule],
  declarations: [MasterComponent],
  providers: [],
})
export class MasterModule {}
