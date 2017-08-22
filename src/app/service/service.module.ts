import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParkingsService } from './';
import { addresShared } from './';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [],
  providers: [ParkingsService, addresShared]
})

export class serivceModul { }