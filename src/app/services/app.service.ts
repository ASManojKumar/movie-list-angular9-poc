import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MovieAPIService {

  private url = 'https://api.themoviedb.org/3/movie/';

  constructor(private httpClient: HttpClient) { }

  getMovieListService() {
    return this.httpClient.get(this.url + 'popular?api_key=844dba0bfd8f3a4f3799f6130ef9e335');
  }

  getMovieDetailsService(id) {
    return this.httpClient.get(this.url + id + '?api_key=844dba0bfd8f3a4f3799f6130ef9e335')
  }

}