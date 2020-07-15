import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { StandingService } from 'src/app/services/standing.service';
import { Team } from 'src/app/models/team';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit, AfterViewInit {


  public columnsToDisplay = [
    'position',
    'name',
    'points',
    'playedGames',
    'won',
    'draw',
    'lost',
    'goalsFor',
    'goalsAgainst',
    'goalDifference'
  ];
  public dataSource = new MatTableDataSource<Team>();
  // teams$: Observable<Team[]>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private standingService: StandingService) {
  }

  ngOnInit() {
    this.standingService.fetchStandings('premierLeague');
    this.getAllTeams();

  }

  public getAllTeams = () => {
    this.standingService.teams
    .subscribe(res => {
      this.dataSource.data = res as Team[];
    });
  }
  getStandings(league: string) {
    this.standingService.fetchStandings(league);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
