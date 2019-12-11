import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatCheckboxChange } from '@angular/material';
import { Card } from 'src/app/interfaces';
import { DeckService } from 'src/app/services/deck.service';
import { CardDialogComponent } from 'src/app/shared/card-dialog/card-dialog.component';

@Component({
  selector: 'app-deck-card-table',
  templateUrl: './deck-card-table.component.html',
  styleUrls: ['./deck-card-table.component.scss']
})
export class DeckCardTableComponent implements OnInit {

  @Input() id: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public loading = false;
  public dataSource: MatTableDataSource<Card>;
  public displayedColumns = ['icon', 'name', 'damage', 'health', 'manaCost'];

  constructor(
    private deck: DeckService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getTable();
  }

  getTable() {
    this.loading = true;
    this.deck.get(this.id).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    })
  }

  showCard(id: number) {
    this.dialog.open(CardDialogComponent, {
      data: {
        id
      },
    });
  }

  changeSelection(ev: MatCheckboxChange, card: Card) {
    if (ev.checked) {
      this.deck.addCard(this.id, card.id).subscribe();
    } else {
      this.deck.deleteCard(this.id, card.id).subscribe();
    }
  }
}
