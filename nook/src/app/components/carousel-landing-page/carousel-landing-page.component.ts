import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel-landing-page',
  templateUrl: './carousel-landing-page.component.html',
})
export class CarouselLandingPageComponent {
  dynamicSlides = [
    {
      title: 'Unlock the Future of Entertainment',
      subtitle: 'Elevate your streaming experience now!',
      img: 'https://i.imgur.com/0rK9BNJ.jpg'
    },
    {
      title: 'Access AI-Powered Recommendations',
      subtitle: 'Discover favorites effortlessly.',
      img: 'https://i.imgur.com/LP1ir7j.jpg'
    },
    {
      title: 'Create Personalized Watchlists',
      subtitle: 'Prioritize your must-watch content.',
      img: 'https://i.imgur.com/A6IoWGe.jpg'
    },
    {
      title: 'Sign up and start exploring!',
      subtitle: '',
      img: 'https://i.imgur.com/QcoeGry.jpg'
    }
  ];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoHeight: false,
    autoWidth: false,
    center: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      760: {
        items: 1,
      },
    },
  };
}