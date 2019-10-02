import { Component, OnInit } from '@angular/core';
import { CreateService } from '../../../service/create/create.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-end',
  templateUrl: './project-end.component.html',
  styleUrls: ['./project-end.component.scss']
})
export class ProjectEndComponent implements OnInit {

  constructor(
    private createService: CreateService,
    private router: Router
  ) { }

  ngOnInit() {}

  createProjectSubmit(){
    console.log("submit Create");
    // send information to the formula page
    this.createService.sendToFormulaTable();
    this.router.navigate(["/profile/formula"]);
  }
}
