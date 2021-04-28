import { Injectable } from '@angular/core';
import { AreaOfStudy, AreaOfStudyListGQL, AreaOfStudyListQuery, AreaOfStudyByIdGQL, AreaOfStudyByIdQuery } from '@gql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApolloQueryResult } from 'apollo-client';

@Injectable({
  providedIn: 'root'
})
export class AreaOfStudyService
{

  constructor
    (
      private areaOfStudyListGQL: AreaOfStudyListGQL,
      private areaOfStudyByIdGQL: AreaOfStudyByIdGQL
    ) { }


  getAreaOfStudyList(): Observable<AreaOfStudy[]>
  {
    return this.areaOfStudyListGQL.fetch()
      .pipe
      (
        map((apolloQueryResults: ApolloQueryResult<AreaOfStudyListQuery>) =>
        {
          if (apolloQueryResults.data)
          {
            const list: AreaOfStudy[] = [];

            apolloQueryResults.data.areaOfStudyList.map(item =>
            {
              const areaOfStudy: AreaOfStudy = item as AreaOfStudy;
              list.push(areaOfStudy);
            });

            return list;
          }
        })
      );
  }

  getAreaOfStudyById(areaOfStudyId: string): Observable<AreaOfStudy>
  {
    return this.areaOfStudyByIdGQL.fetch({ areaOfStudyId })
      .pipe
      (
        map((result: ApolloQueryResult<AreaOfStudyByIdQuery>) => result.data.areaOfStudyById as AreaOfStudy)
      );
  }

}
