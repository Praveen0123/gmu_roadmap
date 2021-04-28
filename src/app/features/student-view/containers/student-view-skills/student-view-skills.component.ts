import { Component, OnInit, Input } from '@angular/core';
import { NavLinkModel } from '../../models/nav-links/nav-links.model';
import { Router } from '@angular/router';

@Component({
  selector: 'gmu-student-view-skills',
  templateUrl: './student-view-skills.component.html',
  styleUrls: ['./student-view-skills.component.scss']
})
export class StudentViewSkillsComponent implements OnInit
{


  @Input() navLinks: NavLinkModel[];


  constructor(public router: Router) { }

  ngOnInit(): void
  {
  }

  trackByFn(index, item)
  {
    return index; // or item.id
  }

}
