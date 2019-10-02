import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
// import {PlusButtonComponent} from '../project-button/plus-button/plus-button.component';
import { ProjectService } from '../../../../service/project/project.service';
import { ProjectData } from '../../../../../models/projectdata';
@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss']
})

//CHILD window
export class AddMenuComponent implements OnInit {
  @Input()  showMenu: boolean;
  @Output() addOneRow: EventEmitter<any> = new EventEmitter;
  @Output() addOneColumn: EventEmitter<any> = new EventEmitter;
  currentFileUpload:File=null;
  projectData :ProjectData[];
      constructor(
        private projectService: ProjectService
      ) {}
      // method always updates
      ngOnInit() {}

      showMenuList():any{
        return {"add__menu-show": this.showMenu}
      }
      addRow(){
        // console.log("add row ");
        this.addOneRow.emit();
        // this.projectService.addRow();
      }
      addColumn(){
          // console.log("add column");
          this.addOneColumn.emit();
      }
      addFile(event){
        const fd =  new FormData();
        this.currentFileUpload = <File> event.target.files.item(0);

        this.projectService.insertFormFile(this.currentFileUpload)
        .subscribe(
          // im successfully getting the file information
          // in the formate of the ProductData
          res=>{
            // this.projectData = res['body'];
            console.log(res['body']);
          },

          err =>{console.log("Something is wrong with the file");}
        );
      }
}

/*
    I have three buttons in this method
    addRow()
    create a new cell block for the user to enter in text
    addColumn()
    allow user to enter a name with a popup menu
    then bount the amount of resources you have on the page.
    addFile()
     takes in a file and send it to backend
    add information to the backend then get information
    back to display to the user
    NEED: @ Output to get infromation from backend to the parent components
*/
