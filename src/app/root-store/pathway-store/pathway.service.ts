import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PathwaySummaryModel, SkillTypeEnum } from './pathway.state';
import { Pathway, PathwayListGQL, PathwayDetailsByIdGQL, PathwayDetailsByIdQuery, PathwayListQuery, Course, Degree, Skill } from '@gql';
import { ApolloQueryResult } from 'apollo-client';


@Injectable({
  providedIn: 'root'
})
export class PathwayService
{

  constructor
    (
      private pathwayListGQL: PathwayListGQL,
      private pathwayDetailsByIdGQL: PathwayDetailsByIdGQL
    ) { }

  static getPathwaySummaryModel(pathway: Pathway): PathwaySummaryModel
  {
    if (pathway)
    {
      const pathwaySummaryModel: PathwaySummaryModel =
      {
        novaClassCount: this.getClassCount(pathway.associateDegree),
        novaCredits: this.getCreditCount(pathway.associateDegree),
        masonClassCount: this.getClassCount(pathway.bachelorDegree),
        masonCredits: this.getCreditCount(pathway.bachelorDegree)
      };

      return pathwaySummaryModel;
    }
  }
  static getClassCount(degree: Degree): number
  {
    return (degree.courses) ? degree.courses.length : 0;
  }
  static getCreditCount(degree: Degree): number
  {
    return (degree.courses) ? degree.courses.reduce((accumulaor, item: Course) => accumulaor + item.credits, 0) : 0;
  }
  static findSkillsBySkillType(skillsList: Skill[], skillType: SkillTypeEnum): Skill[]
  {
    const results: Skill[] = [];
    // FIND ALL DEGREES MATCHINGN PASSED SKILL TYPE
    skillsList.map((item: Skill) =>
    {
      if (item.type === skillType)
      {
        results.push(item);
      }
    });

    return results;
  }
  static quickSortByDemandLevel(array: Skill[]): Skill[]
  {
    if (!array || array.length < 2) { return array; }

    const arrayCopy: Skill[] = JSON.parse(JSON.stringify(array));
    const pivot = arrayCopy[Math.floor(Math.random() * arrayCopy.length)];
    const left: Skill[] = [];
    const equal: Skill[] = [];
    const right: Skill[] = [];

    while (arrayCopy.length)
    {
      if (arrayCopy[0].demandLevel > pivot.demandLevel)
      {
        left.push(arrayCopy.shift() as Skill);
      }
      else if (arrayCopy[0].demandLevel === pivot.demandLevel)
      {
        equal.push(arrayCopy.shift() as Skill);
      }
      else
      {
        right.push(arrayCopy.shift() as Skill);
      }
    }

    // console.log(left, equal, right)

    return [...this.quickSortByDemandLevel(left), ...equal, ...this.quickSortByDemandLevel(right)];
  }



  getPathwayList(): Observable<Pathway[]>
  {
    return this.pathwayListGQL.fetch()
      .pipe
      (
        map((apolloQueryResults: ApolloQueryResult<PathwayListQuery>) =>
        {
          if (apolloQueryResults.data)
          {
            const pathwayList: Pathway[] = apolloQueryResults.data.pathwayList;

            return pathwayList;
          }
        })
      );
  }

  getPathwayDetails(pathwayId: string): Observable<Pathway>
  {
    return this.pathwayDetailsByIdGQL.fetch({ id: pathwayId })
      .pipe
      (
        map((apolloQueryResults: ApolloQueryResult<PathwayDetailsByIdQuery>) =>
        {
          if (apolloQueryResults.data)
          {
            const pathway: Pathway = apolloQueryResults.data.pathwayById as Pathway;

            // console.log('RECONSTITUTED PATHWAY', pathway);

            return pathway;
          }
        })
      );
  }
}
