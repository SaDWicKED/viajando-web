import { Component, OnInit } from '@angular/core';
import {HeaderService} from "./header.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title: string;
  height: number;

  constructor(public headerService: HeaderService) {
    this.title = '';
    this.height = 300;
  }

  ngOnInit(): void {
    this.headerService.getTitle().subscribe(title => {
      this.title = title;
    });
    this.headerService.getHeight().subscribe(height => {
      this.height = height;
    });
  }

}
