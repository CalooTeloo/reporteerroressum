export interface ModReport {
    id: string;
    name: string;
    description: string;
    img: string;
    date: string;
    estado: boolean;
    updatedDate?: string; // Nueva propiedad
    changeHistory?: ChangeLog[];
}

export interface ChangeLog {
    date: string;
    changes: string[];
}