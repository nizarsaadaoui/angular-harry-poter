import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { MovieDetail } from '../models/movie-detail.model';
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = '/movies';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }


  getMovieById(id: string): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.apiUrl}/${id}`);
  }

}
