import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserManager }                  from '../models/user.manager';
import { AuthService }                  from '../services/auth.service';
import { Subscription }                 from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit, OnDestroy {
    // ATTRIBUTS + CONSTR + ONINIT + ONDESTROY -----------------------------------------------------------------------------------------------------------------
    user: UserManager;
    userSubscription: Subscription;

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
        this.loadTitle('The Profile');
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }//-----------------------------------------------------------------------------------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // TITLE AND SCRIPTS ----------------------------------------------------------------------------------------------------------------------
    // Permet de charger le titre de la page
    public loadTitle(title) {
        document.getElementsByTagName('title')[0].innerHTML = title;
    }//-----------------------------------------------------------------------------------------------------------------------------------------
}
