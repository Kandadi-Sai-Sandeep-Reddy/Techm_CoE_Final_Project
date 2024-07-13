import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss']
})
export class ProductSliderComponent implements OnInit {

  @Input() title:any
  @Input() products:any
  constructor() { }

  ngOnInit(): void {
  }

}
