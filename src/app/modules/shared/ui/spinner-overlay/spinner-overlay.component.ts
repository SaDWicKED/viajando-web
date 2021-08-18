import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-spinner-overlay',
  templateUrl: './spinner-overlay.component.html',
  styleUrls: ['./spinner-overlay.component.scss']
})
export class SpinnerOverlayComponent implements OnInit {
  @Input() message: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}