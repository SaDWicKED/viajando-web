import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  title: string;
  titleSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  height: number;
  heightSubject: BehaviorSubject<number> = new BehaviorSubject<number>(300);
  constructor() {
    this.title = '';
    this.height = 300;
  }

  getTitle(): BehaviorSubject<string> {
    return this.titleSubject;
  }

  setTitle(title: string): void {
    this.title = title;
    this.titleSubject.next(this.title);
  }

  setHeight(height: number): void {
    this.height = height;
    this.heightSubject.next(this.height);
  }

  getHeight(): BehaviorSubject<number> {
    return this.heightSubject;
  }
}
