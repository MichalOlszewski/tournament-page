import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Tournament{
  id?: number;
  name?: string;
  discipline?: string;
  organizer?: string;
  data?: Date;
  location?: string;
  limit?: number;
  deadline?: Date;
  seeded_players?: Number;
}

export interface TournamentData {
  items: Tournament[],
  meta: {
    totalItems: number;
    itemCOunt: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  },
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  }
};


@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  constructor(private http: HttpClient) { }

  // findOne(id: number): Observable<Tournament>{
  //   return this.http.get('/api/tournaments' + id).pipe(
  //     map((tour: Tournament) => tour)
  //   )
  // }

  findAll(page: number, size: number): Observable<TournamentData> {
    let params = new HttpParams()
    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    return this.http.get('/api/tournaments', {params}).pipe(
      map((tourData: any) => tourData),
        catchError(err => throwError(err))
      )
    
  }

  findOne(id: string): Observable<any> {
    return this.http.get(`/api/tournaments/${id}`).pipe(
      map((tourData: any) => tourData),
        catchError(err => throwError(err))
      )
    
  }
  

  addTournament(tour: Tournament): Observable<any> {
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+ localStorage.getItem('access-token')
    });

        const httpOptions = {
          headers: headers_object
        };

    console.log(tour)
    return this.http.post<any>(`/api/tournaments/add/`, tour, httpOptions).pipe(
      map((tourData: any) => tourData),
      catchError(err => throwError(err))
    )
  }



  paginateByName(page: number, size: number, name: string): Observable<TournamentData>{
    let params = new HttpParams()

    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('name', String(name));
    return this.http.get('/api/tournaments', {params}).pipe(
      map((tourData: any) => tourData),
        catchError(err => throwError(err))
      )
    
  }
}
