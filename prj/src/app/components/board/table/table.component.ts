import { Component, NgZone, inject, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsService } from '../../../shared/services/cards/cards.service';
import { card } from '../../../shared/model/cardModel';
import { log } from 'console';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() filteredObj: {} = {};
  CardsArr: card[] = [];
  isFilterFolded: boolean = false;
  whichSortIcon: string = '';
  Iconclick: boolean = false;
  constructor(private cardServ: CardsService) {}
  ngOnInit() {
    console.log(this.filteredObj);
    this.cardServ.getCards().subscribe((data: any) => {
      this.CardsArr = data;
    });
  }
  SortClick(value: string) {
    this.whichSortIcon = value;
    // this.CardsArr = this.CardsArr.sort((a: card, b: card) => {
    // if (a.Name > b.Name) return 1;
    // else return -1;
    // });

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
}
