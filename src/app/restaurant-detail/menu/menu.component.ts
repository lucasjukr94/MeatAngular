import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from 'src/app/restaurants/restaurants.service';
import { MenuItem } from '../menu-item/menu-item.model';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuItem:MenuItem[] = []

  constructor(private MenuService:RestaurantsService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.MenuService.menuOfRestaurant(this.route.parent?.snapshot.params['id'])
      .subscribe(
        menuItem => this.menuItem = menuItem
      )
  }

  addMenuItem(item:MenuItem){
    console.log(item)
  }

}
