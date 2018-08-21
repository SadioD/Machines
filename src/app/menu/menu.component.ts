import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserManager }                  from '../models/user.manager';
import { AuthService }                  from '../services/auth.service';
import { Subscription }                 from 'rxjs';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
    userSubscription: Subscription;
    user: UserManager;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.userSubscription = this.authService.userSubject.subscribe(
            (sessionUser: UserManager) => {
                this.user = sessionUser;
            },
            (error) => {
                console.log('Une erreur est survenue - ' + error);
            }
        );
        this.authService.emitUserSubject();
    }

    // Vérifie si l'user est connecté
    isAuth() {
        return this.authService.isAuth();
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}
