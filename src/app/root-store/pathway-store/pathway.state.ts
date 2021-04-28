import { Pathway } from '@gql';

export const pathwayFeatureKey = 'pathway';

export interface PathwaySummaryModel
{
  novaClassCount: number;
  novaCredits: number;
  masonClassCount: number;
  masonCredits: number;
}

export enum SkillTypeEnum
{
  Essential = 'BaseLine Skill',
  Technical = 'Specialized Skill'
}


export interface PathwayState
{
  pathwayList: Pathway[];
  pathway: Pathway;
}

export const initialPathwayState: PathwayState =
{
  pathwayList: undefined,
  pathway: undefined
};
