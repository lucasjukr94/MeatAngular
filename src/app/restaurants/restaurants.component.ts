import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurants:Restaurant[] = []

  searchControl: FormControl = this.fb.control('')

  searchForm: FormGroup = this.fb.group({
    searchControl: this.searchControl
  })

  constructor(private restaurantsService: RestaurantsService, 
              private fb: FormBuilder) { }

  ngOnInit(): void {
    let res = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(searchTerm => this.restaurantsService.restaurants(searchTerm)),
      catchError(error => from([]))
    )
    res.subscribe(
      restaurants => this.restaurants = restaurants
    )

    //O método subscribe passa o objeto Observable<Restaurant[]> para o objeto Restaurant[]
    this.restaurantsService.restaurants()
      .subscribe(
        restaurants => this.restaurants = restaurants
      )
  }

}
