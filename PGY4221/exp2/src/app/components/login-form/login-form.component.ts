import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
//import { userData } from '../../datos'
import { DBService } from 'src/app/services/db.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  //providers:  [ DBService ],
  standalone: false
})
export class LoginFormComponent implements OnInit {
  datos = {
    user: "user",
    pwd: ""
  }  

  // Nota: DBService inyectado
  constructor(
    private router: Router, 
    private db: DBService,
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

  async validateInputs (usarStorage :boolean = false) {
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
      let usuarioExiste = usarStorage ? 
        await this.validateInputsStorage(nombreInput, passwordInput) :
        this.validateInputsDB(nombreInput, passwordInput);

      if(!usuarioExiste) {
        this.showErr("No se encuentra un usuario con dicha contraseña.");
        valid = false;
      }
    }    
  
    return valid;
  };

  private validateInputsDB(nombreInput: HTMLInputElement, passwordInput: HTMLInputElement) {
    return this.db.existeUsuario(nombreInput?.value, passwordInput?.value);
  }

  private async validateInputsStorage(nombreInput: HTMLInputElement, passwordInput: HTMLInputElement) {
    let datosUsuarios = await this.storage.get("usuarios");

    if(datosUsuarios) {
      for(let i in datosUsuarios) {
        if(datosUsuarios[i].user == nombreInput?.value && datosUsuarios[i].pass == passwordInput?.value)
          return true;
      }
    }
      
    return false;    
  }
  
  ngOnInit() {}

  async iniciar(usarStorage :boolean = false) {
    this.clearErrs();

    if(!await this.validateInputs(usarStorage))
      return;

    let navExtras: NavigationExtras = {
      state: {
        user: this.datos.user
      }
    };

    this.router.navigate(['/home'], navExtras)
  }
}
