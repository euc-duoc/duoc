import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: false
})
export class LoginFormComponent  implements OnInit {
  datos = {
    user: "user",
    pwd: ""
  }

  constructor(private router: Router) { }
  ngOnInit() {
    const nombreInput: HTMLElement | null = document.getElementById('nombreUsuario');
    nombreInput?.addEventListener('ionInput', (e) => validate(e))

    const validate = (event: any) => {
      const value = event.target.value;
      const errorNode: HTMLElement | null = document.getElementById('errorNombre');

      if(errorNode != null) {
        if(value === '')
          errorNode.style.display = 'block';
        else
          errorNode.style.display = 'none';
      }
    };
  }

  iniciar() {
    if(this.datos.user === '')
      return;

    let navExtras: NavigationExtras = {
      state: {
        user: this.datos.user,
        pwd: this.datos.pwd
      }
    };

    this.router.navigate(['/home'], navExtras)
  }
}
