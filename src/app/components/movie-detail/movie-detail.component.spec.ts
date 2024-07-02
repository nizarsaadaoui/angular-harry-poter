import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieService } from '../../services/movie.service';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { MinutesToHoursPipe } from '../../pipes/minutes-to-hours.pipe';
import { MovieDetail } from '../../models/moviedetail';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let mockMovieService: Partial<MovieService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let router: Router;
  let movie: MovieDetail = {
    id: '1',
    box_office: '1000000',
    budget: '500000',
    cinematographers: ['Cinematographer 1'],
    duration: 120,
    poster: 'poster.jpg',
    release_date: '2023-01-01',
    summary: 'A great movie',
    title: 'Movie 1',
    producers: ['Producer 1']
  }



  beforeEach(async () => {

    mockMovieService = {
      getMovieById: jasmine.createSpy('getMovieById').and.returnValue(of(movie))
    };

    mockActivatedRoute = {
      params: of({ movieId: '1' })
    };

    await TestBed.configureTestingModule({
      imports: [MovieDetailComponent, CurrencyFormatPipe, MinutesToHoursPipe],
      providers: [
        { provide: MovieService, useValue: mockMovieService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movie details on init', () => {
    expect(mockMovieService.getMovieById).toHaveBeenCalledWith('1');
    expect(component.movie?.id).toBe('1');
    expect(component.movie?.box_office).toBe('1000000');
    expect(component.movie?.cinematographers).toContain('Cinematographer 1');
    expect(component.movie?.duration).toBe(120);
    expect(component.movie?.poster).toBe('poster.jpg');
    expect(component.movie?.release_date).toBe('2023-01-01');
    expect(component.movie?.summary).toBe('A great movie');
    expect(component.movie?.title).toBe('Movie 1');
    expect(component.movie?.producers).toContain('Producer 1');
  });


  it('should navigate to /movies when goBack is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/movies']);
  });
});



