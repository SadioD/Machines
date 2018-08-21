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

        this.loadScript('../../assets/js/test.js');
        this.loadTitle('Profile');
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

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
    }
}
