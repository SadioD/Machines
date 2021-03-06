import { UserManager }        from '../models/user.manager';
import { Subject }            from 'rxjs';
import { Injectable }         from '@angular/core';
import { HttpClient }         from '@angular/common/http';


@Injectable()
export class AuthService {
    // ATTR + CONSTR + EMIT SUBJECT ------------------------------------------------------------------------------------------------------------
    userSubject = new Subject<UserManager>();
    private user: UserManager = new UserManager;

    constructor(private httpClient: HttpClient) {  }

    // Emet l'objet User pour les autres components puissent y accéder
    emitUserSubject() {
        this.userSubject.next(this.user);
    }//----------------------------------------------------------------------------------------------------------------------------------------
    // METHODS -----------------------------------------------------------------------------------------------------------------------------
    // Vérifie si l'user est connecté
    isAuth() {
        return new Promise((resolve, reject) => {
            if(sessionStorage.getItem('userId')) {
                this.httpClient.get('api/user/getUser/' + sessionStorage.getItem('userId')).subscribe(
                    (response: UserManager) => {
                        if(response) {
                            this.user = response;
                            this.emitUserSubject();

                            this.user.status === 'ON' ? resolve(true) : resolve(false);
                        }
                        resolve(false);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
            else {
                resolve(false);
            }
        });
    }

    // Connecte l'User (grace à sessionStorage.getItem, setItem, removeItem or clear[vide toyt])
    logUserIn(sessionUser: UserManager) {
        return new Promise((resolve, reject) => {
            this.httpClient.post('api/user/createUser', sessionUser).subscribe(
                (response: UserManager) => {
                    this.user = response;
                    sessionStorage.setItem('userId', this.user.id);

                    this.emitUserSubject();
                    resolve(true);
                },
                (error) => {
                    console.log(error);
                }
            );
        });
    }
    // Déconnecte l'User
    logUserOut() {
        this.httpClient.get('api/user/removeUser/' + sessionStorage.getItem('userId')).subscribe(
            (response: any) => {
                sessionStorage.removeItem('userId');
                this.user.status = 'OFF';
                this.emitUserSubject();
            },
            (error) => {
                console.log(error);
            }
        );
    }//-----------------------------------------------------------------------------------------------------------------------------------------------------
}
