import { Component, HostListener, EventEmitter, Output, OnInit } from '@angular/core';
import { countries, Country, Language, languages } from 'countries-list';

import { FlagsAndLanguage } from '../../shared/types';

@Component({
  selector: 'app-navbar-1',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter();
  hasScrolled = false;
  flagsAndLanguages: FlagsAndLanguage[] = [];

  @HostListener('window:scroll', ['$event'])
  onVerticalScroll(): void {
    if (window.pageYOffset > 100 && this.hasScrolled === false) {
      this.hasScrolled = true;
    } else if (window.pageYOffset < 100 && this.hasScrolled === true) {
      this.hasScrolled = false;
    }
  }

  ngOnInit(): void {
    this.buildLanguagesOptions();
  }

  onToggleMenu() {
    this.toggleMenu.emit();
  }

  onLanguageOptionChange(event: Event) {
    // const select = event.target as HTMLSelectElement;
    // console.log('HTMLSelectElement', select.value);
  }

  buildLanguagesOptions() {
    void new Promise<void>(() => {
      this.flagsAndLanguages = ['GB', 'DE', 'FR', 'US'].map((key) => {
        const country = countries[key] as Country;
        const lang = languages[country.languages[0]] as Language;
        const value = country.languages[0];
        return { displayName: `${country.emoji} ${lang.native}`, value };
      });
    });
  }
}
