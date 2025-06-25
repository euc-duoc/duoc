import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-nueva3',
  templateUrl: './nueva3.page.html',
  styleUrls: ['./nueva3.page.scss'],
  standalone: false
})
export class Nueva3Page implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  nuevoUser: any = {};

  constructor(private http: HttpClient, private alertController: AlertController) { }

  ngOnInit() {
    this.actualizarUsuarios();
  }

  actualizarUsuarios() {
    this.http.get('http://localhost:3000/users/').subscribe({
      next: (res: any) => {
        console.log(res.users)
        this.users = res.users;
      }
    });
  }

  activarModificar(idUser: Number) {
    for(let i in this.users) {
      if(this.users[i].id == idUser) {
        this.selectedUser = {
          id: this.users[i].id,
          name: this.users[i].name,
          email: this.users[i].email
        };
      }
    }
  }

  desactivarModificar() {
    this.selectedUser = null;
  }

  eliminar(idUser: Number) {
    this.http.delete(
      'http://localhost:3000/users/' + idUser
    ).subscribe({
      next: async () => {
        const alert = await this.alertController.create({
          message: 'Usuario eliminado correctamente.',
          buttons: ['OK'],
        });

        await alert.present();
        this.actualizarUsuarios();
      }
    });
  }

  async modificarSeleccionado() {
    if(!this.selectedUser.name) {
      const alert = await this.alertController.create({
        message: 'Debe ingresar un nombre de usuario.',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    if(!this.selectedUser.email) {
      const alert = await this.alertController.create({
        message: 'Debe ingresar un Email.',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    this.http.put(
      'http://localhost:3000/users/' + this.selectedUser.id,
      {
        name: this.selectedUser.name,
        email: this.selectedUser.email
      }
    ).subscribe({
      next: async () => {
        const alert = await this.alertController.create({
          message: 'Usuario modificado correctamente.',
          buttons: ['OK'],
        });

        await alert.present();
        this.selectedUser = null;
        this.actualizarUsuarios();
      }
    });
  }

  async agregarNuevo() {
    if(!this.nuevoUser.name) {
      const alert = await this.alertController.create({
        message: 'Debe ingresar un nombre de usuario.',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    if(!this.nuevoUser.email) {
      const alert = await this.alertController.create({
        message: 'Debe ingresar un Email.',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    this.http.post(
      'http://localhost:3000/users/',
      {
        name: this.nuevoUser.name,
        email: this.nuevoUser.email
      }
    ).subscribe({
      next: async () => {
        const alert = await this.alertController.create({
          message: 'Usuario ingresado correctamente.',
          buttons: ['OK'],
        });

        await alert.present();
        this.nuevoUser = {};
        this.actualizarUsuarios();
      }
    });
  }
}
