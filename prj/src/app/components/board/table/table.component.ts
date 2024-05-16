import {
  Component,
  NgZone,
  inject,
  OnInit,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsService } from '../../../shared/services/cards/cards.service';
import { card, filterObj } from '../../../shared/model/cardModel';
import { log } from 'console';
import { FilterService } from '../../../shared/services/filter/filter.service';
import { EventEmitter } from 'stream';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  CardsArr: card[] = [];
  isSearched: boolean = false;
  isFilterFolded: boolean = false;
  whichSortIcon: string = '';
  Iconclick: boolean = false;
  currCardFr: number = 0;
  currCardTo: number = 5;

  DisabledColumn: filterObj[] = [
    { Name: 'Name', Value: true },
    { Name: 'Category', Value: true },
    { Name: 'Price', Value: true },
    { Name: 'Quantity', Value: true },
  ];

  constructor(
    private cardServ: CardsService,
    private filterServ: FilterService
  ) {}
  ngOnInit() {
    this.filterServ.filterObject$.subscribe((obj) => {
      if (obj != undefined) {
        this.DisabledColumn.forEach((item) => {
          if (obj.Name == item.Name) item.Value = obj.Value;
        });
      }
    });

    this.cardServ.searchedCards$.subscribe((data) => {
      if (data != null) {
        this.CardsArr = data;
      } else {
        this.CardsArr = [];
      }
    });

    this.cardServ.newCards$.subscribe((obj: any) => {
      if (obj != null) {
        (this.currCardFr = obj?.a), (this.currCardTo = obj?.b);
      }
      this.getCards(this.currCardFr, this.currCardTo);
    });
  }

  SortClick(value: string) {
    this.whichSortIcon = value;
    switch (value) {
      case 'Name': {
        if (this.Iconclick === false) {
          this.Iconclick = true;
          this.CardsArr = this.CardsArr.sort((a: card, b: card) => {
            if (a.Name > b.Name) return 1;
            else return -1;
          });
        } else {
          this.Iconclick = false;
          this.CardsArr = this.CardsArr.sort((a: card, b: card) => {
            if (a.Name > b.Name) return -1;
            else return 1;
          });
        }
        break;
      }
      case 'Category': {
        if (this.Iconclick === false) {
          this.Iconclick = true;
          this.CardsArr = this.CardsArr.sort((a: card, b: card) => {
            if (a.Category > b.Category) return 1;
            else if (a.Category < b.Category) return -1;
            else return 0;
          });
        } else {
          this.Iconclick = false;
          this.CardsArr = this.CardsArr.sort((a: card, b: card) => {
            if (a.Category > b.Category) return -1;
            else if (a.Category < b.Category) return 1;
            else return 0;
          });
        }
        break;
      }
      case 'Price': {
        if (this.Iconclick === false) {
          this.Iconclick = true;
          this.CardsArr = this.CardsArr.sort((a: card, b: card) => {
            if (a.Price > b.Price) return 1;
            else return -1;
          });
        } else {
          this.Iconclick = false;
          this.CardsArr = this.CardsArr.sort((a: card, b: card) => {
            if (a.Price > b.Price) return -1;
            else return 1;
          });
        }
        break;
      }
      case 'Quantity': {
        if (this.Iconclick === false) {
          this.Iconclick = true;
          this.CardsArr = this.CardsArr.sort((a: card, b: card) => {
            if (a.Quantity > b.Quantity) return 1;
            else return -1;
          });
        } else {
          this.Iconclick = false;
          this.CardsArr = this.CardsArr.sort((a: card, b: card) => {
            if (a.Quantity > b.Quantity) return -1;
            else return 1;
          });
        }
        break;
      }
    }
  }

  getCards(val1: number, val2: number) {
    this.cardServ.getCards(val1, val2).subscribe((data: any) => {
      this.CardsArr = [];
      this.CardsArr = data;
    });
  }
}
