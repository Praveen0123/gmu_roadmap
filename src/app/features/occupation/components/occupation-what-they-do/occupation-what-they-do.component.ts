import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Occupation } from '@gql';

@Component({
  selector: 'gmu-occupation-what-they-do',
  templateUrl: './occupation-what-they-do.component.html',
  styleUrls: ['./occupation-what-they-do.component.scss']
})
export class OccupationWhatTheyDoComponent implements OnInit
{
  @Input() occupationProfileDetails: Occupation;

  videoUrl: string;
  posterUrl: string;


  constructor() { }

  ngOnInit(): void
  {
    this.videoUrl = `https://cdn.careeronestop.org/OccVids/OccupationVideos/${this.occupationProfileDetails.onetCode}.mp4`;
    this.posterUrl = `https://cdn.careeronestop.org/OccVids/OccupationVideos/${this.occupationProfileDetails.onetCode}.jpg`;
  }
}
