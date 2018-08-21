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
    machine: AppareilManager | any;

    constructor(private appareilService: AppareilService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.machine = this.appareilService.getMachineByID(+this.route.snapshot.params['id']);

        // S'il n'existe pas de machines correspondant à l'id recu en GET => on redirige
        if(!this.machine) this.router.navigate(['/machines-list']);
    }

    getStatusClass() {
        return this.machine.status === 'allumé' ? 'list-group-item list-group-item-success' : 'list-group-item';
    }

}
