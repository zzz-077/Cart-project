import { Component, Input, OnInit, Output, output } from '@angular/core';
import { log } from 'node:console';
import { EventEmitter } from 'node:stream';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  filterObj = output<{ Name: string; Value: boolean }>();
  constructor() {}

  filterClick(value: any, name: string) {
    var obj: { Name: string; Value: boolean } = {
      Name: name,
      Value: value.checked,
    };
    this.filterObj.emit(obj);
  }
}
