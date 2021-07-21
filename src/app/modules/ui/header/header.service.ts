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

  getTitle() {
    return this.titleSubject;
  }

  setTitle(title: string) {
    this.title = title;
    this.titleSubject.next(this.title);
  }

  setHeight(height: number) {
    this.height = height;
    this.heightSubject.next(this.height);
  }

  getHeight() {
    return this.heightSubject;
  }
}
