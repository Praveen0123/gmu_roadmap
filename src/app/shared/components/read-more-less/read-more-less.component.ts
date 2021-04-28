import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'gmu-read-more-less',
  templateUrl: './read-more-less.component.html',
  styleUrls: ['./read-more-less.component.scss']
})
export class ReadMoreLessComponent implements OnInit
{
  @Input() description: string;
  @Input() showMoreText: string = 'read more';
  @Input() showLessText: string = 'read less';
  @Input() maxLength: number = 100;

  showMoreLabel: string;
  descriptionDetails: string;
  doShowMore: boolean = false;
  isReadMoreVisible: boolean = true;

  constructor() { }

  ngOnInit(): void
  {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void
  {
    if (changes.description && !changes.description.firstChange)
    {
      this.init();
    }
  }

  onShowMoreClick()
  {
    this.doShowMore = !this.doShowMore;
    this.setShowMoreLabel();
    this.setDescriptionDetails();
  }

  private init()
  {
    this.doShowMore = false;
    this.setIsReadMoreVisible();
    this.setShowMoreLabel();
    this.setDescriptionDetails();
  }

  private setIsReadMoreVisible()
  {
    this.isReadMoreVisible = (this.description.length <= this.maxLength) ? false : true;
  }

  private setShowMoreLabel()
  {
    this.showMoreLabel = (this.doShowMore) ? this.showLessText : this.showMoreText;
  }

  private setDescriptionDetails()
  {
    this.descriptionDetails = (this.doShowMore) ? this.description : `${this.description.slice(0, this.maxLength)}... `;
  }

}
