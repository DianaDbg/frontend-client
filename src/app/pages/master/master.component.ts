import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
})
export class MasterComponent implements OnInit {
  isSidenavOpen = false;
  isLargeSidenav = false;
  private isLargeScreen = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.isLargeScreen = this.breakpointObserver.isMatched([Breakpoints.Large, Breakpoints.XLarge]);
    if (this.isLargeScreen) {
      this.isSidenavOpen = true;
      this.isLargeSidenav = false;
    } else {
      this.isSidenavOpen = false;
      this.isLargeSidenav = true;
    }
  }

  toggleMenuHandler = () => {
    if (this.isLargeScreen) {
      this.isLargeSidenav = !this.isLargeSidenav;
    } else {
      this.isSidenavOpen = !this.isSidenavOpen;
    }
  };
}
