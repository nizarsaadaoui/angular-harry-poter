import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';
import { FormsModule } from '@angular/forms';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { MinutesToHoursPipe } from '../../pipes/minutes-to-hours.pipe';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-movies-catalog',
  standalone: true,
  imports: [FormsModule, CurrencyFormatPipe, MinutesToHoursPipe, RouterLink],
  templateUrl: './movies-catalog.component.html'
})
export class MoviesCatalogComponent implements OnInit {
  filteredMovies: Movie[] = [];
  movies: Movie[] = [];

  searchTitle: string = '';
  searchYear: number | null = null;

  constructor(private movieService: MovieService) { }
  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data
      this.filteredMovies = [...this.movies];
    })

  }


  applyFilters() {
    if (!this.searchTitle && !this.searchYear) {
      this.filteredMovies = [...this.movies];
    }
    else {
      this.filteredMovies = this.movies.filter(movie =>
        (this.searchTitle.trim() ? movie.title.toLowerCase().includes(this.searchTitle.toLowerCase()) : true) &&
        (this.searchYear && this.searchYear > 999 ? +movie.release_date.split('-')[0] === this.searchYear : true)
      );
    }
  }
}




