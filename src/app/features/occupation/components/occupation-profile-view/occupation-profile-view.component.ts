import { Component, OnInit, Input } from '@angular/core';
import { Occupation } from '@gql';
import { CONFIG } from '@env/config';


@Component({
  selector: 'gmu-occupation-profile-view',
  templateUrl: './occupation-profile-view.component.html',
  styleUrls: ['./occupation-profile-view.component.scss']
})
export class OccupationProfileViewComponent implements OnInit
{
  @Input() occupationProfileDetails: Occupation;
  checkmarkCircle: string;

  pathwayDetails: any[] = [{ title: "Nurse Practitioner" }, { title: "Nurse Midwife" }, { title: "Nurse Practitioner" },
  { title: "Xray Technician" }, { title: "Nurse Practitioner" }];

  constructor() { }

  ngOnInit(): void
  {
    this.checkmarkCircle = CONFIG.IMAGES.CIRCLE_CHECKMARK;
  }

}
