import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// service
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// , HTTP_INTERCEPTORS
import { UserService } from './service/user/user.service';
import { HandlerService } from './service/handler/handler.service';
import { ProjectService } from './service/project/project.service';
import { CreateService } from './service/create/create.service';
import { TemplateService } from './service/template/template.service';
import { TemplatehandlerService } from './service/template/template/templatehandler.service';
import { AuthGuard } from './guard/auth.guard';
import { TokenService } from './service/token/token.service';
// import { H}
// import {FileUploadModule} from 'ng2-file-upload';

//Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { ProjectComponent } from './component/project/project/project.component';
import { TableComponent } from './component/project/table/table.component';
import { TableHeadComponent } from './component/project/table-head/table-head.component';
import { SplashComponent } from './component/splash/splash.component';
import { TemplateComponent } from './component/template/template/template.component';
import { ProjectRowsComponent } from './component/template/project-rows/project-rows.component';
import { ButtonComponent } from './component/template/button/button.component';
import { QuantityComponent } from './component/template/quantity/quantity.component';
import { QuantityRowComponent } from './component/template/quantity-row/quantity-row.component';
import { PaginationComponent } from './component/project/pagination/pagination.component';
import { CreateComponent } from './component/create/create/create.component';
import { DropdownComponent } from './component/create/dropdown/dropdown.component';
import { TablesComponent } from './component/create/tables/tables.component';
import { ResourceTableComponent } from './component/create/resource-table/resource-table.component';
import { ProjectTableComponent } from './component/create/project-table/project-table.component';
import { TemplateProjectComponent } from './component/template/template-project/template-project.component';
import { FormulaComponent } from './component/formula/formula/formula.component';
import { FormulaTableComponent } from './component/formula/formula-table/formula-table.component';
import { FormulaPaginationComponent } from './component/formula/formula-pagination/formula-pagination.component';
import { FormulaTableHeadComponent } from './component/formula/formula-table-head/formula-table-head.component';
import { ProjectModComponent } from './component/project/project-mod/project-mod.component';
import { SearchbarComponent } from './component/project/project-header/searchbar/searchbar.component';
import { PlusButtonComponent } from './component/project/project-header/project-button/plus-button/plus-button.component';
import { AddMenuComponent } from './component/project/project-header/add-menu/add-menu.component';
import { ListComponent } from './component/create/resource/list/list.component';
import { ShareComponent } from './component/create/resource/button/share/share.component';
import { ResourceRowComponent } from './component/create/resource/resource-row/resource-row.component';
import { ProfileComponent } from './header/profile/profile.component';
import { CreateProjectComponent } from './component/create/create-project/create-project.component';
import { BinComponent } from './component/create/button/bin/bin.component';
import { TableRowsComponent } from './component/project/table/table-rows/table-rows.component';
import { TableColumnComponent } from './component/project/table/table-column/table-column.component';
import { ProjectEndComponent } from './component/create/project-end/project-end.component';
import { ProjectTableRowComponent } from './component/create/project-table/project-table-row/project-table-row.component';
import { ProjectDropdownComponent } from './component/project/project/project-dropdown/project-dropdown.component';
import { FormulaColumnComponent } from './component/formula/formula-table/formula-column/formula-column.component';
import { FormulaRowComponent } from './component/formula/formula-table/formula-row/formula-row.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    ProjectComponent,
    TableComponent,
    TableHeadComponent,
    SplashComponent,
    TemplateComponent,
    ProjectRowsComponent,
    ButtonComponent,
    QuantityComponent,
    QuantityRowComponent,
    PaginationComponent,
    CreateComponent,
    DropdownComponent,
    TablesComponent,
    ResourceTableComponent,
    ProjectTableComponent,
    TemplateProjectComponent,
    FormulaComponent,
    FormulaTableComponent,
    FormulaPaginationComponent,
    FormulaTableHeadComponent,
    ProjectModComponent,
    SearchbarComponent,
    PlusButtonComponent,
    AddMenuComponent,
    ListComponent,
    ShareComponent,
    ResourceRowComponent,
    ProfileComponent,
    CreateProjectComponent,
    BinComponent,
    TableRowsComponent,
    TableColumnComponent,
    ProjectEndComponent,
    ProjectTableRowComponent,
    ProjectDropdownComponent,
    FormulaColumnComponent,
    FormulaRowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    // FileUploadModule
  ],
  providers: [
    UserService,
    HandlerService,
     ProjectService,
      CreateService,
      TemplateService,
       TemplatehandlerService,
       AuthGuard,
       { provide: HTTP_INTERCEPTORS, useClass: TokenService, multi:true}
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
