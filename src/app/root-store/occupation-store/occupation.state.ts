import { Skill, Occupation, AreaOfStudy } from '@gql';
import { HotSpotModel, GeoSalaryModel } from '@vantage-point/maps';

export const occupationFeatureKey = 'occupation';


export interface EducationLevelFrequency
{
  educationLevelGroupId: number;
  educationLevelGroup: string;
  frequency: number;
  precisionLevel: string;
}

export interface OccupationState
{
  occupationModel: Occupation;
  occupationCardList: Occupation[];
  areaOfStudyList: AreaOfStudy[];
  error: any;
}

export const initialOccupationState: OccupationState =
{
  occupationModel: undefined,
  occupationCardList: undefined,
  areaOfStudyList: undefined,
  error: null
};
