import {FreiPlatz, FreiPlatzeFilter, HiddenParkHauser, OpenCloseFilter, parkHausName, statusFilter, statusNameFilter} from "./table.pipe";

import {CommonModule} from "@angular/common";
import { NgModule } from '@angular/core';

@NgModule({
  declarations:[statusFilter,OpenCloseFilter,FreiPlatzeFilter,parkHausName,FreiPlatz,statusNameFilter,HiddenParkHauser],
  imports:[CommonModule],
  exports:[statusFilter,FreiPlatz,OpenCloseFilter,FreiPlatzeFilter,parkHausName,statusNameFilter,HiddenParkHauser]
})

export class ParkTablePipe{}