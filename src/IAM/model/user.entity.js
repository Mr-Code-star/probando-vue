export class User {
    constructor({
        id = 0,
        name = '',
        contact_info = '',
        password = '',
                }={}) {
        this.id = id;
        this.name = name;
        this.contact_info = contact_info;
        this.password = password;
    }
}