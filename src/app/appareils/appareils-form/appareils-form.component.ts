import { Component, OnInit }        from '@angular/core';
import { NgForm }                   from '@angular/forms';
import { Router, ActivatedRoute }   from '@angular/router';
import { NgFlashMessageService }    from 'ng-flash-messages';
import { AppareilManager }          from '../../models/appareil.manager';
import { AppareilService }          from '../../services/appareil.service';

@Component({
  selector: 'app-appareils-form',
  templateUrl: './appareils-form.component.html',
  styleUrls: ['./appareils-form.component.css']
})
export class AppareilsFormComponent implements OnInit {
    // ATTRIBUTS + CONSTR + ONINIT -----------------------------------------------------------------------------------------------------------------
    defaultStatus = 'OFF';
    machine: AppareilManager = new AppareilManager;

    constructor(private appareilService:     AppareilService,
                private router:              Router,
                private route:               ActivatedRoute,
                private flashMessageService: NgFlashMessageService) { }

    ngOnInit() {
        if(this.machineExists()) {
            this.appareilService.getMachineByID(this.route.snapshot.params['id']).then((appareil: AppareilManager) => {
                if(!appareil) {
                    //this.router.navigate(['machines-list/' + this.route.snapshot.params['id']]);
                }
                else {
                    this.loadTitle('Update Machine');
                    this.machine = appareil;
                }
            });
        }
        else {
            this.loadTitle('Add New Machine');
        }
        this.loadScript('../../../assets/js/machinesForm.js');
    }//-----------------------------------------------------------------------------------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // METHODES -------------------------------------------------------------------------------------------------------------------------------
    // Premet de vérifier si l'id a été recue: si OUI => il s'agit d'un UPDATE si NON => il s'agit d'un ADD NEW
    machineExists() {
        return typeof this.route.snapshot.params['id'] === 'undefined' ? false : true;
    }
    //--------------------------------------
    // Enregistre le formulaire
    onSubmit(form: NgForm) {
        if(this.machineExists()) {
            form.value['id'] = +this.route.snapshot.params['id'];
            this.appareilService.updateThisMachine(JSON.parse(JSON.stringify(form.value))).then(
                (response) => { response ? this.redirectUser() : alert('Oups... Une erreur est survenue!'); },
                (error)    => { console.log(error); }
            );
        }
        else {
            this.appareilService.saveThisMachine(JSON.parse(JSON.stringify(form.value))).then(
                (response) => { response ? this.redirectUser() : alert('Oups... Une erreur est survenue!'); },
                (error)    => { console.log(error); }
            );
        }
    }//-----------------------------------------------------------------------------------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // METHODS POUR EVITER DUPLICATION CODE ----------------------------------------------------------------------------------------------------------------------
    // Affiche un message de succès et redirige une fois le formulaire validé
    redirectUser() {
        // On affiche le flash message
        this.flashMessageService.showFlashMessage({
            messages:  ["The form has been successfully registered. You'll be redirected soon..."],
            dismissible: false,
            timeout: false,
            type: 'success'
        });
        // On redirige
        setTimeout(() => {
            if(this.machineExists())  this.router.navigate(['machines-list/' + this.machine.id]);
            else                      this.router.navigate(['machines-list']);
        }, 4000);
    }//-----------------------------------------------------------------------------------------------------------------------------------------
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // TITLE AND SCRIPTS ----------------------------------------------------------------------------------------------------------------------
    // Permet de charger des fichiers JS
    public loadScript(url) {
        let node = document.createElement('script');
        node.src = url;
        node.type = 'text/javascript';
        document.getElementsByTagName('body')[0].appendChild(node);
    }
    // Permet de charger des fichiers CC
    public loadCSS(url) {
        let node = document.createElement('link');
        node.href = url;
        node.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(node);
    }
    // Permet de charger le titre de la page
    public loadTitle(title) {
        document.getElementsByTagName('title')[0].innerHTML = title;
    }//-----------------------------------------------------------------------------------------------------------------------------------------
}
