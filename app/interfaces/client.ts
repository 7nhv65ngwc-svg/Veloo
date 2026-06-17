

export interface IClient {
    readonly id?: number, // IDENTIFICADOR PRIMÁRIO
    name: string, // NOME COMPLETO
    document: string, // DOCUMENTO (CPF)
    email: string, // EMAIL
    phone: string, // TELEFONE
    dateofbirth?: Date, // DATA DE NASCIMENTO
    address: Array<IAddres>, // VÁRIOS ENDEREÇOS
}

export enum ECustomerRegistrationSteps {
    STEP01, // EMAIL
    STEP02, // NAME, DOCUMENT, DATA OF BIRTH, PHONE
    STEP03, // ADDRESS
    STEP04, // PASSWORD
    OVERVIEW
}

export type TCustomerRegister = Partial<IClient & {
    password: string
}>
