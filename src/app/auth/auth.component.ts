import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router }                       from '@angular/router';
import { NgForm }                       from '@angular/forms';
import { UserManager }                  from '../models/user.manager';
import { AuthService }                  from '../services/auth.service';
import { Subscription }                 from 'rxjs';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
    // ATTRIBUTS + CONSTR + ONINIT + ONDESTROY -----------------------------------------------------------------------------------------------------------------
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
        this.loadTitle('Authentification');
        this.loadScript('../../assets/js/authForm.js');
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }//-----------------------------------------------------------------------------------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // METHODES ----------------------------------------------------------------------------------------------------------------------
    // Vérifie si l'User est connecté
    isAuth() {
        return this.authService.isAuth();
    }
    // Authentifie l'User
    onlogUserIn(authForm: NgForm) {
        this.authService.logUserIn(authForm.value).then(() => {
            this.router.navigate(['profile']);
        });
    }
    // Déconnecte l'User
    onlogUserOut() {
        this.authService.logUserOut();
    }//-----------------------------------------------------------------------------------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // TITLE AND SCRIPTS ----------------------------------------------------------------------------------------------------------------------
    // Permet de charger des fichiers JS
    public loadScript(url) {
        let node = document.createElement('script');
        node.src = url;
        node.type = 'text/javascript';
        document.getElementsByTagName('body')[0].appendChild(node);
    }
    // Permet de charger le titre de la page
    public loadTitle(title) {
        document.getElementsByTagName('title')[0].innerHTML = title;
    }//-----------------------------------------------------------------------------------------------------------------------------------------
}
