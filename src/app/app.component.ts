import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'date',
    'name',
    'numEntities',
    'actions',
    'details',
  ];
  selectedItem: any;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private api: ApiService) {}
  selectedRow!: any;
  dataFromDb: any[] = [];
  allItems: any[] = [];
  defaultItems: any[] = [
    { name: 'Competitive Intelligence', numEntities: 0, details: ["Item 1","Item 2","Item 3"], isDefault: true },
    { name: 'My Vendors', numEntities: 0, details: ["Item 1","Item 2","Item 3"], isDefault: true },
    { name: 'My Customers', numEntities: 0, details: ["Item 1","Item 2","Item 3"], isDefault: true },
  ];
  dataSource!: MatTableDataSource<any>;
  ngOnInit() {
    this.api.getData().subscribe((res) => {
      this.dataFromDb = res;
      this.allItems = [...this.defaultItems, ...this.dataFromDb];
      this.dataSource = new MatTableDataSource(this.allItems);
      this.dataSource.sort = this.sort;
    });
  }
  // Data source for the table
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  sendMail(row: any) {
    // Dummy implementation
    alert(`Sending mail for ${row.name}`);
  }

  share(row: any) {
    // Dummy implementation
    alert(`Sharing ${row.name}`);
  }

  edit(row: any) {
    // Dummy implementation
    alert(`Editing ${row.name}`);
  }

  delete(row: any) {
    // Dummy implementation
    alert(`Deleting ${row.name}`);
  }
  openDetails(item: any) {
    this.selectedItem = item;
  }
 

selectRow(row: any) {
  this.selectedRow = row;
}
}
