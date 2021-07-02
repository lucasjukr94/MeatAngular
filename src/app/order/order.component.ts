import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { RadioOption } from '../shared/radio/radio-option.model';
import { Order, OrderItem } from './order.model';
import { OrderService } from './order.service';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control(''),
    email: this.formBuilder.control(''),
    emailConfirmation: this.formBuilder.control(''),
    address: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
    numero: this.formBuilder.control('', [Validators.required, Validators.minLength(1)]),
    complemento: this.formBuilder.control(''),
    paymentOption: this.formBuilder.control('', [Validators.required])
  })

  paymentOptions:RadioOption[] = [
    {label:"Dinheiro", value:"MON", name:"Pagamento"},
    {label:"Cartão Débito", value:"DEB", name:"Pagamento"},
    {label:"Cartão Refeição", value:"REF", name:"Pagamento"}
  ]

  delivery:number = 8

  constructor(private orderService:OrderService, 
              private router:Router,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
  }

  itemsValue(): number{
    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[]{
    return this.orderService.cartItems()
  }

  increaseQty(item:CartItem){
    this.orderService.increaseQtyItems(item)
  }

  decreaseQty(item:CartItem){
    this.orderService.decreaseQtyItems(item)
  }

  removeQty(item:CartItem){
    this.orderService.removeQtyItems(item)
  }

  checkOrder(order:Order){
    order.orderItems = this.cartItems().map((item:CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order).subscribe(
      (orderId:string) => {
        this.router.navigate(['/order-summary'])
        this.orderService.clear()
      })
  }
}
