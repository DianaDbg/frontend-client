import { HostListener, EventEmitter, Output } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-1',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Output() toggleMenu = new EventEmitter();
  hasScrolled = false;

  @HostListener('window:scroll', ['$event'])
  onVerticalScroll(): void {
    if (window.pageYOffset > 100 && this.hasScrolled === false) {
      this.hasScrolled = true;
    } else if (window.pageYOffset < 100 && this.hasScrolled === true) {
      this.hasScrolled = false;
    }
  }

  onToggleMenu() {
    this.toggleMenu.emit();
  }
}
