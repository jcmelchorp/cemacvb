export interface Inscription {
    id?:string;
    reqState?:string;
    sobrenombre?:string;
    nombres?:string;
    apellido1?:string;
    apellido2?:string;
    address1?:string;
    address2?:string;
    ciudad?:string;
    municipio?:string;
    estado?:string;
    pais?:string;
    postalCode?:string;
    genero?:string;
    email?:string;
    telefono?:string;
    horario?:string;
    referencia?:string;
    emer_name?:string;
    emer_relation?:string;
    emer_telefono?:string;
    ss_name?:string;
    nss?:string;
    alergias?:string;
    padecimientos?:string;
    medicamentos?:string;
    sangre?:string;
    ine?:string;
    recipment?:string;
    photo?:string;
}

export const entitySelectId = 'id';
export const entityCollectionName = 'Inscripcion';
export const pluralizedEntityName = 'inscripciones';
export const entityCollectionEndPoint = pluralizedEntityName;