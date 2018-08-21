import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router }            from '@angular/router';
import { UserManager }       from '../models/user.manager';
import { AuthService }       from '../services/auth.service';
import { Subscription }      from 'rxjs';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
    user: UserManager;
    userSubscription: Subscription;

    constructor(private authService: AuthService, private router: Router) { }

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

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

    // Vérifie si l'User est connecté
    isAuth() {
        return this.authService.isAuth();
    }
    // Authentifie l'User
    onlogUserIn() {
        this.authService.logUserIn().then(() => {
            this.router.navigate(['/profile']);
        });
    }
    // Déconnecte l'User
    onlogUserOut() {
        this.authService.logUserOut();
    }

}
