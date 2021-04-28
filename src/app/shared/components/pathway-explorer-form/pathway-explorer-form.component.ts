import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { GoogleAnalyticsService, IGoogleAnalyticEvent } from '@app/core/services/google-analytics/google-analytics.service';
import { Pathway } from '@gql';

@Component({
  selector: 'gmu-pathway-explorer-form',
  templateUrl: './pathway-explorer-form.component.html',
  styleUrls: ['./pathway-explorer-form.component.scss']
})
export class PathwayExplorerFormComponent implements OnInit, OnChanges
{
  @Input() pathwayList: Pathway[];
  @Input() selectedPathway: Pathway;
  @Output('onFormSubmit') formSubmitEventEmitter = new EventEmitter<Pathway>();
  @Output('onClearSelection') clearSelectionEventEmitter = new EventEmitter();

  formGroup: FormGroup;
  uniqueAreaOfStudyList: Pathway[] = [];
  uniqueBachelorsDegreeList: Pathway[] = [];
  uniqueAssociatesDegreeList: Pathway[] = [];

  constructor
    (
      private formBuilder: FormBuilder,
      private gas: GoogleAnalyticsService
    ) { }

  ngOnInit(): void
  {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (changes.pathwayList && !changes.pathwayList.firstChange)
    {
      this.initForm();
    }

    if (changes.selectedPathway && !changes.selectedPathway.firstChange)
    {
      this.initForm();
    }
  }

  onSelectionAreaOfStudy(selectedPathway: Pathway)
  {
    // PRODUCE JUST UNIQUE MASON DEGREES
    this.uniqueBachelorsDegreeList = this.buildUniqueBachelorsDegreeList(selectedPathway);

    // RESET NOVA DEGREE FORM VALUE AND NOVA DEGREE LIST
    this.formGroup.controls.associatesDegree.patchValue(null);
    this.uniqueAssociatesDegreeList = [];

    // GOOGLE ANALYTICS
    const googleAnalyticEvent: IGoogleAnalyticEvent =
    {
      eventName: 'Event-Degree Selection',
      eventCategory: 'Event-Degree Selection',
      eventAction: 'Area of Study',
      eventLabel: selectedPathway.areaOfStudy,
      eventValue: null
    };

    this.gas.emitEvent(googleAnalyticEvent);
  }

  onSelectionBachelorsDegree(selectedPathway: Pathway)
  {
    // SELECTED AREA OF STUDY
    const selectedAreaOfStudy: Pathway = this.formGroup.controls.areaOfStudy.value;

    // PRODUCE JUST UNIQUE NOVA DEGREES
    this.uniqueAssociatesDegreeList = this.buildUniqueAssociatesDegreeList(selectedAreaOfStudy, selectedPathway);

    // IF THERE IS ONLY 1 NOVA DEGREE, THEN AUTO-SELECT IT
    if (this.uniqueAssociatesDegreeList.length === 1)
    {
      this.formGroup.controls.associatesDegree.patchValue(this.uniqueAssociatesDegreeList[0]);
    }
    // ELSE, RESET NOVA DEGREE FORM VALUE
    else
    {
      this.formGroup.controls.associatesDegree.patchValue(null);
    }

    // GOOGLE ANALYTICS
    const googleAnalyticEvent: IGoogleAnalyticEvent =
    {
      eventName: 'Event-Degree Selection',
      eventCategory: 'Event-Degree Selection',
      eventAction: 'Mason Degree',
      eventLabel: selectedPathway.bachelorDegree.name,
      eventValue: null
    };

    this.gas.emitEvent(googleAnalyticEvent);
  }

  onSelectionAssociatesDegree(selectedPathway: Pathway)
  {
    // GOOGLE ANALYTICS
    const googleAnalyticEvent: IGoogleAnalyticEvent =
    {
      eventName: 'Event-Degree Selection',
      eventCategory: 'Event-Degree Selection',
      eventAction: 'Nova Degree',
      eventLabel: selectedPathway.associateDegree.name,
      eventValue: null
    };
    this.gas.emitEvent(googleAnalyticEvent);
  }

  onFormSubmit()
  {
    // RETURN (via Output above) IF FORM GROUP IS VALID *AND* PARENT COMPONENT HAS PROVIDED A CALLBACK VIA @Output
    if (this.formGroup.valid && this.formSubmitEventEmitter.observers.length > 0)
    {
      const selectedPathwayFromForm: Pathway = this.formGroup.controls.associatesDegree.value;

      this.formSubmitEventEmitter.emit(selectedPathwayFromForm);

      // GOOGLE ANALYTICS
      const formSubmissionValue: string = `Area-of-Study_${selectedPathwayFromForm.areaOfStudy}
                                            | Mason_Degree_${selectedPathwayFromForm.bachelorDegree.name}
                                            | Nova_Degree_${selectedPathwayFromForm.associateDegree.name}`;

      const googleAnalyticEvent: IGoogleAnalyticEvent =
      {
        eventName: 'Event-Degree Selection',
        eventCategory: 'Event-Degree Selection',
        eventAction: 'Form Submission',
        eventLabel: selectedPathwayFromForm.associateDegree.name,
        eventValue: formSubmissionValue
      };

      this.gas.emitEvent(googleAnalyticEvent);
    }
  }

  clearSelectionClick()
  {
    if (this.clearSelectionEventEmitter.observers.length > 0)
    {
      this.clearSelectionEventEmitter.emit();
    }
  }


  private initForm()
  {
    if (this.pathwayList)
    {
      this.buildForm();
      this.uniqueAreaOfStudyList = this.buildUniqueAreaOfStudyList();

      this.uniqueBachelorsDegreeList = [];
      this.uniqueAssociatesDegreeList = [];

      if (this.selectedPathway)
      {
        this.uniqueBachelorsDegreeList = this.buildUniqueBachelorsDegreeList(this.selectedPathway);
        this.uniqueAssociatesDegreeList = this.buildUniqueAssociatesDegreeList(this.selectedPathway, this.selectedPathway);

        this.setSelectedAreaOfStudy();
        this.setSelectedBachelorsDegree();
        this.setSelecteAssociatesDegree();
      }
    }
  }

  private buildForm()
  {
    this.formGroup = this.formBuilder.group(
      {
        areaOfStudy: new FormControl('', [Validators.required]),
        bachelorsDegree: new FormControl('', [Validators.required]),
        associatesDegree: new FormControl('', [Validators.required])
      });

    if (this.selectedPathway)
    {
      this.formGroup.controls.areaOfStudy.patchValue(this.selectedPathway);
      this.formGroup.controls.bachelorsDegree.patchValue(this.selectedPathway);
      this.formGroup.controls.associatesDegree.patchValue(this.selectedPathway);
    }
  }

  private buildUniqueAreaOfStudyList(): Pathway[]
  {
    return _.uniqBy(this.pathwayList, (o: Pathway) => o.areaOfStudy);
  }

  private buildUniqueBachelorsDegreeList(selectedPathway: Pathway): Pathway[]
  {
    // FIND ALL MASON DEGREES RELATED TO SELECTED AREA OF STUDY
    const filteredBachelorsDegreeList: Pathway[] = this.pathwayList.filter((item: Pathway) => item.areaOfStudy === selectedPathway.areaOfStudy);

    return _.uniqBy(filteredBachelorsDegreeList, (o: Pathway) => o.bachelorDegree.name);
  }

  private buildUniqueAssociatesDegreeList(selectedAreaOfStudy: Pathway, selectedBachelorsDegree: Pathway): Pathway[]
  {
    // FIND ALL NOVA DEGREES RELATED TO SELECTED AREA OF STUDY *AND* SELECTED MASON DEGEE
    const filteredAssociatesDegreeList: Pathway[] = this.pathwayList.filter
      ((item: Pathway) =>
        (
          item.areaOfStudy === selectedAreaOfStudy.areaOfStudy
          && item.bachelorDegree.name === selectedBachelorsDegree.bachelorDegree.name
        )
      );

    // PRODUCE JUST UNIQUE NOVA DEGREES
    return _.uniqBy(filteredAssociatesDegreeList, (o: Pathway) => o.associateDegree);
  }

  private setSelectedAreaOfStudy()
  {
    if (this.selectedPathway && this.uniqueAreaOfStudyList && this.uniqueAreaOfStudyList.length > 0)
    {
      const foundIndex = this.uniqueAreaOfStudyList.findIndex((item: Pathway) => item.areaOfStudy === this.selectedPathway.areaOfStudy);

      if (foundIndex >= 0)
      {
        this.uniqueAreaOfStudyList[foundIndex] = this.selectedPathway;
      }
    }
  }

  private setSelectedBachelorsDegree()
  {
    if (this.selectedPathway && this.uniqueBachelorsDegreeList && this.uniqueBachelorsDegreeList.length > 0)
    {
      const foundIndex = this.uniqueBachelorsDegreeList.findIndex((item: Pathway) => item.bachelorDegree.name === this.selectedPathway.bachelorDegree.name);

      if (foundIndex >= 0)
      {
        this.uniqueBachelorsDegreeList[foundIndex] = this.selectedPathway;
      }
    }
  }

  private setSelecteAssociatesDegree()
  {
    if (this.selectedPathway && this.uniqueAssociatesDegreeList && this.uniqueAssociatesDegreeList.length > 0)
    {
      const foundIndex = this.uniqueAssociatesDegreeList.findIndex((item: Pathway) => item.associateDegree.name === this.selectedPathway.associateDegree.name);

      if (foundIndex >= 0)
      {
        this.uniqueAssociatesDegreeList[foundIndex] = this.selectedPathway;
      }
    }
  }

}
