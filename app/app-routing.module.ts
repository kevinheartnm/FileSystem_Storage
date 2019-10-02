import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashComponent } from './component/splash/splash.component';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { ProjectComponent } from './component/project/project/project.component';
import { TemplateComponent } from './component/template/template/template.component';
import { CreateComponent } from './component/create/create/create.component';
import { FormulaComponent } from './component/formula/formula/formula.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
    { path: '', redirectTo:"login" , pathMatch:'full'},
    { path: 'register',      component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'profile/project', component:  ProjectComponent, canActivate :[AuthGuard]},
    { path: 'profile/create',      component:  CreateComponent, canActivate :[AuthGuard]},
    { path: 'profile/template',      component:  TemplateComponent, canActivate :[AuthGuard]},
    { path: 'profile/formula',      component:  FormulaComponent, canActivate :[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
