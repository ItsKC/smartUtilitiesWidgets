import { Component, ViewChild, OnInit, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort} from '@angular/material';
import { MatPaginator} from '@angular/material';
import { IHero } from './device-search.interfaces';

@Component({
  selector: 'device-search-widget',
  templateUrl: './device-search-widget.html',
  styleUrls: ['../styles/bootstrap.min.css', './device-search-widget.component.css']
})


export class DeviceSearchWidget implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns = ['id', 'name', 'fullName', 'placeOfBirth', 'publisher'];
  dataSource = new MatTableDataSource<IHero>();

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    
    this.dataSource.sort = this.sort;
    this.httpClient.get('http://localhost:3000/heros')
      .subscribe((heros: IHero[]) => {
        this.dataSource.data = heros;
      });
  }

  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

myplaceHolder: string ='Search'

 checkPlaceHolder() {
    if (this.myplaceHolder) {
      this.myplaceHolder = null
      return;
    } else {
      this.myplaceHolder = 'Search'
      return
    }
  }
}