import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'src/app/restaurant-detail/shopping-cart/cart-item.model';

@Component({
  selector: 'mt-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  @Input() items:CartItem[] = []

  @Output() increaseQty = new EventEmitter<CartItem>()
  @Output() decreaseQty = new EventEmitter<CartItem>()
  @Output() removeQty = new EventEmitter<CartItem>()

  constructor() { }

  ngOnInit(): void {
  }

  emitIncreaseQty(item:CartItem){
    this.increaseQty.emit(item)
  }

  emitDecreaseQty(item:CartItem){
    this.decreaseQty.emit(item)
  }

  emitRemoveQty(item:CartItem){
    this.removeQty.emit(item)
  }
}
