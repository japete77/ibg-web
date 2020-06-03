import { Injectable } from '@angular/core';
import { SermonsResponse } from './models/sermons-response';

@Injectable({
  providedIn: 'root'
})
export class SermonsService {

  constructor() { }

  getSermons(page, pageSize, asc) : Promise<SermonsResponse> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "Page": page, "PageSize": pageSize, "Asc": asc })
    };

    return fetch(`https://3j24yd0g7c.execute-api.eu-west-1.amazonaws.com/live/sermons`, requestOptions)
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
