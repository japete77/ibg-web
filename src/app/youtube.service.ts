import { Injectable } from '@angular/core';
import { GetPlayListResponse } from './models/youtube.models';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  baseUrl = 'https://www.googleapis.com/youtube/v3/'
  channelId = 'UC5mO6RcazceHz-FoWYKyDRw'
  key = 'AIzaSyAeOSgy3k8btZG-k-D3zdgU537UY3TkHa4'

  constructor() { }

  getSermons(pageSize: number, nextPageToken: string) : Promise<GetPlayListResponse> {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    let url = `${this.baseUrl}search?part=snippet&maxResults=${pageSize}&type=video&order=date&channelId=${this.channelId}&key=${this.key}`
    if (nextPageToken) {
      url += `&pageToken=${nextPageToken}`
    }
    
    return fetch(url, requestOptions)
        .then(this.handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => {
        });
  }

  getSeries(pageSize: number, nextPageToken: string) : Promise<GetPlayListResponse> {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    let url = `${this.baseUrl}playlists?part=snippet&maxResults=${pageSize}&type=video&order=date&channelId=${this.channelId}&key=${this.key}`
    if (nextPageToken) {
      url += `&pageToken=${nextPageToken}`
    }
    
    return fetch(url, requestOptions)
        .then(this.handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => {
        });
  }

  getLiveEvent() : Promise<GetPlayListResponse> {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    let url = `${this.baseUrl}search?part=snippet&eventType=live&type=video&channelId=${this.channelId}&key=${this.key}`

    return fetch(url, requestOptions)
        .then(this.handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => {
        });
  }

  handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
  }
}
