import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'opencloseFilter',
  pure: false
})
export class OpenCloseFilter  implements PipeTransform{

   transform(park: any){
       let parkclass:String;
       if (!(park.Gesamt - park.Aktuell > 20)){
           parkclass = 'warningso';
       }
       if (park.Status === 'Geschlossen') {
           parkclass = 'danger';
       }
       return parkclass;
   }
}

@Pipe({
    name: 'hiddenParkHauser',
    pure: false
  })
  export class HiddenParkHauser  implements PipeTransform{
  
     transform(park: any){
         let hidde:boolean = false;
         if (park == 'Waffenplatz' || park == 'City' || park == 'Galeria' || park == 'Galeria Kaufhof' ||
             park == 'CCO Parkdeck 1' || park == 'CCO Parkdeck 2' || park == 'Hbf/ZOB' || park == 'Ratsherren' || 
             park == 'Altes Gymnasium' || park == 'Theatergarage'  || park == 'Heiligengeist-Hoefe'  || park == 'Schlosshoefe'  ){
             hidde=true;
         }
         return hidde;
     }
  }

@Pipe({
  name: 'freiplatzeFilter',
  pure: false
})
export class FreiPlatzeFilter  implements PipeTransform{
   transform(FreiPlatze: any){
       if (FreiPlatze > 20) {
           return 'greene';
       }
       if (FreiPlatze >10 && FreiPlatze <= 20 ) {
           return 'orange';
       }
       if (FreiPlatze <= 10) {
           return 'red';
       }
   }
}


@Pipe({
  name: 'statusFilter',
  pure: false
})
export class statusFilter  implements PipeTransform{
   transform(status: string){
       if (status === 'Offen') {
           return 'greene';
       }else{
           return 'red';
       }
   }
}
@Pipe({
  name: 'statusNameFilter',
  pure: false
})
export class statusNameFilter  implements PipeTransform{
   transform(status: string){
       if (status === 'Stoerung') {
           return 'Störung';
       }else{
           return status;
       }
   }
}


@Pipe({
  name: 'parkHausName',
  pure: false
})
export class parkHausName  implements PipeTransform{
   transform(name : string){
       if (name === 'Heiligengeist-Hoefe') {
           return 'Heiligengeist-Höfe';
       }
       if (name === 'Schlosshoefe') {
           return 'Schlosshöfe';
       }else{
           return name;
       }
   }
}

@Pipe({
  name: 'FreiPlatz',
  pure: false
})
export class FreiPlatz  implements PipeTransform{
   transform(i : number){
       if(i<0){
           return 0;
       }else{return i}
   }
}