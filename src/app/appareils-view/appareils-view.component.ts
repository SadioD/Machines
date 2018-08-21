import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription }                 from 'rxjs';
import { AppareilService }              from '../services/appareil.service';

@Component({
  selector: 'app-appareils-view',
  templateUrl: './appareils-view.component.html',
  styleUrls: ['./appareils-view.component.css']
})
export class AppareilsViewComponent implements OnInit, OnDestroy {
    appareils: any[];
    appareilSubscription: Subscription;

    constructor(private appareilService: AppareilService) { }

    // Cette méthode est appelée lors d'initialisation du component
    ngOnInit() {
        this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
            (machines: any[]) => {
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
    }

    // Allume tous les appareils
    onSwitchAllON() {
        this.appareilService.switchAllON();
    }
    // Eteint tous les appareils
    onSwitchAllOFF() {
        this.appareilService.switchAllOFF();
    }

}
