import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    footerDate: Promise<number>;

    constructor() { }

    ngOnInit() {
        this.footerDate = new Promise((resolve, reject) => {
            const date = new Date().getFullYear();
            setTimeout(() => {
                resolve(date);
            }, 2000);
        });
    }

}
