import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map, tap } from 'rxjs/operators';
import { TournamentData, TournamentsService } from 'src/app/services/tournaments-service/tournaments.service';

@Component({
  selector: 'app-tournaments-show',
  templateUrl: './tournaments-show.component.html',
  styleUrls: ['./tournaments-show.component.scss']
})
export class TournamentsShowComponent implements OnInit {

  filterValue!: string;
  dataSource!: TournamentData;
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['name', 'discipline'];

  constructor(private tourService: TournamentsService) { }

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource(){
    this.tourService.findAll(1, 10).pipe(
      tap(tours => console.log(tours)),
      map((tourData: TournamentData) => this.dataSource = tourData)
    ).subscribe()
  }

  onPaginateChange(event: PageEvent){
    let page = event.pageIndex;
    let size = event.pageSize;
    if(this.filterValue == null){
      page = page + 1
      this.tourService.findAll(page, size).pipe(
        map((tourData: TournamentData) => this.dataSource = tourData)
      ).subscribe()
    } else {
      this.tourService.paginateByName(page, size, this.filterValue).pipe(
        map((tourData: TournamentData) => this.dataSource = tourData)
      ).subscribe()
    }

  }

  findByName(name: string){
    console.log(this.filterValue)
    this.tourService.paginateByName(0, 10, name).pipe(
      map((tourData: TournamentData) => this.dataSource = tourData)
    ).subscribe()
  }

  getRecord(row: any){
    console.log(row)
  }
  

}

