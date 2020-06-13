import { Injectable } from '@angular/core';
import { SermonsResponse, LiveResponse } from './models/sermons-response';

@Injectable({
  providedIn: 'root'
})
export class SermonsService {

  constructor() { }

  refresh(): Promise<void> {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`https://p8nmjahra1.execute-api.eu-west-1.amazonaws.com/Prod/api/v1/refresh`, requestOptions)
        .then(this.handleResponse)
        .then(() => {
        })
        .catch(() => {
        });
  }

  getSermons(page, pageSize) : Promise<SermonsResponse> {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`https://p8nmjahra1.execute-api.eu-west-1.amazonaws.com/Prod/api/v1/sermons?page=${page}&pageSize=${pageSize}`, requestOptions)
        .then(this.handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => {
        });
  }
  
  getSeries(page, pageSize) : Promise<SermonsResponse> {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`https://p8nmjahra1.execute-api.eu-west-1.amazonaws.com/Prod/api/v1/series?page=${page}&pageSize=${pageSize}`, requestOptions)
        .then(this.handleResponse)
        .then(response => {
            return response;
        })
        .catch(error => {
        });
  }

  getLive() : Promise<LiveResponse> {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`https://p8nmjahra1.execute-api.eu-west-1.amazonaws.com/Prod/api/v1/live`, requestOptions)
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
