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
public resultado;
public parcial;
public acarreo = 0;
public inversoA;
public inversoB;
public arriba;
public abajo;

  constructor() {}

  Suma() {
    this.resultado = '';
    this.Ordenando();
    for (let i = 0; i < this.inversoA.length; i++) {
      if (this.acarreo === 0) {
        this.Sumando(this.inversoA[i], this.inversoB[i]);
      } else {
        this.acarreo = 0;
        this.Sumando(this.inversoA[i], this.inversoB[i]);
        this.Sumando(this.parcial, '1');
      }
      this.resultado = this.resultado + this.parcial;
    }
    if (this.acarreo === 1) {
      this.resultado = this.resultado + '1';
      this.acarreo = 0;
    }
    this.resultado = this.resultado.split('').reverse().join('');
    console.log(this.resultado);
  }
  Sumando(num1: string, num2: string) {
    if (num1 === '0' && num2 === '0') {
      this.parcial = '0';
    } else if (num1 === '1' && num2 === '1') {
      this.parcial = '0';
      this.acarreo = 1;
    } else {
      this.parcial = '1';
    }
  }
  // Control del número mayor arriba
  Resta() {}

  Restando(num1: string, num2: string) {
    if (num1 === '1' && num2 === '0') {
      this.parcial = '1';
    } else if (num1 === '0' && num2 === '1') {
      this.parcial = '1';
      this.acarreo = 1;
    } else {
      this.parcial = '0';
    }
  }

  Ordenando() {
    if (this.numeroA.length > this.numeroB.length) {
      this.inversoA = this.numeroA.split('').reverse().join('');
      this.inversoB = this.numeroB.split('').reverse().join('');
    } else {
      this.inversoA = this.numeroB.split('').reverse().join('');
      this.inversoB = this.numeroA.split('').reverse().join('');
    }
    const dif = this.inversoA.length - this.inversoB.length;
    for (let i = 0; i < dif; i++) {
      this.inversoB = this.inversoB + '0';
    }
  }

  Multiplicacion() {
    this.resultado = '';
    if (this.numeroB[0] === '1') {
      const arriba = this.inversoA;
      const abajo = '0';
      this.Suma();
    }
  }

}
