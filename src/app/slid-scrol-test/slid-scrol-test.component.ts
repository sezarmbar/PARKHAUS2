import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { MdSidenav, MdTabGroup } from "@angular/material";
import { SliderComponent } from './../share/slider';
import { ParkingsService, addresShared } from './../service';
import { SideMapComponent } from '../pages/haus-park/side-map';

@Component({
  selector: 'app-slid-scrol-test',
  templateUrl: './slid-scrol-test.component.html',
  styleUrls: ['./slid-scrol-test.component.scss']
})
export class SlidScrolTestComponent {

}
