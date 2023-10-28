import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
})
export class CarouselComponent {
  dynamicSlides = [
    {
      title: 'Unlock the Future of Entertainment',
      subtitle: 'Elevate your streaming experience now!',
      img: '../../assets/slide-first-img.png'
    },
    {
      title: 'Access AI-Powered Recommendations',
      subtitle: 'Discover favorites effortlessly.',
      img: '../../assets/slide-second-img.png'
    },
    {
      title: 'Create Personalized Watchlists',
      subtitle: 'Prioritize your must-watch content.',
      img: '../../assets/slide-third-img.png'
    },
    {
      title: 'Sign up and start exploring!',
      subtitle: '',
      img: '../../assets/slide-four-img.png'
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