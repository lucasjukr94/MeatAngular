import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from 'src/app/restaurants/restaurants.service';
import { ActivatedRoute } from '@angular/router';
import { Reviews } from './reviews.model';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviews: Reviews[] = []

  constructor(private restaurantsService: RestaurantsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.restaurantsService.reviewsOfRestaurant(this.route.parent?.snapshot.params['id'])
      .subscribe(
        reviews => this.reviews = reviews
      )
  }

}
