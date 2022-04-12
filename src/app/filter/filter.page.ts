import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  heading =  {
    has_main_heading: true,
    main_heading_name: "Search Filters",
    has_sub_heading: false,
    sub_heading_name: null
}

icons = {
  has_left_icon: true,
  has_right_icon: true,
  left_icon: 'assets/icon/settings/back.svg',
  right_icon: 'assets/icon/posts/post-details/Phone/Vector.svg'
}


  constructor() { }

  ngOnInit() {
  }

}
