import { Component, NgZone, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsService } from '../../../shared/services/cards/cards.service';
import { card } from '../../../shared/model/cardModel';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  CardsArr: card[] = [];
  isFilterFolded: boolean = false;
  constructor(private cardServ: CardsService) {}
  ngOnInit() {
    this.cardServ.getCards().subscribe((data: any) => {
      this.CardsArr = data;
    });
  }
}
