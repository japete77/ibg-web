import { Component, OnInit } from '@angular/core';
import { SermonsService } from '../sermons.service';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.scss']
})
export class RefreshComponent implements OnInit {

  constructor(private sermonService: SermonsService) { }

  ngOnInit(): void {
    this.sermonService.refresh()
    .then(() => {
      console.log('Refreshed OK!')
    });
  }

}
