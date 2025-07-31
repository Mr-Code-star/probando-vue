export class User {
    constructor({
                    id = 0,
                    name = '',
                    lastname = '',
                    contact_info = '',
                    password = '',
                    birth_date = null,
                    gender = '',
                    pronoun = null
                } = {}) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.contact_info = contact_info;
        this.password = password;
        this.birth_date = birth_date;
        this.gender = gender;
        this.pronoun = pronoun;
    }
}