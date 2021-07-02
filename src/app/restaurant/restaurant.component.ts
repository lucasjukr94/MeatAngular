import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';

import {Restaurant} from './restaurant.model'

@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
  animations: [
    trigger('restaurantAppeared', [
      state('ready', style({
        opacity: 1
      })),
      transition('void => ready', [
        style({
          opacity: 0,
          transform: 'translate(-30px, -10px)'
        }),
        animate('500ms 0s ease-in-out')
      ])
    ])
  ]
})
export class RestaurantComponent implements OnInit {
  @Input() restaurant: Restaurant = {
    id: "",
    name: "",
    category: "",
    deliveryEstimate: "",
    imagePath: "",
    rating: 0
  }

  restaurantState:string = 'ready'

  constructor() { }

  ngOnInit(): void {
  }

}
