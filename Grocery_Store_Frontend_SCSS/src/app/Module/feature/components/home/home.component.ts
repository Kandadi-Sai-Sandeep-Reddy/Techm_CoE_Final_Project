import { Component, OnInit } from '@angular/core';
import { dairyPage } from 'src/Data/Dairy';
import { homeCarouselData } from 'src/Data/mainCarousel';
import { meatpage } from 'src/Data/MeatAndSeaFood';
import { vegPage1 } from 'src/Data/veg';
import { vegPage } from 'src/Data/vegetable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  vegetables:any
  dairy:any
  meat:any
  constructor() { }

  ngOnInit(): void {
    this.vegetables=vegPage1.slice(0,5)
    this.dairy=dairyPage
    this.meat=meatpage
  }

}
