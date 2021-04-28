import { Component, OnInit, Input } from '@angular/core';
import { CONFIG } from '@env/config';
import { Occupation } from '@gql';

@Component({
  selector: 'gmu-occupation-hot-spot',
  templateUrl: './occupation-hot-spot.component.html',
  styleUrls: ['./occupation-hot-spot.component.scss']
})
export class OccupationHotSpotComponent implements OnInit
{
  hotSpotDescription: string = CONFIG.MESSAGING.OCCUPATIONS.DESCRIPTIONS.HOT_SPOT;

  @Input() occupationProfileDetails: Occupation;

  constructor() { }

  ngOnInit(): void
  {
  }

}
