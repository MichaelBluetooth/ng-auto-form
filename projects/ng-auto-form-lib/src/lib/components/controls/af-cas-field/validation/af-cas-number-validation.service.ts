import { Injectable } from '@angular/core';

@Injectable()
export class AfCasNumberValidationService {

  private regex = /([0-9]{2,7})-([0-9]{2})-[0-9]/;

  isValid(cas: string) {
    if (cas) {
      if (!cas.match(this.regex)) {
        return false;
      }

      return this.getCheckDigit(cas).toString() === cas.slice(-1);
    }
    return true;
  }

  getCheckDigit(cas): number {
    const match = cas.match(this.regex);
    const digits = (match[1] + match[2]).split('').reverse();
    let sum = 0;

    for (let i = 0; i < digits.length; i++) {
      sum += (i + 1) * parseInt(digits[i], null);
    }

    return sum % 10;
  }
}
