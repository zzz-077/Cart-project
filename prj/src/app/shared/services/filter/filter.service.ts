import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filterObj } from '../../model/cardModel';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  public sharedObser = new BehaviorSubject<any>(null);
  filterObject$: Observable<any> = this.sharedObser.asObservable();
  constructor() {}

  setObject(obj: filterObj[]) {
    this.sharedObser.next(obj);
  }
}
