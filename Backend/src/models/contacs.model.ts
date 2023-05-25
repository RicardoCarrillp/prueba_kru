class Contacts {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    birthday: string;
    address: string;
    typeContact: string;
    origin: string;
    constructor(name: string, lastName: string, email: string, phone: string, birthday: string,
        address: string, typeContact: string, origin: string) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.birthday = birthday;
        this.address = address;
        this.typeContact = typeContact;
        this.origin = origin;
    }
} 