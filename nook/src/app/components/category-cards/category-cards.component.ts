import { Component, OnInit, Input } from '@angular/core';
import { MediaService } from 'src/app/services/media/media.service';
import { CategoryMovie } from 'src/app/models/category-movie';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-category-cards',
  templateUrl: './category-cards.component.html',
})
export class CategoryCardsComponent implements OnInit {
  constructor(
    private moviesService: MediaService,
    private dataService: DataService
  ) { }

  menuCategoryMovies: CategoryMovie[] = [];
  @Input() links: boolean = false;

  ngOnInit() {
    this.categoryMovies();
  }

  categoryMovies() {
    this.moviesService.getCategoryMedia('movie').subscribe((response: { genres: CategoryMovie[] }) => {
      this.menuCategoryMovies = response.genres;
      this.menuCategoryMovies.forEach((category) => {
        this.dataService.getGenreImageById(category.id).subscribe((url) => {
          category.image = url;
        });
      });
    });
  }
}
