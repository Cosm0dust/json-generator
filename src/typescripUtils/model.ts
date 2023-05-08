

export interface ISlot {
    id: number;
    slotName: string;
    arrays?:(buildObject & RandomProps)[]
}

export interface buildObject {
    id?: number;
    name?: string;
    surname?: string;
    fullName?: string;
    property?: string;
    hobbies?: string[];
    slotId?: number;
    birthdate?: string;
}

export type RandomProps = {
    [key: string]: any;
}