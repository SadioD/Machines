import { Component, OnInit }         from '@angular/core';
import { ActivatedRoute, Router }    from '@angular/router';
import { AppareilManager }           from '../../models/appareil.manager';
import { AppareilService }           from '../../services/appareil.service';

@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.css']
})

export class SingleAppareilComponent implements OnInit {
    // ATTRIBUTS + CONSTR + ONINIT + ONDESTROY -----------------------------------------------------------------------------------------------------------------
    machine: AppareilManager | any;

    constructor(private appareilService: AppareilService,
                private route:           ActivatedRoute,
                private router:          Router) { }

    ngOnInit() {
        this.machine = this.appareilService.getMachineByID(+this.route.snapshot.params['id']);

        // S'il n'existe pas de machines correspondant à l'id recu en GET => on redirige
        if(!this.machine) this.router.navigate(['/machines-list']);
        this.loadTitle(this.machine.name);
    }//-----------------------------------------------------------------------------------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // METHODS ----------------------------------------------------------------------------------------------------------------------
    // Retourne la classe du status de l'appareil
    getStatusClass() {
        return this.machine.status === 'ON' ? 'list-group-item list-group-item-success' : 'list-group-item';
    }
    // Permet de mettre à jour une machine
    onUpdateMachine() {
        this.router.navigate(['/update-machine/' + this.route.snapshot.params['id']]);
    }
    // Permet de supprimer une machine
    onDeleteMachine() {

    }//-----------------------------------------------------------------------------------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // TITLE AND SCRIPTS ----------------------------------------------------------------------------------------------------------------------
    // Permet de charger le titre de la page
    public loadTitle(title) {
        document.getElementsByTagName('title')[0].innerHTML = title;
    }//-----------------------------------------------------------------------------------------------------------------------------------------
}
