import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import {
  MediaMatcher,
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // menubar configuration provide by angular material
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  @ViewChild('drawerLeft') drawerLeft: any;
  @ViewChild('drawerRight') drawerRight: any;
  public selectedItem : string = '';
   public isHandset$: Observable<boolean> = this.breakpointObserver
     .observe(Breakpoints.Handset)
     .pipe(map((result: BreakpointState) => result.matches));

  headerList = [
    { name: 'Change Clinic', value: 'change clinic' },
    { name: 'Profile', value: 'Profile' },
    { name: 'Update Password', value: 'Update Password' },
    { name: 'Logout', value: 'Logout' },
  ]

  constructor(
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    // menubar configuration provide by angular material
    // do not modify content
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  
closeSideNav() {
  if (this.drawerLeft._mode=='over') {
    this.drawerLeft.close();
  }
  if (this.drawerRight._mode=='over') {
    this.drawerRight.close();
  }
}

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


}
