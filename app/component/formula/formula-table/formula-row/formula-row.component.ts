import { Component, OnInit, Input, Output, EventEmitter, DoCheck, OnDestroy  } from '@angular/core';
import { TemplatehandlerService } from '../../../../service/template/template/templatehandler.service';
import { TemplateService } from '../../../../service/template/template.service';
@Component({
  selector: 'app-formula-row',
  templateUrl: './formula-row.component.html',
  styleUrls: ['./formula-row.component.scss']
})
export class FormulaRowComponent implements OnInit ,DoCheck, OnDestroy {
  @Input()  row;
  @Input()  rowidx;
  @Input()  colidx;
  @Input() types: string[];
  @Input() formulas: any;
  @Input() columnName: string[];
  @Input() tableRows:string[];
  @Output() addChangesToTable: EventEmitter <{row:string, rowidx:number, colidx:number}> = new EventEmitter();
  constructor(
        private templateService: TemplateService,
        private templatehandler: TemplatehandlerService
  ) { }

  ngOnInit() {
    // this.formulaTable = this.templateService.getPaginatedRows();
    // console.log("each table show is seperate ");
    // console.log(this.tableRows);
  }


  // WHEN THE USER CHANGES HIS INFORMATION ITS EMMITTED TO THE ARRAY
  onChangenput(event){    // console.log(rowidx, colidx);
    if(this.types[this.colidx] === "formula"){
    //   console.log(
    //     this.templatehandler.getArithmeticNumber(
    //     this.tableRows,
    //      this.templatehandler.getArithmetic(this.formulas [this.columnName[this.colidx] ], new Set(this.columnName)),
    //      this.columnName
    //    ));
    }
    // if(this.types[this.colidx] === "formula"){


      // console.log(
      //   this.templatehandler.getArithmetic(this.formulas [this.columnName[this.colidx] ], new Set(this.columnName))
      // );
    // }
    // console.log(this.formulaTable);
    // console.log(new Set(this.columnName));
    // console.log(this.formulas [this.columnName[this.colidx] ]);
    // console.log(" the type is :"+this.types[this.colidx])
    // console.log(this.row);
    this.addChangesToTable.emit({row:this.row,rowidx: this.rowidx, colidx:this.colidx});

  }
  ngDoCheck(){
      if(this.types[this.colidx] === "formula"){
          this.row =
                this.templatehandler.getArithmeticNumber(
                  this.tableRows,
                  this.templatehandler.getArithmetic(this.formulas [this.columnName[this.colidx] ], new Set(this.columnName)),
                  this.columnName
               );
      }
  }

  ngOnDestroy(){
    // need to pass the information of the table into here
  // this.templateService.updateTable()
  }
}
