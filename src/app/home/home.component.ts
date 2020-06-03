import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { GospelComponent } from '../gospel/gospel.component';
import { HeaderComponent } from '../header/header.component';
import { SermonsComponent } from '../sermons/sermons.component';
import { ContactComponent } from '../contact/contact.component';
import { MeetingsComponent } from '../meetings/meetings.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild(HeaderComponent, { read: ElementRef }) header: ElementRef;
  @ViewChild(GospelComponent, { read: ElementRef }) gospel: ElementRef;
  @ViewChild(MeetingsComponent, { read: ElementRef }) meetings: ElementRef;
  @ViewChild(SermonsComponent, { read: ElementRef }) sermons: ElementRef;
  @ViewChild(ContactComponent, { read: ElementRef }) contact: ElementRef;
  @ViewChild(HeaderComponent) headerComponent : HeaderComponent;
  @ViewChild('navbarResponsive') navbarResponsive: ElementRef;
  
  pathname: string;
  hash : string;
  hostname: string;

  constructor() { }

  ngAfterViewInit(): void {
    this.headerComponent.gospel = this.gospel;
  }

  ngOnInit(): void {
    this.navCollapse();
  }

  scroll(element: ElementRef) {
    element.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    this.navbarResponsive.nativeElement.classList.remove('show')
  }


  @HostListener("window:scroll", ['$event'])
  windowScroll($event: any) {
    this.navCollapse();
  }

  navCollapse() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-scrolled");
    } else {
      $("#mainNav").removeClass("navbar-scrolled");
    }
  }

}
