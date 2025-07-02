import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { userData } from '../datos'
import { DBService } from '../services/db.service';
import { Mascota } from '../services/mascota';

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

  constructor(private router: Router, private db: DBService) {
    if(this.router.getCurrentNavigation()?.extras.state)
      this.state = this.router.getCurrentNavigation()?.extras.state;
    else
      this.router.navigate(["/login"]);
  }

  async ngOnInit() {
    this.username = this.state['user'];

    this.db.dbState().subscribe(async (res) => { 
      if(res)
        this.mascotas = await this.db.buscarMascotasDeUsuario(this.username);
    });
  }
}
