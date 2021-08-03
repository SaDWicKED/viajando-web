import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RedirectionService {
  private returnUrl = 'availability';

  constructor() {
  }

  getReturnURL(): string {
    return this.returnUrl;
  }

  setReturnURL(newURL: string): void {
    const re = /,/g;
    this.returnUrl = newURL.replace(re, '/');
  }
}
