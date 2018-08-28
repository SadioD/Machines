import { AppareilManager }   from '../models/appareil.manager';
import { Subject }           from 'rxjs';
import { NgForm }            from '@angular/forms';
import { Injectable }        from '@angular/core';
import { HttpClient }        from '@angular/common/http';


@Injectable()
export class AppareilService {
    // ATTR + CONSTR + EMIT --------------------------------------------------------------------------------------------------------------
    appareilsSubject = new Subject<AppareilManager[]>();
    appareils: AppareilManager[] = [];

    constructor(private httpClient: HttpClient) {
        this.getMachinesList();
    }

    // Emet une copie de l'array appareils  (en usant la méthode slice() on émet seulement la copie)--------------------------------------
    emitAppareilsSubject() {
        this.appareilsSubject.next(this.appareils);
    }//------------------------------------------------------------------------------------------------------------------------------------
    // METHODS //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Recupère la liste des appareils ----------------------------------------------------------------------------------------------------
    getMachinesList() {
        return new Promise((resolve, reject) => {
            this.httpClient.get('http://homework:800/Frameworks/Angular/premier-projet/apis/codeigniter/machine/getMachinesList').subscribe(
                (response: AppareilManager[]) => {
                    this.appareils = response ? response : [];
                    this.emitAppareilsSubject();
                    resolve(true);
                },
                (error) => {
                    console.log(error);
                }
            );
        });
    }//------------------------------------------------------------------------------------------------------------------------------------------
    // Allume/Eteint tous les appareils -----------------------------------------------------------------------------------------------------------
    switchAll(switched: string) {
        for(let machine of this.appareils) {
            machine.status = switched;
            this.emitAppareilsSubject();
        }
        this.httpClient.get('http://homework:800/Frameworks/Angular/premier-projet/apis/codeigniter/machine/switchALL/' + switched).subscribe(
            (response: any) => { },
            (error)    => { console.log(error) }
        );
    }//------------------------------------------------------------------------------------------------------------------------------------
    // Eteint un appareil -----------------------------------------------------------------------------------------------------------
    switchTHIS(index: number, switched: string) {
        this.appareils[index].status = switched;
        let machineID                = this.appareils[index].id;

        this.emitAppareilsSubject();
        this.httpClient.get('http://homework:800/Frameworks/Angular/premier-projet/apis/codeigniter/machine/switchTHIS/' + machineID+ '/' + switched).subscribe(
            (response: any) => { },
            (error)    => { console.log(error) }
        );
    }//------------------------------------------------------------------------------------------------------------------------------------
    // Retourne l'appareil en fonction de l'id fourni (pour accéder à la page single-appareil-component) -----------------------------------------------------------------------------------------------------------
    getMachineByID(machineId: number)
    {
        return new Promise((resolve, reject) => {
            // En cas de rafraichissement de la page + on recupère d'abord la list
            if(!this.appareils.length) {
                this.getMachinesList().then(() => {
                    resolve(this.findMachine(machineId));
                });
            }
            else { resolve(this.findMachine(machineId)); }
        });
    }//------------------------------------------------------------------------------------------------------------------------------------
    // Retourne la class de la liste li d'appreils -----------------------------------------------------------------------------------------------------------
    getClass(index: number) {
        return this.appareils[index].status === 'ON' ? 'list-group-item list-group-item-success' : 'list-group-item';
    }//------------------------------------------------------------------------------------------------------------------------------------
    // Permet d'enregistrer une nouvelle machine -----------------------------------------------------------------------------------------------------------
    // => On attribue le bon ID à la nouvelle machine + une date de création et on l'ajoute à l'array des machines
    saveThisMachine(machine: NgForm) {
        return new Promise((resolve, reject) => {
            this.httpClient.post('http://homework:800/Frameworks/Angular/premier-projet/apis/codeigniter/machine/addNewMachine', machine).subscribe(
                (response: AppareilManager) => {
                    if(response) {
                        this.appareils.push(response);
                        this.emitAppareilsSubject();
                        resolve(true);
                    }
                    resolve(false);
                },
                (error) => { reject(error); }
            );
        });
    }//------------------------------------------------------------------------------------------------------------------------------------
    // Permet d'enregistrer une nouvelle machine -----------------------------------------------------------------------------------------------------------
    // => On attribue le bon ID à la nouvelle machine + une date de création et on l'ajoute à l'array des machines
    updateThisMachine(machine: AppareilManager) {
        return new Promise((resolve, reject) => {
            // On recupère l'index
            const machineIndex = this.appareils.findIndex((s) => {
                return s.id == machine.id;
            });
            
            // On met à jour la machine + on emet la copie de la liste d'Array
            this.appareils[machineIndex].name    = machine.name;
            this.appareils[machineIndex].content = machine.content;
            this.appareils[machineIndex].status  = machine.status;
            this.emitAppareilsSubject();

            // On met à jour la machine dans la BDD
            this.httpClient.post('http://homework:800/Frameworks/Angular/premier-projet/apis/codeigniter/machine/updateMachine', machine).subscribe(
                (response: any) => {  response ? resolve(true) : resolve(false)  },
                (error)         => {  reject(error) }
            );
        });
    }//------------------------------------------------------------------------------------------------------------------------------------
    // Permet de supprimer une machine -----------------------------------------------------------------------------------------------------------
    // => On attribue le bon ID à la nouvelle machine + une date de création et on l'ajoute à l'array des machines
    deleteThisMachine(machine: AppareilManager) {
        // On recupère l'index
        const machineIndex = this.appareils.findIndex((s) => {
            return s.id === machine.id;
        });
        // On supprime la machine et on emet la copie de la liste d'Array
        // La methode splice prend l'index à partir duquel la suppression sera faite + le nbre d'éléments à supprimer
        this.appareils.splice(machineIndex, 1);
        this.emitAppareilsSubject();
    }//------------------------------------------------------------------------------------------------------------------------------------
    // EVITE DUPLICATION CODE /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Permet de trouver une machine dans la liste d'Array ------------------------------------------------------------------------------------------------------------------------------------
    findMachine(machineId) {
        const machine = this.appareils.find((s) => {
            return s.id === machineId;
        });
        return machine;
    }//------------------------------------------------------------------------------------------------------------------------------------
}
