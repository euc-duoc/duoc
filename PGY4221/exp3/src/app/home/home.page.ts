import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from '../services/mascota';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  username: string = '';
  mascotas: Array<Mascota> = [];
  state: any;

  constructor(private router: Router, private storage: StorageService) {
    if(this.router.getCurrentNavigation()?.extras.state)
      this.state = this.router.getCurrentNavigation()?.extras.state;
    else
      this.router.navigate(["/login"]);
  }

  async ngOnInit() {
    this.username = this.state['user'];
    let usersDB = await this.storage.get("users");

    for(let i in usersDB) {
      if(usersDB[i].user == this.username) {
        let mascotasIds = usersDB[i].mascotas;
        this.mascotas = [];
        let mascotasDB = await this.storage.get("mascotas");

        for(let i in mascotasDB) {
          if(mascotasIds.includes(mascotasDB[i].id)) {
            let mascota = new Mascota()
            mascota.id = mascotasDB[i].id;
            mascota.nombre = mascotasDB[i].nombre;
            mascota.tipo = mascotasDB[i].tipo;
            mascota.sexo = mascotasDB[i].sexo;
            mascota.raza = mascotasDB[i].raza;
            mascota.foto = mascotasDB[i].foto;
            this.mascotas.push(mascota)
          }
        }
      }
    }
  }
}
