import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GospelComponent } from '../gospel/gospel.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  gospel: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  scroll() {
    if (this.gospel) {
      this.gospel.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
  }

}
