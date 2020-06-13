import { Component, OnInit } from '@angular/core';
import { SermonsService } from '../sermons.service';
import { Sermon } from '../models/sermon';
import { YoutubeService } from '../youtube.service';
import { Item } from '../models/youtube.models';

@Component({
  selector: 'app-sermons',
  templateUrl: './sermons.component.html',
  styleUrls: ['./sermons.component.scss']
})
export class SermonsComponent implements OnInit {

  currentPageSermons = 1;
  pageSizeSermons = 4;
  totalSermons: number;
  sermons: Item[] = [];
  loadingSermons: boolean;

  currentPageSeries = 1;
  pageSizeSeries = 4;
  totalSeries: number;
  series: Item[] = [];
  loadingSeries: boolean;

  constructor(private sermonService: SermonsService) { }

  ngOnInit(): void {
    this.getNextSermons()
    this.getNextSeries()
  }

  getNextSermons() {
    this.loadingSermons = true;
    this.sermonService.getSermons(this.currentPageSermons, this.pageSizeSermons)
    .then(response => {
      if (response.items && response.items.length > 0) {
        this.sermons = this.sermons.concat(response.items);
        this.currentPageSermons++;
        this.totalSermons = response.total;
      }
    })
    .finally(() => {
      this.loadingSermons = false;
    })
  }

  getNextSeries() {
    this.loadingSeries = true;
    this.sermonService.getSeries(this.currentPageSeries, this.pageSizeSeries)
    .then(response => {
      if (response.items && response.items.length > 0) {
        response.items = response.items.filter(val => val.id != 'PLsyYxX3AGlqF4KOZD8ZEr735427p92p0A');
        this.series = this.series.concat(response.items);
        this.currentPageSeries++;
        this.totalSeries = response.total;
      }
    })
    .finally(() => {
      this.loadingSeries = false;
    })
  }

  shareSermonWhatsapp(item: Item) {
    let url = encodeURI(`https://www.youtube.com/watch?v=${item.id}`)
    window.open(`whatsapp://send?text=${url}`);
  }

  shareSerieWhatsapp(item: Item) {
    let url = encodeURI(`https://www.youtube.com/playlist?list=${item.id}`)
    window.open(`whatsapp://send?text=${url}`);
  }

  getCoverUrl(item: Item) {
    return item.snippet.thumbnails ? item.snippet.thumbnails.high.url : 'assets/covers/default-cover.jpg'
  }

  openSermonUrl(item: Item) {
    window.open(
      'https://www.youtube.com/watch?v=' + item.snippet.resourceId.videoId,
      '_blank'
    )
  }

  openSerieUrl(item: Item) {
    window.open(
      'https://www.youtube.com/playlist?list=' + item.id,
      '_blank'
    )
  }

}
