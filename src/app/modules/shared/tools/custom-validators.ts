import {FormControl} from "@angular/forms";

export class CustomValidators {

  static invalidName = (control: FormControl): { [key: string]: boolean } | null => {
    const nameReg = /^([a-zñáéíóúA-ZÁÉÍÓÚ.]+[\s]*)+$/g;
    if (!control.value.match(nameReg)) {
      return {nameIsInvalid: true};
    }
    return null;
  }

  static invalidID = (control: FormControl): { [key: string]: boolean } | null => {
    const idReg = /^[0-9][0-9]([0][1-9]|[1][0-2])([0][1-9]|[1|2][0-9]|[3][01])\d{5}$/g;
    const age = CustomValidators.getAgeByDNI(control.value);

    if (!control.value.match(idReg) || age < 0 || age > 120) {
      return {idIsInvalid: true};
    }
    return null;
  }

  static invalidPhone = (control: FormControl): { [key: string]: boolean } | null => {
    const phoneReg = /^\d{8}[0-9]*$/g;

    if (!control.value.match(phoneReg)) {
      return {phoneIsInvalid: true};
    }
    return null;
  }

  static getAgeByDNI(dni: string, date?: string): number {
    const centuryChar = dni.charAt(6);
    const century = (centuryChar === '9') ? 1800 : (0 <= +centuryChar && +centuryChar <= 5) ? 1900 : 2000;
    const year = (century + (+dni.substr(0, 2))).toString();
    const month = +dni.substr(2, 2);
    const day = +dni.substr(4, 2);

    const d1 = date? new Date(date).getTime() : Date.now();
    const d2 = new Date(year + '-' + month + '-' + day).getTime();
    return Math.floor((d1 - d2) / 31536000000);
  }

}
