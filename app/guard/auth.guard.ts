import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user/user.service'

@Injectable({
  providedIn: 'root'
})

/*   ng g guard app/guard/auth */
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ){}

  canActivate():boolean {
    if(this.userService.loggedIn()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
