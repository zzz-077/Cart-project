import { Component, NgZone, inject } from '@angular/core';
import { CardsService } from '../../../shared/services/cards/cards.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  CardsArr: [] = [];
  isFilterFolded: boolean = false;
  constructor() {}
}
