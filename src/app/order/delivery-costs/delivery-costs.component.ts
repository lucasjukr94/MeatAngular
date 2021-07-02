import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mt-delivery-costs',
  templateUrl: './delivery-costs.component.html',
  styleUrls: ['./delivery-costs.component.css']
})
export class DeliveryCostsComponent implements OnInit {

  @Input() delivery:number = 0
  @Input() itemsValue:number = 0

  constructor() { }

  ngOnInit(): void {
  }

  total():number{
    return (this.delivery + this.itemsValue)
  }
}
