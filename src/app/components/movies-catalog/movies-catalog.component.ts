import { Component, OnInit, Signal, signal, computed } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
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
  private _movies = signal<Movie[]>([]);
  searchTitle = signal<string>('');
  searchYear = signal<number | null>(null);

  filteredMovies: Signal<Movie[]> = computed(() => {
    const title = this.searchTitle().toLowerCase();
    const year = this.searchYear();
    return this._movies().filter(movie =>
      (!title || movie.title.toLowerCase().includes(title)) &&
      (year && year > 999 ? +movie.release_date.split('-')[0] === year : true)
    );
  });

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data) => {
      this._movies.set(data);
    });
  }
}
