import {Project} from './project';
import {Resource} from './resources';
import {Data} from './data';
export class ProjectData {
  project: Project;
  data: Data[];
  resource: Resource[];

 constructor(
    project: Project,
    data: Data[],
    resource : Resource[] ) {
   this.project = project;
   this.data = data;
   this.resource = resource;
 }
}
