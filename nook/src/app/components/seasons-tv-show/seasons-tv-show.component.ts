import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MediaService } from 'src/app/services/media/media.service';
import { SeasonDetails } from 'src/app/models/season-details';
import { Seasons } from 'src/app/models/seasons';

@Component({
  selector: 'app-seasons-tv-show',
  template: `
  <form [formGroup]="form">
    <select
      name="season"
      formControlName="seasonsSelect"
      (change)="onSeasonSelect(form.value.seasonsSelect)"
      class="block w-[30vw] rounded-md border-0 py-1.5 text-white text-opacity-40 shadow-sm ring-1 ring-inset bg-black focus:ring-2 focus:ring-inset focus:border-custom-purple sm:max-w-xs sm:text-sm sm:leading-6 ml-[4vw] lg:ml-[1vw] md:ml-[1vw] sm:w-[20vw] text-sm"
    >
      <option
        *ngFor="let season of seasons"
        [value]="season.season_number"
        id="season"
        name="season.name"
        autocomplete="season.name"
      >
        {{ season.name }}
      </option>
    </select>
  </form>
`,
})
export class SeasonsTvShowComponent implements OnChanges, OnInit {
  @Input() serieId!: number;
  @Input() seasons!: Seasons[];

  constructor(
    private fb: FormBuilder,
    private mediaService: MediaService,
  ) { }

  form!: FormGroup;
  @Output() seasonInfo = new EventEmitter<SeasonDetails>()

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['seasons'] && this.seasons && this.seasons.length > 0) {
      this.initForm();
      this.form.get('seasonsSelect')?.setValue(this.seasons[0].season_number);
      this.onSeasonSelect(this.seasons[0].season_number);
    }
  }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm(): void {
    this.form = this.fb.group({
      seasonsSelect: new FormControl()
    });
  }  

  onSeasonSelect(seasonId: number): void {
    this.form.get('seasonsSelect')?.patchValue(seasonId);
    this.getSeasonInfo(seasonId);
  }

  private getSeasonInfo(seasonId: number): void {
    this.mediaService.getSeasonInfo(this.serieId, seasonId).subscribe(
      (response) => {
        this.seasonInfo.emit(response);
      }
    );
  }
}
