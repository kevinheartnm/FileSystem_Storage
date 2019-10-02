import {Project} from './project';

export class Resource{
  project:Project;
  resourceCode: string;
  resourceName: string;
  //CONSTRUCTOR
  constructor(
    project:Project,
    resourceCode: string,
    resourceName: string){
      this.project = project;
      this.resourceCode = resourceCode;
      this.resourceName = resourceName;
    }
}
