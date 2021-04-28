import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { OccupationDetailsByIdGQL, OccupationDetailsByIdQuery, Occupation } from '@gql';
import { ApolloQueryResult } from 'apollo-client';


@Injectable({
  providedIn: 'root'
})
export class OccupationService
{
  constructor
    (
      private occupationDetailsByIdGQL: OccupationDetailsByIdGQL
    ) { }

  static quickSortByDemandLevel(array: Occupation[]): Occupation[]
  {
    if (!array || array.length < 2) { return array; }

    const arrayCopy: Occupation[] = JSON.parse(JSON.stringify(array));
    const pivot = arrayCopy[Math.floor(Math.random() * arrayCopy.length)];
    const left: Occupation[] = [];
    const equal: Occupation[] = [];
    const right: Occupation[] = [];

    while (arrayCopy.length)
    {
      if (arrayCopy[0].projectedJobOpenings2018To2028 > pivot.projectedJobOpenings2018To2028)
      {
        left.push(arrayCopy.shift() as Occupation);
      }
      else if (arrayCopy[0].projectedJobOpenings2018To2028 === pivot.projectedJobOpenings2018To2028)
      {
        equal.push(arrayCopy.shift() as Occupation);
      }
      else
      {
        right.push(arrayCopy.shift() as Occupation);
      }
    }

    // console.log(left, equal, right)

    return [...this.quickSortByDemandLevel(left), ...equal, ...this.quickSortByDemandLevel(right)];
  }

  static quickSortBySalary(array: Occupation[]): Occupation[]
  {
    if (!array || array.length < 2) { return array; }

    const arrayCopy: Occupation[] = JSON.parse(JSON.stringify(array));
    const pivot = arrayCopy[Math.floor(Math.random() * arrayCopy.length)];
    const left: Occupation[] = [];
    const equal: Occupation[] = [];
    const right: Occupation[] = [];

    while (arrayCopy.length)
    {
      if (arrayCopy[0].preferredSalary.minimumSalaryPerYear > pivot.preferredSalary.minimumSalaryPerYear)
      {
        left.push(arrayCopy.shift() as Occupation);
      }
      else if (arrayCopy[0].preferredSalary.minimumSalaryPerYear === pivot.preferredSalary.minimumSalaryPerYear)
      {
        equal.push(arrayCopy.shift() as Occupation);
      }
      else
      {
        right.push(arrayCopy.shift() as Occupation);
      }
    }

    // console.log(left, equal, right)

    return [...this.quickSortBySalary(left), ...equal, ...this.quickSortBySalary(right)];
  }

  getOccupationDetails(occupationId: string): Observable<Occupation>
  {
    return this.occupationDetailsByIdGQL.fetch({ id: occupationId })
      .pipe
      (
        map((apolloQueryResults: ApolloQueryResult<OccupationDetailsByIdQuery>) =>
        {
          if (apolloQueryResults.data)
          {
            const occupation: Occupation = apolloQueryResults.data.occupationById as Occupation;

            return occupation;
          }
        })
      );
  }
}
