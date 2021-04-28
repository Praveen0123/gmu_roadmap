import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gmu-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit
{

  @Input() title: string;
  @Input() subTitle: string;

  constructor() { }

  ngOnInit(): void
  {
  }

}
