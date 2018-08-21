import { UserManager } from '../models/user.manager';
import { Subject }     from 'rxjs';

export class AuthService {
    userSubject = new Subject<UserManager>();
    private user: UserManager = new UserManager(1, 'Douze');

    // Emet l'objet User pour les autres components puissent y accéder
    emitUserSubject() {
        this.userSubject.next(this.user);
    }

    // Vérifie si l'user est connecté
    isAuth() {
        return this.user.status;
    }
    // Connecte l'User
    logUserIn() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.user.status = true,
                this.emitUserSubject();
                resolve(this.user.status);
            }, 2000);
        });
    }
    // Déconnecte l'User
    logUserOut() {
        this.user.status = false;
        this.emitUserSubject();
    }
}
