import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Card } from 'src/app/interfaces';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-admin-panel-card-table',
  templateUrl: './admin-panel-card-table.component.html',
  styleUrls: ['./admin-panel-card-table.component.scss']
})
export class AdminPanelCardTableComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  
  public dataSource: MatTableDataSource<Card>;
  public displayedColumns = ['name', 'damage', 'health', 'manaCost'];

  constructor(private card: CardService) { }

  ngOnInit() {
    this.getTable();
  }

  getTable() {
    this.card.getAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}