import { Component } from '@angular/core';
import { MovieDetail } from '../../models/movie-detail.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { MinutesToHoursPipe } from '../../pipes/minutes-to-hours.pipe';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CurrencyFormatPipe, MinutesToHoursPipe],
  templateUrl: './movie-detail.component.html'
})
export class MovieDetailComponent {

  movie: MovieDetail | undefined = undefined

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.movieService.getMovieById(params['movieId']).subscribe((movie) => {
        this.movie = movie;
      });
    });

  }

  goBack(): void {
    this.router.navigate(['/movies']);
  }

}
