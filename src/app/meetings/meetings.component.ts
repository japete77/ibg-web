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

  liveEvent : Item;

  constructor(private sermonsService: SermonsService) { }

  ngOnInit(): void {
    this.sermonsService.getLive()
    .then(response => {
      if (response && response.live) {
        this.liveEvent = response.live;
      }
    });
  }

  getLiveCoverUrl() {
    return this.liveEvent.snippet.thumbnails ? this.liveEvent.snippet.thumbnails.high.url : 'assets/covers/default-cover.jpg'
  }

  openLive() {
    window.open(
      'https://www.youtube.com/watch?v=' + this.liveEvent.id.videoId,
      '_blank'
    )
  }

  shareLiveWhatsapp() {
    let url = encodeURI(`https://www.youtube.com/watch?v=${this.liveEvent.id.videoId}`)
    window.open(`whatsapp://send?text=${url}`);
  }
}
