import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  data: any;

  constructor(private activeRoute: ActivatedRoute, private router: Router) {
    if(this.router.getCurrentNavigation()?.extras.state) {
      this.data = this.router.getCurrentNavigation()?.extras.state;      
    }
    else {
      this.router.navigate(["/login"]);
    }
  }
}
