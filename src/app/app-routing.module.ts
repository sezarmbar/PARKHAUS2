import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './pages/home';
import { HausParkComponent, HausMapComponent, HausTableComponent } from './pages/haus-park';
import {SlidScrolTestComponent} from './slid-scrol-test/slid-scrol-test.component';



const routes: Routes = [
    {path: '', component: HausTableComponent},
    {path: 'home', component: HomeComponent},
    {path: 'hauspark', component: HausTableComponent},
    {path: 'hausmap', component: HausMapComponent},
    {path: 'test', component: SlidScrolTestComponent},
    {path: '**', redirectTo: 'hauspark', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
    providers: []
})
export class ServiceAppRoutingModule { }
