import { Component, OnInit } from '@angular/core';
import { MovieAPIService } from '../services/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})

export class MovieDetailComponent implements OnInit {

  movie_detail: any;

  constructor(private apiService: MovieAPIService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.getMovieDetails(params.id);
      }
    });
  }

  getMovieDetails(id) {
    this.apiService.getMovieDetailsService(id).subscribe((response: any) => {
      if (response) {
        this.movie_detail = response;
      }
    });
  }
}