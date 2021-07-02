import { Component, OnInit } from '@angular/core';
import { Restaurant, RestaurantInstance } from '../restaurant/restaurant.model';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

  restaurant: Restaurant = RestaurantInstance.GetEmptyRestaurant()

  constructor(private restaurantsService: RestaurantsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.restaurantsService.restaurantById(this.route.snapshot.params['id'])
      .subscribe(
        restaurant => this.restaurant = restaurant
      )
  }

}
