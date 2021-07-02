import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from './menu-item.model';

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input() menuItem:MenuItem = new MenuItem()
  @Output() add = new EventEmitter()

  constructor() { }

  ngOnInit(): void { }

  emitAddEvent(){
    this.add.emit(this.menuItem)
  }

}
