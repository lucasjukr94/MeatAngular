import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { Order } from "./order.model";
import {meat_api} from '../app.api'
import { LoginService } from "../security/login/login.service";

@Injectable()
export class OrderService{
    
    constructor(private shoppingCartService:ShoppingCartService, 
        private http:HttpClient,
        private loginService:LoginService){}

    itemsValue():number{
        return this.shoppingCartService.total()
    }

    cartItems():CartItem[]{
        return this.shoppingCartService.items
    }

    increaseQtyItems(item:CartItem){
        return this.shoppingCartService.increaseQtyItems(item)
    }

    decreaseQtyItems(item:CartItem){
        return this.shoppingCartService.decreaseQtyItems(item)
    }

    removeQtyItems(item:CartItem){
        return this.shoppingCartService.removeItem(item)
    }

    checkOrder(order:Order): Observable<any>{
        let header = new  HttpHeaders({ 'Content-Type': 'application/json'})
        if(this.loginService.isLoggedIn()){
            header = header.set('Authorization', `Bearer ${this.loginService.user?.accessToken}`)
        }
        return this.http.post(`${meat_api}/orders`, JSON.stringify(order), {headers: header})
    }

    clear(){
        this.shoppingCartService.clear()
    }
}