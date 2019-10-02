import { Injectable } from '@angular/core';
import { Resource } from '../../../../models/resources';
import { Data } from '../../../../models/data';
// import { Register } from '../../../../models/register';
// import {HttpHeaders} from '@angular/common/http';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjecthandlerService {
  empty: string= "";
  mainColumns:string []=[  "resourceName",  "resourceCode" ];
  constructor() { }
  // private projectTableInfo = new Subject<any>();


  // PROJECT PAGE HANDLERS
  // reverse the information in the data base to match
    reArrangeTableRowData(serviceArray: string[][], maxRow, maxCol):string [][]{
      let rows: any[][] = [];
      let temp: any [] = [];
      let maxRowLength = maxRow;
      // this.rowColValues
      for(let row=0; row < maxRowLength; row++){
          for(let col=0; col < maxCol ; col++){
            // if(this.rowColValues[col].length < maxRowLength)
            if(serviceArray[col][row]){
              temp.push( serviceArray[col][row] );
            }else{
              temp.push("");
            }
          }
        rows.push(temp);
        temp = [];
      }
      serviceArray = rows;
      return rows;
    }

    findMaxRowLength(oddMatrix: string[][]): number{
      let maxRow = 0;
      for(let rows of oddMatrix){
        maxRow = Math.max(rows.length,maxRow);
      }
      return maxRow;
    }







// ADDING ROW
    insertRow(table: string[][], col_length: number){
      for(let i = 0; i < col_length; i++){
          table[i].push(this.empty);
      }
      return table;
    }
    addColumn(rowColum: string[][] ){
      let insertCol: string[] = [];
      for(let i = 0; i < this.findMaxRowLength(rowColum); i++){
          insertCol.push(this.empty);
      }
      if(rowColum.length > 0)
        rowColum.push(insertCol);
      return rowColum;
    }



    // GET COLUMNS FOR THE USER

    getColumnsFromServer(data:Data[], columnName: string[]): void{
      // let columnName: string[] = [];
      let columnSet: Set<String> = new Set();
      // get the main columns from the database
      data.forEach(res=>{
        if(!columnSet.has(res.columnName)){
          columnName.push(res.columnName);
          columnSet.add(res.columnName);
        }
      });
      // return columnName;
    }


    getFirstTwoMainRows( resource :Resource[], restructorDataFromServer: string[][]): void{
      // let tempRow: string [] = [];
      let mainRowSet:Set<string> = new Set();
      this.mainColumns.forEach( column => {
        let tempRow: string [] = [];
        resource.forEach(res=>{

          if(!mainRowSet.has(res[column])){
              tempRow.push(res[column]);
              mainRowSet.add(res[column]);
            }
        });
        restructorDataFromServer.push(tempRow);
      });
    }


    //ADD MORE ROWS TO THE TABLE
    getRowsFromServerData(datas: Data[], tableRows: string[][], columNames: string[]):void{
      // create a dynamic two dimensional array base on the length of columns
      let rows = Array.from(new Array(columNames.length), ()=>[]);
      columNames.forEach( (column, colidx) => {
              rows[colidx].push(datas.filter( data => data.columnName === column)
                    .map(data=> data.value));
              tableRows.push(...rows[colidx]);

      });
    }
}
