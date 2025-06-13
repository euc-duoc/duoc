import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { userData } from '../datos'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  username: String = '';
  mascotas: Array<Number> = [];
  state: any;

  constructor(private router: Router) {
    if(this.router.getCurrentNavigation()?.extras.state)
      this.state = this.router.getCurrentNavigation()?.extras.state;
    else
      this.router.navigate(["/login"]);
  }

  ngOnInit() {
    console.log(this.state);
    this.username = this.state['user'];
        
    for(let i in userData.users) {
      if(userData.users[i].user == this.username)
        this.mascotas = userData.users[i].mascotas;
    }
  }
}
