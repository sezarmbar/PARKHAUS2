import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MdSidenav, MdTabGroup } from "@angular/material";
import { ParkingsService, addresShared } from '../../../service';

import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { SideMapComponent } from '../side-map';
import { SliderComponent } from '../../../share/slider';

@Component({
  selector: 'app-haus-table',
  templateUrl: './haus-table.component.html',
  styleUrls: ['./haus-table.component.scss']
})
export class HausTableComponent implements OnInit {
  @ViewChild('tabsEnd') tabEnd: MdTabGroup;
  @ViewChild('sidenavEnd') sidenav: MdSidenav;
  @ViewChild('planRout') elPlanRout: ElementRef;
  @ViewChild(SideMapComponent) sideMap;
  @ViewChild(SliderComponent) sliderChild;
  public sideMapShow: boolean = true;
  public slideInit: boolean = false;
  public Parkhaus: any;
  public lastTime: any;
  public currentPark :any = {Gesamt:0,Aktuell:0,Name:'',Status:''};
  public selectedIndex;
  public currentParkName: any;
  public subscription;
  // public Aktuell;
  // public Gesamt;
  // public Name;
  // public Status;
  constructor(public service: ParkingsService, public addresService: addresShared, public router: Router) { }

  ngOnInit() {
    this.callService();
    this.subscription = Observable.interval(1000 * 60).subscribe(x => {
      this.callService();
    });
  }

  callService() {
    this.service.getParks().subscribe(
      (parkings) => {
        this.Parkhaus = parkings.Daten.Parkhaus;
        this.lastTime = (parkings.Daten.Zeitstempel).split(' ').join(' - ');
      });
  }
  closeSidenave() {
    this.sidenav.close();
  }
  onCloseSidenavEnd() {
    this.tabEnd.selectedIndex = 0;
    this.slideInit = false;
    this.addresService.setParkHausName("");
  }
  onOpenSidenavEnd(park) {
    this.currentParkName = park.Name;
  }
  mapShow() {
    this.sideMap.serchAddres(this.currentParkName)
  }
  showPark(park) {
    this.addresService.setParkHausName(park.Name);
    this.currentPark = park;
    this.sidenav.open();
    this.slideInit = true;
  }
  onSelectChange = (event: any): void => {
    if (event.index === 0) {
      this.slideInit = true;
    } else {
      this.slideInit = true;
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
