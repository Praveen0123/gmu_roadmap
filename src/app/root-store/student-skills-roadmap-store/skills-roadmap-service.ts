import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SkillsRoadmapModel } from './skills-roadmap-state';
import { map, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SkillsRoadmapService
{

  constructor() { }

  getskillRoadmapList(): Observable<SkillsRoadmapModel[]>
  {

    return of(this.fakeSkillsRoadmapData())
      .pipe
      (
        map((studentResult: SkillsRoadmapModel[]) =>
        {
          if (studentResult)
          {
            const list: SkillsRoadmapModel[] = [];

            studentResult.map(item =>
            {
              const student: SkillsRoadmapModel = item as SkillsRoadmapModel;
              list.push(student);
            });

            return list;
            // return Object.assign({}, list);
          }
        })
      );
  }

  // getStudentById(studentId: string): Observable<SkillsRoadmapModel[]>
  // {
  //   const list: SkillsRoadmapModel[] = this.fakeStudentData().filter((item: SkillsRoadmapModel) => item.studentId === studentId);
  //   return of(list);
  // }



  private fakeSkillsRoadmapData()
  {

    const skillRoadmapList: SkillsRoadmapModel[] = [
      {
        id: "adst12458-986",
        studentName: 'Mary Miller',
        areaOfStudy: 'Health Services and Nursing',
        novaDegree: 'A.A.S. Respiratory Therapy',
        masonDegree: 'B.A.S. Applied Science – Health, Wellness, & Social Services Concentration',
        //Phone: '555-123-4567',
        successCoachName: 'Jane Doe',
        successCoachEmail: 'janedoe@mason.com',
        chortYear: '2019-2020',
        // status: 'Currently Enrolled',
        // GPA: '3.2',
        expectedGradutionDate: 'May 2020',
        careerDescription: 'Here are some occupations you will be qualified and prepared for with a B.S. in Nursing!',

        occupationLists: [
          {
            description: "Plan, direct, or coordinate marketing policies and programs, such as determining the demand for products and services offered by a firm and its competitors, and identify potential customers. Develop pricing strategies with the goal of maximizing the firm's profits or share of the market while ensuring the firm's customers are satisfied. Oversee product development or monitor trends that indicate the need for new products and services.",
            imageName: "1659.jpg",
            onetCode: "11-2021.00",
            preferredSalary: {
              maximumSalaryPerHour: 89.1,
              maximumSalaryPerYear: 185320,
              medianSalaryPerHour: 65.79,
              medianSalaryPerYear: 136850,
              minimumSalaryPerHour: 46.98,
              minimumSalaryPerYear: 97710,
              salaryPrecisionType: "National (BLS)"
            },
            projectedGrowthRate: "High",
            projectedJobOpenings2018To2028: 26000,
            title: "Marketing Managers",
            typicalEducationLevelGroupId: 5,
            typicalLevelOfEducation: "Bachelor's, Degree",
            typicalWorkExperience: "9+ years",
            typicalWorkExperienceGroupId: 4,
            videoId: "11202100  ",
            vpOccupationId: "8ab86ad7-a166-47bf-8c66-4bbe29c7c61e"
          },
          {
            description: "Plan, direct, or coordinate advertising policies and programs or produce collateral materials, such as posters, contests, coupons, or give-aways, to create extra interest in the purchase of a product or service for a department, an entire organization, or on an account basis.",
            imageName: "1698.jpg",
            onetCode: "11-2011.00",
            preferredSalary: {
              maximumSalaryPerHour: 45.67,
              maximumSalaryPerYear: 95000,
              medianSalaryPerHour: 36.06,
              medianSalaryPerYear: 75000,
              minimumSalaryPerHour: 12.02,
              minimumSalaryPerYear: 25000,
              salaryPrecisionType: "National (Burning Glass)"
            },
            projectedGrowthRate: "Low",
            projectedJobOpenings2018To2028: 2700,
            title: "Advertising and Promotions Managers",
            typicalEducationLevelGroupId: 5,
            typicalLevelOfEducation: "Bachelor's Degree",
            typicalWorkExperience: "3-5 years",
            typicalWorkExperienceGroupId: 2,
            videoId: "11201100  ",
            vpOccupationId: "a10c9a42-cdf7-4b8c-ad8e-a88406d7d8e4"
          },
          {
            description: "Create and implement methods to market green products and services.",
            imageName: "1829.jpg",
            onetCode: "11-2011.01",
            preferredSalary: {
              maximumSalaryPerHour: 45.67,
              maximumSalaryPerYear: 95000,
              medianSalaryPerHour: 36.06,
              medianSalaryPerYear: 75000,
              minimumSalaryPerHour: 12.02,
              minimumSalaryPerYear: 25000,
              salaryPrecisionType: "National (Burning Glass)"
            },
            projectedGrowthRate: "Low",
            projectedJobOpenings2018To2028: 2700,
            title: "Green Marketers",
            typicalEducationLevelGroupId: null,
            typicalLevelOfEducation: null,
            typicalWorkExperience: null,
            typicalWorkExperienceGroupId: null,
            videoId: "11201101  ",
            vpOccupationId: "c6bb60d1-4504-4b32-83fe-282b1b51a9af"
          },
          {
            description: "Plan, direct, or coordinate the operations of public or private sector organizations. Duties and responsibilities include formulating policies, managing daily operations, and planning the use of materials and human resources, but are too diverse and general in nature to be classified in any one functional area of management or administration, such as personnel, purchasing, or administrative services.",
            imageName: "2059.jpg",
            onetCode: "11-1021.00",
            preferredSalary: {
              maximumSalaryPerHour: 45.67,
              maximumSalaryPerYear: 95000,
              medianSalaryPerHour: 36.06,
              medianSalaryPerYear: 75000,
              minimumSalaryPerHour: 12.02,
              minimumSalaryPerYear: 25000,
              salaryPrecisionType: "National (Burning Glass)"
            },
            projectedGrowthRate: "High",
            projectedJobOpenings2018To2028: 230000,
            title: "General and Operations Managers",
            typicalEducationLevelGroupId: 5,
            typicalLevelOfEducation: "Bachelor's Degree",
            typicalWorkExperience: "3-5 years",
            typicalWorkExperienceGroupId: 2,
            videoId: "11102100  ",
            vpOccupationId: "6c303646-9aa4-44bc-bf57-b39563389549"
          },

          {
            description: "Plan, direct, or coordinate advertising policies and programs or produce collateral materials, such as posters, contests, coupons, or give-aways, to create extra interest in the purchase of a product or service for a department, an entire organization, or on an account basis.",
            imageName: "1698.jpg",
            onetCode: "11-2011.00",
            preferredSalary: {
              maximumSalaryPerHour: 45.67,
              maximumSalaryPerYear: 95000,
              medianSalaryPerHour: 36.06,
              medianSalaryPerYear: 75000,
              minimumSalaryPerHour: 12.02,
              minimumSalaryPerYear: 25000,
              salaryPrecisionType: "National (Burning Glass)"
            },
            projectedGrowthRate: "Low",
            projectedJobOpenings2018To2028: 2700,
            title: "Advertising and Promotions Managers",
            typicalEducationLevelGroupId: 5,
            typicalLevelOfEducation: "Bachelor's Degree",
            typicalWorkExperience: "3-5 years",
            typicalWorkExperienceGroupId: 2,
            videoId: "11201100  ",
            vpOccupationId: "a10c9a42-cdf7-4b8c-ad8e-a88406d7d8e4"
          },




        ],
        associateDegree: {
          id: "e1c4c28c-f6e1-4c3c-aabe-c8c1ad99c086",
          name: "A.A.S. Cybersecurity",
          school: "NOVA",
          type: "Associate Degree",
          courses: [
            {
              id: 59,
              name: "College Composition I",
              code: "ENG111",
              credits: 3,
            },
            {
              id: 150,
              name: "Developmental Psychology",
              code: "PSY230",
              credits: 3,
            },
            {
              id: 12,
              name: "Anatomy and Physiology I",
              code: "BIO141",
              credits: 4


            }
          ],
        }

      }


    ];
    return (skillRoadmapList);

  }


}







