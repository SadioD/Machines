export class AppareilManager {
    id:             number;
    name:           string;
    content:        string;
    purchaseDate:   Promise<any>;
    status:         string;

    constructor(_id: number, _name: string) {
        this.id = _id;
        this.name = _name;
        this.content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ';
        this.status = 'éteint';
        this.purchaseDate = new Promise((resolve, reject) => {
            const date = new Date();
            setTimeout(() => {
                resolve(date);
            }, 4000);
        });
    }

}
