import { Usuario } from "./usuario";

export class Mascota {
    id: number = -1;
    nombre: string = "";
    tipo: string = "";
    sexo: string = "";
    raza: string = "";
    foto: string = "";
    user!: Usuario | null;
}