import { Component, Input, OnInit, Output, output } from '@angular/core';
import { log } from 'node:console';
import { EventEmitter } from 'node:stream';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterService } from '../../../shared/services/filter/filter.service';
import { filterObj } from '../../../shared/model/cardModel';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  checkValue: boolean = true;
  checkArr: any[] = [
    { Name: 'Name', Value: true },
    { Name: 'Category', Value: true },
    { Name: 'Price', Value: true },
    { Name: 'Quantity', Value: true },
  ];
  constructor(private filterServ: FilterService) {
    this.filterServ.filterObject$.subscribe((obj) => {
      if (obj) {
        this.checkArr = obj;
      }
    });
  }

  filterClick(value: any, name: string) {
    this.checkArr.forEach((ob) => {
      if (name === ob.Name) {
        ob.Value = value.checked;
      }
    });

    this.filterServ.setObject(this.checkArr);
  }
}
