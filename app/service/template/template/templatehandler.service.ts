import { Injectable } from '@angular/core';
import { Formula } from  '../../../../models/formula';
import { Project } from  '../../../../models/project';

@Injectable({
  providedIn: 'root'
})

/*
All main methods are at the top
*/
export class TemplatehandlerService {
  // temperaryStoreTable: string[][];
  constructor() { }

  // VALIDATE THE FIELD MAKING SURE THE ARE UNIQUE
    validationForTemplate(
      quantitys:{field:string, type:string,formula:string }[],
       serviceDataProjectScope: string []
     ):{message:string, valid:boolean}{
      let quantitySet: Set<string> = new Set();
      let projectSet: Set<string> = new Set(serviceDataProjectScope);
      for(let quantity of quantitys){
        if(projectSet.has(quantity.field))
          return {message: `you cann't have "${quantity.field}" because it already exist in Project Scope`, valid: false};
        else if(quantity.field === "")
        return {message:`You do not have an entry for one item`, valid: false};
        else if(quantitySet.has(quantity.field))
          return {message:`You cann't have two of "${quantity.field}" in your quantity survey`, valid: false};
        else
          quantitySet.add(quantity.field);
      }
      return {message:`You have successfully save information`, valid:true};
    }
// GET A OBJECT WITH ALL THE FORMULA
  getFormulaIntoMap(quantitys:{field:string, type:string,formula:string }[]):any{
    let storeFormula:any= {};
    for(let quantity of quantitys){
      if(quantity.type === "formula"){

        storeFormula[quantity.field] = quantity.formula;
      }
    }
    return storeFormula;
  }
//MAKE SURE THAT THE FORMULA OPERATIONS ARE VALID
  validateFormulate(
    formulaDatas: any
    ,quantitys:{field:string, type:string,formula:string }[]
  ):{message:string, valid:boolean}{
    let validate: {message:string, valid:boolean};
    let quantitySet: Set<string> = new Set();
    // GET ALL THE NUMBER VALUE
    for(let quantity of quantitys){
      if(quantity.type === "number")
        quantitySet.add(quantity.field);
    }
    // console.log(formulaDatas)
    //quantitySet
    for(let [key, value] of Object.entries(formulaDatas)){
      // if(value === "") return {message: ` ${key} is empty  `, valid: false};
      validate=  this.validateAlgorithm(value.toString(),quantitySet);
      if(!validate.valid) return validate;
    }
    return validate;
  }



//DOES RECURSION TO VALIDATE THE FORMULA FOR THE USER
  validateAlgorithm(algorithm: string,
     quantitySet:Set<string>):{message:string, valid:boolean}{
    let beforeAndAfterString: any;
    //FIND A WAY YO SEPERATE THE VALUES PEACE BY PIECE
    if(algorithm.length === 0){
      return  {message: "You'r formula are validated", valid: true};
    }else{
      let index =  this.findIndexOfArithmeticOperation(algorithm);
      beforeAndAfterString=  this.getValueBeforeAndAfterArithmeticOperation(algorithm, index);
      // console.log(beforeAndAfterString);
      // check if it is a string
      if(this.isString(beforeAndAfterString.before)){
        // if(this.findIndexOfArithmeticOperation(beforeAndAfterString.after) === -1){}

        if(!quantitySet.has(beforeAndAfterString.before))
          return {message: `""${beforeAndAfterString.before}": not a valid field`, valid: false};

      }else if(!this.isNumber(beforeAndAfterString.before))
            return {message: `""${beforeAndAfterString.before}": not a numeric value accepted`, valid: false};
      return this.validateAlgorithm(beforeAndAfterString.after,quantitySet);
    }
  }
  // SEPAERATE THE VALUE IN THE STRING
  getValueBeforeAndAfterArithmeticOperation(formula, index):{before: string, after: string, operation: string}{
    // string before arithmetic operation
    let subBeforeFormula:string ;
    let subAfterFormula:string ;
    let subOpertation: string;
    if(index < 0){
      subBeforeFormula =formula.slice(0,);
      subOpertation="";
      subAfterFormula = "";
    }else{
      subBeforeFormula = formula.slice(0,index);
      subOpertation  = formula.slice(index,index+1);
      subAfterFormula = formula.slice(index+1,);
    }
    return {before: subBeforeFormula, after: subAfterFormula, operation:subOpertation}
  }
// GET THE INDEX USED
  findIndexOfArithmeticOperation(formula:string):number{
    // + - * /
    for(let idx = 0; idx < formula.length ; idx++)
      if( formula[idx] === "+" ||
          formula[idx] === "*" ||
          formula[idx] === "/" ||
          formula[idx] === "-"  )
        return idx;
    return -1;
  }






  // check if string is a number
      isNumber(number: string){
        let turnNumber = +number; // made cast obvious for demonstration
        // console.log(turnNumber.toString() === number);
        return turnNumber.toString() === number;
      }
  // check is a string is fully a string
    isString(value: string){
        // for(let i =0; i< value.length ; i++)
          if(!((value.charCodeAt(0)>= 65 && value.charCodeAt(0)<= 90)
           || (value.charCodeAt(0)>= 97 && value.charCodeAt(0)<= 122)))
              return false;
        return true;
      }



/*
formulaNameDatas -- array of formula with the "name"  as column name
*/


      // GET THE MAIN PAGE FORMULA  AND THE DATA FROM THE USER INPUT IN THE QUANTITY FIELD
      updateFormulaData(dummyData: Formula[] ,formulaNameDatas: Formula[],
         quantitys:{field:string, type:string,formula:string }[]): void{
          // cost n^3
        quantitys.forEach(quantity =>{
          for(let formulaNameData of  formulaNameDatas){
            // need to check if this already exist,
            // before pushing it to the array

              if(!this.checkAlreadyExist(dummyData, formulaNameData.resourceCode, quantity.field))
                dummyData.push(  new Formula(new Project(formulaNameData.project.id,
                    formulaNameData.project.projectName),
                    formulaNameData.resourceCode,
                    quantity.field,
                    "",
                    quantity.type,
                    1 )
                  );
          }
        });
      }
      checkAlreadyExist(dummyDatas: Formula[], code: string, field: string):boolean{
        for(let dummyData of dummyDatas)
          if(dummyData.resourceCode === code &&  dummyData.columnName === field)
            return true;
        return false;
      }

      // GET ALL DATA FROM THE ARRAY OF FORMULA
      //AND PLACE THEM IN A TWO DIMENSIONAL ARRAY
      convertFromFormulaToMatrix(dummyData: Formula[],
         projects: Set<string>,
         quantitys:{field:string, type:string,formula:string }[])
         :{columns: string[], rows: string[][], types:string[]}{
        //Default set to disable
        const NAME: string= "name";
        // format the row of information by resourceCode
        const newTableRow: string[][] = [];
        // get the column of each
        let tableColumn: string[] = [];
        let tempRow: string[]= [];
        let alltype: string[]=[];

        // remove the name from the set
        projects.delete(NAME);
        // ADD FIRS COLUMN WHICH IS NAME TO THE FORMULA TABLE
        tableColumn.push(NAME);
        alltype.push("text");
         // ADD FIRST ROW
        tempRow = dummyData.filter(fomuladata=>fomuladata.columnName === NAME )
                            .map(formula=> formula.value);
        newTableRow.push(tempRow);

        // SET OF DATA DIDNT EXIST IN TEMPLATE
        for(let project of projects){
          tableColumn.push(project);
          alltype.push("text");
          // get the row of information
          tempRow =  dummyData.filter(fomuladata=>fomuladata.columnName === project )
                              .map(formula=> formula.value);
          newTableRow.push(tempRow);
        }
        //GETTING ROW OF INFORMATION FOR QUANTITY FIELD
        for(let quantity of quantitys){
          tableColumn.push(quantity.field);
          alltype.push(quantity.type);
          tempRow =  dummyData.filter(fomuladata=>fomuladata.columnName === quantity.field )
                              .map(formula=> formula.value);
          newTableRow.push(tempRow);
        }

        // console.log(tableColumn);
        // console.log(newTableRow);

        return {columns:tableColumn , rows:newTableRow, types:alltype};

      }




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

      findMaxRowLength(oddMatrix: string[][]): Number{
        let maxRow = 0;
        for(let rows of oddMatrix){
          maxRow = Math.max(rows.length,maxRow);
        }
        return maxRow;
      }


      getArithmetic(algorithm: string, columnName:Set<string>):string []{
        let arithmetic:string []  = [];
        this.destructorAlgorithm(algorithm,columnName,arithmetic);

        return arithmetic;
      }


      destructorAlgorithm(algorithm: string, quantitySet:Set<string>,storeArithmetic: string[]):{message:string, valid:boolean}{
      let beforeAndAfterString: any= {};

      //FIND A WAY YO SEPERATE THE VALUES PEACE BY PIECE
      if(algorithm.length === 0){
        return  {message: "You'r formula are validated", valid: true};
      }

        let index =  this.findIndexOfArithmeticOperation(algorithm);
        beforeAndAfterString=  this.getValueBeforeAndAfterArithmeticOperation(algorithm, index);
          storeArithmetic.push(beforeAndAfterString.before);
          if(beforeAndAfterString.operation.length > 0)
            storeArithmetic.push(beforeAndAfterString.operation);
          // console.log(beforeAndAfterString);
        return this.destructorAlgorithm(beforeAndAfterString.after,quantitySet, storeArithmetic);

    }


// temperaryStoreTable
    getArithmeticNumber(tableRow: string[], arithmetic: string[], columnNames: string[]): string{
      let currentvalue: number= 0;
      let operation= "";
      let fieldsEmpty: boolean =false;
      // console.log(tableRow, arithmetic, columnNames);
      // GET THE INDEX OF EACH ONE IN ORDER
      arithmetic.forEach( arithmeticString =>{
        // console.log(arithmeticString);
        if( arithmeticString === "+" ||
            arithmeticString === "*" ||
            arithmeticString === "/" ||
            arithmeticString === "-"  ){
              operation = arithmeticString;
              // console.log("operation " + operation);
              //  IF THERE IS A NUMBER IN THE FORMULA
            }else if(this.isNumber(arithmeticString)){
                if(operation === ""){
                  currentvalue = Number(arithmeticString);
                }else{
                currentvalue = this.arithmeticOperation(operation,currentvalue,  Number(arithmeticString) );
                operation= "";
              }
            } else{
              // LOOPS THROUGH THE COLUMB FOR THE INDEX OF THE STRING FROM  FORMULA
              columnNames.forEach( (column, colidx)=>{
                // WHEN THE STRING MATCHES
                if(column === arithmeticString){
                  if(tableRow[colidx] === "") fieldsEmpty = true;
                  if(operation === "") {currentvalue = Number(tableRow[colidx]); }
                  else{
                    currentvalue= this.arithmeticOperation(operation,currentvalue,   Number(tableRow[colidx]) );
                    operation= "";
                    // console.log("currentValue : "+ currentvalue);
                  }
                  // console.log("currentValue : "+ currentvalue);
                  // currentvalue= this.arithmeticOperation(operation,currentvalue,   Number(tableRow[colidx]) );
                  // operation= "";
                  // console.log("currentValue : "+ currentvalue);
                }

              });
            }



      });

      if(!fieldsEmpty)
        return String(currentvalue);
      else
        return "";
    }


    arithmeticOperation(operation:string, currentvalue: number, tableValue:number):number{
      // console.log(operation);
      switch(operation){
        case "+": currentvalue+=tableValue;break;
        case "-": currentvalue-=tableValue;break;
        case "*": currentvalue*=tableValue; break;
        case "/": currentvalue/=tableValue;break;
        default: console.log("ERROR WITH SWITCH CASE");
      }
      // console.log("operation : " + operation);
      // console.log("arithOper : "+ currentvalue);
      return currentvalue;
    }


    // if(arithmeticString === column){
    //   // GET THE VALUE IN THE TABLE AN DO THE ACCOCIATED OPERATION
    //   currentvalue +=  tableRow[colidx];
    //   currentvalue -=  tableRow[colidx];
    //   currentvalue /=  tableRow[colidx];
    //   currentvalue =  tableRow[colidx];
    //
    //
    //
    // }



}



//isNumber
// let count = 0;
// for(let i =0 ; i<number.length; i++){
//   if(number[i]=== ".")
//     count++;
//     if(count > 1) return false;
// }
//
// // count the amount of decimal points
// for(let i =0; i< number.length ; i++){
//   if(!(number.charCodeAt(i)>= 48 && number.charCodeAt(i)<= 57) && count > 1)
//       return false;
// }
// return true;
