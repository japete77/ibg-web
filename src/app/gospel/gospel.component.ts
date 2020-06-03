import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-gospel',
  templateUrl: './gospel.component.html',
  styleUrls: ['./gospel.component.scss']
})
export class GospelComponent implements OnInit {

  @ViewChild(GospelComponent, { read: ElementRef }) gospel: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

}
