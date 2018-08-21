import { Component, Input, OnInit } from '@angular/core';
import { AppareilManager }          from '../models/appareil.manager';
import { AppareilService }          from '../services/appareil.service';

@Component({
  selector: 'app-appareils',
  templateUrl: './appareils.component.html',
  styleUrls: ['./appareils.component.css']
})
export class AppareilsComponent implements OnInit {
    @Input() appareils:     AppareilManager;
    @Input() appareilIndex: number;

    constructor(private appareilService: AppareilService) { }

    ngOnInit() {
    }

    // Retourne la class de la liste li d'appreils
    getClass() {
        return this.appareilService.getClass(this.appareilIndex);
    }
}
