import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MediaService } from 'src/app/services/media/media.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-seasons-tv-show',
  templateUrl: './seasons-tv-show.component.html',
})
export class SeasonsTvShowComponent implements OnInit {
  @Input() serieId!: number;
  @Input() seasons!: any;

  constructor(
    private fb: FormBuilder,
    private mediaService: MediaService,
    ) { }

  form!: FormGroup;
  @Output() seasonInfo = new EventEmitter<any>()

  ngOnInit(): void {
    this.initForm()
  }

  private initForm(): void {
    this.form = this.fb.group({
      seasonsSelect: new FormControl('')
    })
  }
  onSeasonSelect(seasonId: number): void {
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
