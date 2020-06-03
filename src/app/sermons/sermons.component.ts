import { Component, OnInit } from '@angular/core';
import { SermonsService } from '../sermons.service';
import { Sermon } from '../models/sermon';

@Component({
  selector: 'app-sermons',
  templateUrl: './sermons.component.html',
  styleUrls: ['./sermons.component.scss']
})
export class SermonsComponent implements OnInit {

  currentPage = 1;
  pageSize = 4;
  sermons: Sermon[] = [];
  loading: boolean;

  constructor(private sermonService: SermonsService) { }

  ngOnInit(): void {
    this.getNextSermons();
  }

  getNextSermons() {
    this.loading = true;
    this.sermonService.getSermons(this.currentPage, this.pageSize, true)
    .then(response  => {
      if (this.sermons.length < response.Total) {
        this.sermons = this.sermons.concat(response.Sermons);
        this.currentPage++;  
      }
    })
    .finally(() => {
      this.loading = false;
    })
  }

  getWhatsAppUrl(item) {
    var url = encodeURI(item.Title + 'https://s3-eu-west-1.amazonaws.com/ibg-sermons/' + item.Date + '.mp3');
    return `whatsapp://send?text=${url}`
  }

  getCoverUrl(item) {
    var cover = item.Cover ? item.Cover : 'default-cover.jpg'
    return `assets/covers/${cover}`
  }

  openUrl(item) {
    window.open(
      'https://s3-eu-west-1.amazonaws.com/ibg-sermons/' + item.Date + '.mp3',
      '_blank'
    )
  }

}
