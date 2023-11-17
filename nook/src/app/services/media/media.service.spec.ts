import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MediaService } from './media.service';

describe('MediaService', () => {
  let service: MediaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MediaService]
    });

    service = TestBed.inject(MediaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve media information', () => {
    const movieId = 1;
    const mediaType = 'movie';

    service.getMediaInfo(movieId, mediaType).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${mediaType}/${movieId}?api_key=${service['apiKey']}&append_to_response=credits,images`);
    expect(req.request.method).toEqual('GET');
    req.flush({}); 
  });

  it('should retrieve category media list', () => {
    const mediaType = 'movie';

    service.getCategoryMedia(mediaType).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/genre/${mediaType}/list?language=en&api_key=${service['apiKey']}`);
    expect(req.request.method).toEqual('GET');
    req.flush({}); 
  });

  it('should search for movies', () => {
    const query = 'Avatar';
    const currentPage = 1;

    service.searchMovies(query, currentPage).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/search/multi?api_key=${service['apiKey']}&query=${query}&page=${currentPage}`);
    expect(req.request.method).toEqual('GET');
    req.flush({}); 
  });

  it('should retrieve season information for a TV series', () => {
    const seriesId = 1;
    const seasonNumber = 1;

    service.getSeasonInfo(seriesId, seasonNumber).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/tv/${seriesId}/season/${seasonNumber}?language=en-US&api_key=${service['apiKey']}&append_to_response=episodes`);
    expect(req.request.method).toEqual('GET');
    req.flush({});
  });
});

