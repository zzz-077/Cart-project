import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  constructor() {}
  @Output() hideCart = new EventEmitter<boolean>();

  hideCartFunc() {
    this.hideCart.emit(false);
  }
}
