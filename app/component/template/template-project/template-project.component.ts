import { Component, OnInit, Input } from '@angular/core';
import { TemplateService } from '../../../service/template/template.service';

@Component({
  selector: 'app-template-project',
  templateUrl: './template-project.component.html',
  styleUrls: ['./template-project.component.scss']
})
export class TemplateProjectComponent implements OnInit {
  scoreField:Set<string> = new Set();
  @Input() serviceData: string[];
  constructor(private serviceFormula: TemplateService) { }

  ngOnInit() {
    // this.serviceFormula.
  }
  addField({name, checkmark}){
    // console.log(" Name : "+name +" Checkmark :"+ checkmark);
    if(checkmark)
      this.scoreField.add(name);
    else
      this.scoreField.delete(name);
    // if()
    // console.log(this.scoreField);
  }

}
/*
Service would get the component at high level then put them to the lower
components
*/
