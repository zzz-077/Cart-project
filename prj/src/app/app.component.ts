import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CardsService } from './shared/services/cards/cards.service';
import { card } from './shared/model/cardModel';
import { TableComponent } from './components/board/table/table.component';
import { SearchComponent } from './components/board/search/search.component';
import { FilterComponent } from './components/board/filter/filter.component';

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
  isFilterFolded: boolean = false;
  constructor(private cardServ: CardsService) {}

  ngOnInit() {
    this.cardServ.getCards().subscribe((data: any) => {
      this.CardsArr = data;
    });
  }
  filtericonClick() {
    this.isFilterFolded = !this.isFilterFolded;
  }
}
