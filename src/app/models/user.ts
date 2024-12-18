export class User {
    id?: number;

    department: string = '';
    position:string='';

    firstName: string = '';
    lastName: string = '';

    joinDate?: Date;

    phoneNumber: string = '';

    vacationDays?: number = 0;
    sickDays?: number = 0;

    profileImagePath?: string = '';

    loginDetails?: LoginDetails;
    
    address?: Address;
    
    identityCard?: IdentityCard;
}

export class LoginDetails { 
    id?: number = 0;
    email: string = '';
    password?: string = '';
    role: string = '';
}

export class Address {
    id?: number = 0;
    country: string = '';
    county: string = '';
    city: string = '';
    street: string = '';
    streetNumber: string = '';
    flatNumber: string = '';
    // apartment: string = '';
}

export class IdentityCard {
    id?: number = 0;
    cnp: string = '';
    number: number = 0;
    series: string = '';
    issuer: string = '';
    issuingDate?: Date;
}
