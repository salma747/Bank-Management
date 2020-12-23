import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slides = [{'image': 'https://www.moneycrashers.com/wp-content/uploads/2012/04/reasons-change-banks-1068x713.jpg'},
    {'image': 'https://liquidationug.com/wp-content/uploads/2017/02/2-1.jpg'},
    {'image': 'https://www.arrajol.com/sites/default/files/2016/07/23/181506-Building-a-Relationship-with-Your-Bank-Manager.jpg'},
];


  constructor() { }

  ngOnInit(): void {
  }

}
