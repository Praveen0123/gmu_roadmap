import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'gmu-occupation-search-box-form',
  templateUrl: './occupation-search-box-form.component.html',
  styleUrls: ['./occupation-search-box-form.component.scss']
})
export class OccupationSearchBoxFormComponent implements OnInit
{
  @Output('onFormSubmit') formSubmitEventEmitter = new EventEmitter<string>();

  formGroup: FormGroup;

  constructor
    (
      private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void
  {
    this.buildForm();
  }

  onFormSubmit()
  {
    // RETURN (via Output above) IF FORM GROUP IS VALID *AND* PARENT COMPONENT HAS PROVIDED A CALLBACK VIA @Output
    if (this.formGroup.valid && this.formSubmitEventEmitter.observers.length > 0)
    {
      const searchTerm: string = this.formGroup.value;

      this.formSubmitEventEmitter.emit(searchTerm);
    }
  }

  private buildForm()
  {
    this.formGroup = this.formBuilder.group(
      {
        searchTerm: new FormControl('', [Validators.required])
      });
  }
}
