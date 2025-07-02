import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { userData } from '../datos'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  constructor(private storage: StorageService) {}

  async ngOnInit() {
    if(!(await this.storage.has("usuarios"))) { // no hay datos      
      await this.storage.set("usuarios", userData.users);
    }
  }
}
