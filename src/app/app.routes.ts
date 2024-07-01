import { Routes } from '@angular/router';
import { MoviesCatalogComponent } from './components/movies-catalog/movies-catalog.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';

export const routes: Routes = [{ path: 'movies', component: MoviesCatalogComponent }, { path: 'movies/:movieId', component: MovieDetailComponent },
{ path: '**', redirectTo: 'movies' },

];
