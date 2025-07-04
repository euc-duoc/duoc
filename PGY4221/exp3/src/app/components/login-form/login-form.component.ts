import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: false
})
export class LoginFormComponent implements OnInit {
  datos = {
    user: "user",
    pwd: ""
  }

  constructor(
    private router: Router,
    private storage: StorageService
  ) {}

  showErr(errMsg: String) {
    const errorElem: HTMLElement | null = document.getElementById('errCont');

    if(errorElem != null) {
      const msgElem = document.createTextNode(errMsg.toString());
      const itemElem = document.createElement("li");
      itemElem.appendChild(msgElem);
      errorElem.appendChild(itemElem)     
    }
  }

  clearErrs() {
    const errorElem: HTMLElement | null = document.getElementById('errCont');

    if(errorElem != null)
      errorElem.innerHTML = '';
  }

  async validateInputs () {
    const nombreInput: HTMLInputElement  = <HTMLInputElement>document.getElementById('nombreUsuario');
    const passwordInput: HTMLInputElement = <HTMLInputElement>document.getElementById('password');
    let valid = true;

    if(nombreInput?.value === '') {
      this.showErr("Debe ingresar un nombre de usuario");
      valid = false;
    }

    if(passwordInput?.value.length < 4) {
      this.showErr("La contraseña debe tener al menos 4 caracteres.");
      valid = false;
    }

    if(valid) {
      let usuarioExiste = await this.validateInputsStorage(nombreInput, passwordInput);

      if(!usuarioExiste) {
        this.showErr("No se encuentra un usuario con dicha contraseña.");
        valid = false;
      }
    }    
  
    return valid;
  };

  private async validateInputsStorage(nombreInput: HTMLInputElement, passwordInput: HTMLInputElement) {
    if(this.storage != null) {
        let datosUsuarios = await this.storage.get("users");

      if(datosUsuarios) {
        for(let i in datosUsuarios) {
          if(datosUsuarios[i].user == nombreInput?.value && datosUsuarios[i].pass == passwordInput?.value)
            return true;
        }
      }
    }
      
    return false;    
  }
  
  ngOnInit() {}

  async iniciar() {
    this.clearErrs();

    if(!await this.validateInputs())
      return;

    let navExtras: NavigationExtras = {
      state: {
        user: this.datos.user
      }
    };

    this.router.navigate(['/home'], navExtras)
  }
}
