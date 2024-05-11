import { Component, Input, OnInit, Output, output } from '@angular/core';
import { log } from 'node:console';
import { EventEmitter } from 'node:stream';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterService } from '../../../shared/services/filter/filter.service';
import { filterObj } from '../../../shared/model/cardModel';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  constructor(private filterServ: FilterService) {}

  filterClick(value: any, name: string) {
    var obj: filterObj = {
      Name: name,
      Value: value.checked,
    };
    this.filterServ.setObject(obj);
  }
}
