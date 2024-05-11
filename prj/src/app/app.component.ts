import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CardsService } from './shared/services/cards/cards.service';
import { card } from './shared/model/cardModel';
import { TableComponent } from './components/board/table/table.component';
import { SearchComponent } from './components/board/search/search.component';
import { FilterComponent } from './components/board/filter/filter.component';
import { log } from 'node:console';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    TableComponent,
    SearchComponent,
    FilterComponent,
  ],
})
export class AppComponent {
  title = 'prj';
  CardsArr: [] = [];
  FilteredColumn: {} = {};
  CurrentPage: number = 1;
  pagesLimit: number = 0;
  pageArr: number[] = [];
  isMaxPageNumber: boolean = false;
  isMinPageNumber: boolean = true;
  isFilterFolded: boolean = false;
  constructor(private cardServ: CardsService) {}

  ngOnInit() {
    this.cardServ.getCards().subscribe((data: any) => {
      this.CardsArr = data;

      this.pagesLimit = Math.ceil(data.length / 6);
      for (let i = 1; i <= this.pagesLimit; i++) {
        this.pageArr.push(i);
      }
    });
  }
  filtericonClick() {
    this.isFilterFolded = !this.isFilterFolded;
  }
  filteredObjecFunc(obj: { Name: string; Value: boolean }) {
    this.FilteredColumn = obj;
  }

  //pagination
  arrowClick(arrow: string) {
    if (arrow === 'next') {
      this.isMinPageNumber = false;
      if (this.CurrentPage != this.pageArr.length) {
        this.CurrentPage++;
      } else {
      }
    } else {
      if (this.CurrentPage == 1) {
        this.CurrentPage = 1;
      } else {
        this.CurrentPage--;
      }
    }
    if (this.CurrentPage == 1) this.isMinPageNumber = true;
    else this.isMinPageNumber = false;
    if (this.CurrentPage == this.pageArr.length) this.isMaxPageNumber = true;
    else this.isMaxPageNumber = false;
  }
  pageClick(page: number) {
    this.CurrentPage = page;
    this.isMaxPageNumber = false;
    this.isMinPageNumber = false;
    if (this.CurrentPage == 1) this.isMinPageNumber = true;
    else if (this.CurrentPage == this.pageArr.length)
      this.isMaxPageNumber = true;
  }
}
