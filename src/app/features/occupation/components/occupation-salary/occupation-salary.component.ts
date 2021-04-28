import { Component, OnInit, Input } from '@angular/core';
import { Occupation } from '@gql';

enum SalaryEnum
{
  Annual = 'Annual',
  Hourly = 'Hourly'
}

@Component({
  selector: 'gmu-occupation-salary',
  templateUrl: './occupation-salary.component.html',
  styleUrls: ['./occupation-salary.component.scss']
})
export class OccupationSalaryComponent implements OnInit
{
  @Input() occupationProfileDetails: Occupation;

  availableSalaryTypes = SalaryEnum;
  selectedSalaryType: SalaryEnum;
  minimumSalary: number;
  mediumSalary: number;
  maximumSalary: number;

  constructor() { }

  ngOnInit(): void
  {
    this.selectedSalaryType = SalaryEnum.Annual;
    this.toggleSalary();
  }

  onSalaryTypeSelection(type: SalaryEnum)
  {
    this.selectedSalaryType = type;
    this.toggleSalary();
  }

  private toggleSalary()
  {
    switch (this.selectedSalaryType)
    {
      case SalaryEnum.Annual:
        {
          this.minimumSalary = this.occupationProfileDetails.preferredSalary.minimumSalaryPerYear;
          this.mediumSalary = this.occupationProfileDetails.preferredSalary.medianSalaryPerYear;
          this.maximumSalary = this.occupationProfileDetails.preferredSalary.maximumSalaryPerYear;
          break;
        }
      case SalaryEnum.Hourly:
        {
          this.minimumSalary = this.occupationProfileDetails.preferredSalary.minimumSalaryPerHour;
          this.mediumSalary = this.occupationProfileDetails.preferredSalary.medianSalaryPerHour;
          this.maximumSalary = this.occupationProfileDetails.preferredSalary.maximumSalaryPerHour;
          break;
        }
    }
  }
}
