import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../../shared/shared.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [SharedModule, TranslateModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  providers: [],
})
export class NavbarModule {}
