import { Component } from '@angular/core';
import { summaryFileName } from '@angular/compiler/src/aot/util';
import { SummaryResolver } from '@angular/compiler';
import { NumericValueAccessor, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
public numeroA;
public numeroB;
public resultado;
public resultadoSuma;
public parcial;
public acarreo = 0;
public inversoA;
public inversoB;
public sumaA;
public sumaB;
public control;
public mensaje;

  constructor(public alertController: AlertController) {}
  botonSuma() {
    this.Suma(this.numeroA, this.numeroB);
    this.alertaResultado();
  }

  Suma(numero1: string, numero2: string) {
    this.resultadoSuma = '';
    this.Ordenando(numero1, numero2);
    for (let i = 0; i < this.sumaA.length; i++) {
      if (this.acarreo === 0) {
        this.Sumando(this.sumaA[i], this.sumaB[i]);
      } else {
        this.acarreo = 0;
        this.Sumando(this.sumaA[i], this.sumaB[i]);
        this.Sumando(this.parcial, '1');
      }
      this.resultadoSuma = this.resultadoSuma + this.parcial;
    }
    if (this.acarreo === 1) {
      this.resultadoSuma = this.resultadoSuma + '1';
      this.acarreo = 0;
    }
    this.resultadoSuma = this.resultadoSuma.split('').reverse().join('');
    // this.alertaResultado();
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
  botonResta() {
    this.Resta(this.numeroA, this.numeroB);
    this.alertaResultado();
  }
  Resta(num1: string, num2: string) {
    this.ComprobarMayor(num1, num2);
    if (this.control === true) {
      this.resultadoSuma = '';
      this.sumaB = num2;
      const dif = num1.length - num2.length;
      for (let i = 0; i < dif; i++) {
        this.sumaB = '0' + this.sumaB;
      }
      console.log(num1, num2);
      for (let i = num1.length - 1; i >= 0; i--) {
        if (this.acarreo === 0) {
          this.Restando(num1[i], this.sumaB[i]);
        } else {
          this.acarreo = 0;
          this.Restando(num1[i], this.sumaB[i]);
          this.Restando(this.parcial, '1');
        }
        this.resultadoSuma = this.resultadoSuma + this.parcial;
      }
      this.resultadoSuma = this.resultadoSuma.split('').reverse().join('');
    } else {
      this.resultadoSuma = 'El primer numero debe ser mayor';
    }
  }

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

  Ordenando(num1: string, num2: string) {
    if (num1.length > num2.length) {
      this.sumaA = num1.split('').reverse().join('');
      this.sumaB = num2.split('').reverse().join('');
    } else {
      this.sumaA = num2.split('').reverse().join('');
      this.sumaB = num1.split('').reverse().join('');
    }
    const dif = this.sumaA.length - this.sumaB.length;
    for (let i = 0; i < dif; i++) {
      this.sumaB = this.sumaB + '0';
    }
  }

  Multiplicacion() {
    this.resultado = '0';
    let multiA, multiB, aumento = '';
    let sumaA, sumaB;
    if (this.numeroA.length < this.numeroB.length) {
      multiA = this.numeroB;
      multiB = this.numeroA;
    } else {
      multiA = this.numeroA;
      multiB = this.numeroB;
    }
    for (let i = multiB.length - 1; i >= 0; i--) {
      if (multiB[i] === '0') {
        sumaB = '0';
      } else {
        sumaB = multiA + aumento;
      }
      sumaA = this.resultado;
      aumento = aumento + '0';
      this.Suma(sumaA, sumaB);
      this.resultado = this.resultadoSuma;
    }
    this.alertaResultado();
  }
  ComprobarMayor(num1: string, num2: string) {
    let invertido = num1.split('').reverse().join('');
    let numero1 = 0;
    let numero2 = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < invertido.length; i++) {
      if (invertido[i] === '1') {
        numero1 = numero1 + Math.pow(2, i);
      }
    }
    invertido = num2.split('').reverse().join('');
    for (let i = 0; i < invertido.length; i++) {
      if (invertido[i] === '1') {
        numero2 = numero2 + Math.pow(2, i);
      }
    }
    if (numero1 < numero2) {
      this.control = false;
    } else {
      this.control = true;
    }
  }
  async alertaResultado() {
    const alert = await this.alertController.create({
      header: 'Resultado: ' + this.resultadoSuma,
      buttons: [
        {
          text: 'Procedimiento',
          role: 'proc',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Mostrar procedimiento');
          }
        }, {
          text: 'Aceptar',
        }
      ]
    });

    await alert.present();
  }
  Division() {
    this.ComprobarMayor(this.numeroA, this.numeroB);
    if (this.control === true) {
      let div1 = this.numeroA.substring(0, this.numeroB.length);
      this.ComprobarMayor(div1, this.numeroB);
      if (this.control === true) {
        this.Resta(div1, this.numeroB);
        this.resultado = '1';
        for (let i = this.numeroB.length; i < this.numeroA.length; i++) {
          div1 = this.resultadoSuma + this.numeroA[i];
          // console.log(div1);
          this.ComprobarMayor(div1, this.numeroB);
          if (this.control === true) {
            this.Resta(div1, this.numeroB);
            this.resultado = this.resultado + '1';
            console.log(this.resultadoSuma);
          } else {
            this.resultado = this.resultado + '0';
            this.resultadoSuma = div1;
          }
        }
        // console.log(this.resultado, this.resultadoSuma);
      } else {
        div1 = this.numeroA.substring(0, this.numeroB.length + 1);
      }
      console.log(this.resultado);
    }
  }

}
