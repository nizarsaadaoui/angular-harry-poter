import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { Movie } from '../models/movie.model';
import { MovieDetail } from '../models/movie-detail.model';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch movies (getMovies)', () => {
    const dummyMovies: Movie[] = [
      { id: '1', title: 'Movie 1', budget: '', duration: 12, release_date: '' },
      { id: '2', title: 'Movie 2', budget: '', duration: 12, release_date: '' },
    ];

    service.getMovies().subscribe(movies => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(dummyMovies);
    });

    const req = httpMock.expectOne('/movies');
    expect(req.request.method).toBe('GET');
    req.flush(dummyMovies);
  });

  it('should fetch movie by id (getMovieById)', () => {
    const dummyMovieDetail: MovieDetail = {
      id: '1',
      title: 'Movie 1',
      release_date: '2021-01-01',
      summary: 'Description 1',
      box_office: '',
      budget: '',
      cinematographers: [],
      duration: 121,
      poster: '',
      producers: []
    }

    service.getMovieById('1').subscribe(movieDetail => {
      expect(movieDetail).toEqual(dummyMovieDetail);
    });

    const req = httpMock.expectOne('/movies/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyMovieDetail);
  });
});


