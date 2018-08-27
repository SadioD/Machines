import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable }                                                       from 'rxjs';
import { AuthService }                                                      from './auth.service';
import { Injectable }                                                       from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise((resolve, reject) => {
            this.authService.isAuth().then((rep) => {
                if(rep) { resolve(true); }
                else  {
                    this.router.navigate(['/authentification']);
                    resolve(false);
                }
            });
        });
    }
}
