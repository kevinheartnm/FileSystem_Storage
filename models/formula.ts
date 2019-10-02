import {Project} from './project';

export class Formula{
  project:Project;
  resourceCode:string;
  columnName:string;
  value:string;
  type:string;
  fromResource:number;
  constructor(
    project:Project,
    resourceCode:string,
    columnName:string,
    value:string,
    type:string,
    fromResource:number
  ){
    this.project=project;
    this.resourceCode=resourceCode;
    this.columnName=columnName;
    this.value=value;
    this.type=type;
    this.fromResource=fromResource;
  }
}
