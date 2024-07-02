import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MoviesCatalogComponent } from './movies-catalog.component';
import { MovieService } from '../../services/movie.service';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { MinutesToHoursPipe } from '../../pipes/minutes-to-hours.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';

describe('MoviesCatalogComponent', () => {
  let component: MoviesCatalogComponent;
  let fixture: ComponentFixture<MoviesCatalogComponent>;
  let mockMovieService: Partial<MovieService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    mockMovieService = {
      getMovies: jasmine.createSpy('getMovies').and.returnValue(of([
        {
          id: '1',
          title: 'Movie 1',
          release_date: '2022-01-01',
          box_office: '1000000',
          budget: '500000',
          cinematographers: [],
          duration: 120,
          poster: '',
          summary: '',
          producers: []
        },
        {
          id: '2',
          title: 'Movie 2',
          release_date: '2023-01-01',
          box_office: '2000000',
          budget: '1000000',
          cinematographers: [],
          duration: 150,
          poster: '',
          summary: '',
          producers: []
        }
      ]))
    };

    mockActivatedRoute = {
      params: of({ movieId: '1' })
    };

    await TestBed.configureTestingModule({
      imports: [
        MoviesCatalogComponent,
        FormsModule,
        CurrencyFormatPipe,
        MinutesToHoursPipe,
        RouterLink
      ],
      providers: [
        { provide: MovieService, useValue: mockMovieService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movies on init', () => {
    expect(mockMovieService.getMovies).toHaveBeenCalled();
    expect(component.filteredMovies().length).toBe(2);
  });

  it('should filter movies by title', () => {
    component.searchTitle.set('Movie 1');
    expect(component.filteredMovies().length).toBe(1);
    expect(component.filteredMovies()[0].title).toBe('Movie 1');
  });

  it('should filter movies by year', () => {
    component.searchYear.set(2023);
    expect(component.filteredMovies().length).toBe(1);
    expect(component.filteredMovies()[0].release_date.split('-')[0]).toBe('2023');
  });

  it('should filter movies by title and year', () => {
    component.searchTitle.set('Movie');
    component.searchYear.set(2022);
    expect(component.filteredMovies().length).toBe(1);
    expect(component.filteredMovies()[0].title).toBe('Movie 1');
    expect(component.filteredMovies()[0].release_date.split('-')[0]).toBe('2022');
  });

  it('should reset filters when both title and year are empty', () => {
    component.searchTitle.set('');
    component.searchYear.set(null);
    expect(component.filteredMovies().length).toBe(2);
  });


  it('should not filter when year < 1000 ', () => {
    component.searchTitle.set('');
    component.searchYear.set(999);
    expect(component.filteredMovies().length).toBe(2);
  });
});
