import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../youtube.service';
import { Item } from '../models/youtube.models';
import { DomSanitizer } from '@angular/platform-browser';
import { SermonsService } from '../sermons.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {

  constructor(private sermonsService: SermonsService) { }

  ngOnInit(): void {
  }
}
