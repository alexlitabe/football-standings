import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Team } from '../models/team';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class StandingService {

  // tslint:disable-next-line: variable-name
  private _teams: Subject<Array<Team>> = new BehaviorSubject<Array<Team>>([]);
  private readonly API = 'https://api.football-data.org/v2/competitions/';

  private readonly leagues = {
    bundesliga: 'BL1',
    premierLeague: 'PL',
    serieA: 'SA',
    primeraDivision: 'PD'
  };
  public readonly teams: Observable<Array<Team>> = this._teams.asObservable();

  constructor(private http: HttpClient) { }

  fetchStandings(league: string) {
    this.http.get(`${this.API}${this.leagues[league]}/standings`).subscribe((response: ApiResponse) => {
      this._teams.next(response.standings[0].table);
    });
  }
}
