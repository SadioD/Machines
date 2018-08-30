import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription }                 from 'rxjs';
import { AppareilManager }              from '../models/appareil.manager';
import { AppareilService }              from '../services/appareil.service';

@Component({
  selector: 'app-appareils-view',
  templateUrl: './appareils-view.component.html',
  styleUrls: ['./appareils-view.component.css']
})
export class AppareilsViewComponent implements OnInit, OnDestroy {
    // ATTRIBUTS + CONSTR + ONINIT + ONDESTROY -----------------------------------------------------------------------------------------------------------------
    appareils: AppareilManager[];
    appareilSubscription: Subscription;

    constructor(private appareilService: AppareilService) { }

    // Cette méthode est appelée lors d'initialisation du component
    ngOnInit() {
        this.loadTitle('The Machines List');
        this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
            (machines: AppareilManager[]) => {
                this.appareils = machines;
            },
            (error) => {
                console.log('Une erreur est survenue - ' + error);
            }
        );
        this.appareilService.emitAppareilsSubject();
    }

    // Cette méthode est appelée lors de la destruction du component
    ngOnDestroy() {
        this.appareilSubscription.unsubscribe();
    }//-----------------------------------------------------------------------------------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // METHODS ----------------------------------------------------------------------------------------------------------------------
    // Allume tous les appareils
    onSwitchAllON() {
        this.appareilService.switchAll('ON');
    }
    // Eteint tous les appareils
    onSwitchAllOFF() {
        this.appareilService.switchAll('OFF');
    }//-----------------------------------------------------------------------------------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // TITLE AND SCRIPTS ----------------------------------------------------------------------------------------------------------------------
    // Permet de charger le titre de la page
    public loadTitle(title) {
        document.getElementsByTagName('title')[0].innerHTML = title;
    }//-----------------------------------------------------------------------------------------------------------------------------------------

}
