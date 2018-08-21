import { Component, Input, OnInit } from '@angular/core';
import { AppareilManager }          from '../../models/appareil.manager';
import { AppareilService }          from '../../services/appareil.service';

@Component({
  selector: 'app-appareils-list',
  templateUrl: './appareils-list.component.html',
  styleUrls: ['./appareils-list.component.css']
})
export class AppareilsListComponent implements OnInit {
    @Input() appareil: AppareilManager;
    @Input() index:    number;

    constructor(private appareilService: AppareilService) { }

    ngOnInit() { }

    // Allume un appareil
    onSwitchON() {
        this.appareilService.switchON(this.index);
    }
    // Eteint un appareil
    onSwitchOFF() {
        this.appareilService.switchOFF(this.index);
    }

}
