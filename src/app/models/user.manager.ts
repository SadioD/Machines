export class UserManager {
    id:     number;
    name:   string;
    email:  string;
    status: boolean;

    constructor(_id: number, _name: string) {
        this.id     = _id;
        this.name   = _name;
        this.email  = 'dialloamadou1@yahoo.fr';
        this.status = false;
    }
    
}
