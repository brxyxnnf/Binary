import { Component } from '@angular/core';
import { summaryFileName } from '@angular/compiler/src/aot/util';
import { SummaryResolver } from '@angular/compiler';
import { NumericValueAccessor } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
public numeroA;
public numeroB;
public auxiliar_A: String="";
public auxiliar_B: String[];
  constructor() {
    
  }

  Suma(){

    console.log(this.numeroA[3]);
  }

  ordenarTexto(){
    var tamanoA:number=this.numeroA.length;    
    while(tamanoA>=0){
      this.auxiliar_A=this.auxiliar_A+this.numeroA[tamanoA];
      this.auxiliar_B.push(this.numeroA[tamanoA]);
      tamanoA--;
    }
    console.log(this.auxiliar_A);
    console.log(this.auxiliar_B);
  }

}
