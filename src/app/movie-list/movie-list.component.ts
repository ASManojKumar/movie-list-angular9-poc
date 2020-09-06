import { Component, OnInit } from '@angular/core';
import { MovieAPIService } from '../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})

export class MovieListComponent implements OnInit {

  movie_list: any;

  constructor(private apiService: MovieAPIService,
    private router: Router) { }

  ngOnInit() {
    this.getMovieList();
  }

  getMovieList() {
    this.apiService.getMovieListService().subscribe((res: any) => {
      if (res) {
        this.movie_list = res.results;
      }
    });
  }

  goToDetailPage(id) {
    this.router.navigate(['detail', id]);
  }

}