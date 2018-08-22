import { AppareilManager } from '../models/appareil.manager';
import { Subject }         from 'rxjs';


export class AppareilService {
    appareilsSubject = new Subject<any[]>();

    private appareils = [
        new AppareilManager(1, 'TV'),
        new AppareilManager(2, 'PS4'),
        new AppareilManager(3, 'Micro-ondes')
    ];

    // Emet une copie de l'array appareils  (en usant la méthode slice() on émet seulement la copie)--------------------------------------
    emitAppareilsSubject() {
        this.appareilsSubject.next(this.appareils.slice());
    }//------------------------------------------------------------------------------------------------------------------------------------
    // Allume tous les appareils ---------------------------------------------------------------------------------------------------------------------
    switchAllON() {
        for(let machine of this.appareils) {
            machine.status = 'ON';
            this.emitAppareilsSubject();
        }
    }//------------------------------------------------------------------------------------------------------------------------------------
    // Eteint tous les appareils -----------------------------------------------------------------------------------------------------------
    switchAllOFF() {
        for(let machine of this.appareils) {
            machine.status = 'OFF';
            this.emitAppareilsSubject();
        }
    }//------------------------------------------------------------------------------------------------------------------------------------
    // Allume un appareil -----------------------------------------------------------------------------------------------------------
    switchON(index: number) {
        this.appareils[index].status = 'ON';
        this.emitAppareilsSubject();
    }//------------------------------------------------------------------------------------------------------------------------------------
    // Eteint un appareil -----------------------------------------------------------------------------------------------------------
    switchOFF(index: number) {
        this.appareils[index].status = 'OFF';
        this.emitAppareilsSubject();
    }//------------------------------------------------------------------------------------------------------------------------------------
    // Retourne l'appareil en fonction de l'id fourni (pour accéder à la page single-appareil-component) -----------------------------------------------------------------------------------------------------------
    getMachineByID(machineId: number) {
        const machine = this.appareils.find((s) => {
            return s.id === machineId;
        });
        return machine;
    }//------------------------------------------------------------------------------------------------------------------------------------
    // Retourne la class de la liste li d'appreils -----------------------------------------------------------------------------------------------------------
    getClass(index: number) {
        return this.appareils[index].status === 'ON' ? 'list-group-item list-group-item-success' : 'list-group-item';
    }//------------------------------------------------------------------------------------------------------------------------------------
    // Permet d'enregistrer une nouvelle machine -----------------------------------------------------------------------------------------------------------
    // => On attribue le bon ID à la nouvelle machine + une date de création et on l'ajoute à l'array des machines
    saveThisMachine(machine: AppareilManager) {
        machine.id           = this.appareils[this.appareils.length - 1].id + 1;
        machine.purchaseDate = new Promise((resolve, reject) => {
            const date = new Date;
            setTimeout(() => {
                resolve(date);
            }, 3000);
        });
        this.appareils.push(machine);
        this.emitAppareilsSubject();
    }//------------------------------------------------------------------------------------------------------------------------------------
    // Permet d'enregistrer une nouvelle machine -----------------------------------------------------------------------------------------------------------
    // => On attribue le bon ID à la nouvelle machine + une date de création et on l'ajoute à l'array des machines
    updateThisMachine(machine: AppareilManager) {
        // On recupère l'index
        const machineIndex = this.appareils.findIndex((s) => {
            return s.id === machine.id;
        });
        // On met à jour la machine et on emet la copie
        this.appareils[machineIndex].name    = machine.name;
        this.appareils[machineIndex].content = machine.content;
        this.appareils[machineIndex].status  = machine.status;
        this.emitAppareilsSubject();
    }//------------------------------------------------------------------------------------------------------------------------------------
}
