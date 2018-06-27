import 'hammerjs';

import { ApplicationRef, NgModule } from '@angular/core';
import { DialogContent, HomeComponent } from './pages/home';
import {
   DirectionsMapDirective,
   HausMapComponent,
   HausParkComponent,
   HausTableComponent,
   JsonPolyLineDirective,
   SideMapComponent
} from './pages/haus-park';
import { HttpModule, JsonpModule } from '@angular/http';
import {
   MdButtonModule,
   MdCheckboxModule,
   MdChipsModule,
   MdIconModule,
   MdInputModule,
   MdListModule,
   MdMenuModule,
   MdProgressBarModule,
   MdSidenavModule,
   MdTabsModule
} from '@angular/material';

import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParkTablePipe } from './pages/haus-park/pipe';
import { ServiceAppRoutingModule } from './app-routing.module';
import { SliderComponent } from './share/slider';
import { serivceModul } from './service/service.module';

@NgModule({
  declarations: [
    AppComponent,
    DialogContent,
    SliderComponent,
    HomeComponent,
    HausParkComponent,
    HausMapComponent,
    DirectionsMapDirective,
    SideMapComponent,
    JsonPolyLineDirective,
    HausTableComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule, MdCheckboxModule, MdSidenavModule, MdChipsModule,
     MdInputModule, MdProgressBarModule, MdMenuModule, MdTabsModule,
      MdIconModule, MdListModule,
    ServiceAppRoutingModule,
    ParkTablePipe,
    serivceModul,
    JsonpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDI4N7QdySwfP8aO0oWipZPbGKJHGAUI_M'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
