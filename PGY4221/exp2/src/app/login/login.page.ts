import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { userData } from '../datos'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  randomFact: string = '';

  constructor(
    private storage: StorageService,
    private http: HttpClient,
  ) {}

  async ngOnInit() {
    if(!(await this.storage.has("usuarios"))) { // no hay datos      
      await this.storage.set("usuarios", userData.users);
    }    

    this.http.get(
      'https://meowfacts.herokuapp.com/'/*,
      {
        headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')
      }*/
    ).subscribe({
      next: (res: any) => {
        this.randomFact = res.data[0];
      }
    });
  }
}
