import { AppareilManager } from '../models/appareil.manager';
import { Subject }         from 'rxjs';


export class AppareilService {
    appareilsSubject = new Subject<any[]>();

    private appareils = [
        new AppareilManager(1, 'TV'),
        new AppareilManager(2, 'PS4'),
        new AppareilManager(1, 'Micro-ondes')
    ];

    // Emet une copie de l'array appareils  (en usant la méthode slice() on émet seulement la copie)
    emitAppareilsSubject() {
        this.appareilsSubject.next(this.appareils.slice());
    }

    // Allume tous les appareils
    switchAllON() {
        for(let machine of this.appareils) {
            machine.status = 'allumé';
            this.emitAppareilsSubject();
        }
    }
    // Eteint tous les appareils
    switchAllOFF() {
        for(let machine of this.appareils) {
            machine.status = 'éteint';
            this.emitAppareilsSubject();
        }
    }
    // Allume un appareil
    switchON(index: number) {
        this.appareils[index].status = 'allumé';
        this.emitAppareilsSubject();
    }
    // Eteint un appareil
    switchOFF(index: number) {
        this.appareils[index].status = 'éteint';
        this.emitAppareilsSubject();
    }
    // Retourne l'appareil en fonction de l'id fourni (pour accéder à la page single-appareil-component)
    getMachineByID(machineId: number) {
        const machine = this.appareils.find((s) => {
            return s.id === machineId;
        });
        return machine;
    }
    // Retourne la class de la liste li d'appreils
    getClass(index: number) {
        return this.appareils[index].status === 'allumé' ? 'list-group-item list-group-item-success' : 'list-group-item';
    }
}
