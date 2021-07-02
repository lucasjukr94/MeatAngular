import {Injectable} from '@angular/core'

import {HttpClient, HttpParams} from '@angular/common/http'

import {Observable} from 'rxjs'

import {Restaurant} from '../restaurant/restaurant.model'
import {meat_api} from '../app.api'
import { MenuItem } from '../restaurant-detail/menu-item/menu-item.model'

@Injectable()
export class RestaurantsService{
    
    constructor(private http:HttpClient){}

    restaurants(search?:string): Observable<Restaurant[]> {
        let params:any
        if(search === undefined){
            params = undefined
        }else{
            params = new HttpParams().set('q', search);
        }
        return this.http.get<Restaurant[]>(`${meat_api}/restaurants`, {params: params})
    }

    restaurantById(id:string): Observable<Restaurant>{
        return this.http.get<Restaurant>(`${meat_api}/restaurants/${id}`)
    }

    reviewsOfRestaurant(id:string): Observable<any>{
        return this.http.get(`${meat_api}/restaurants/${id}/reviews`)
    }

    menuOfRestaurant(id:string): Observable<MenuItem[]>{
        return this.http.get<MenuItem[]>(`${meat_api}/restaurants/${id}/menu`)
    }
}