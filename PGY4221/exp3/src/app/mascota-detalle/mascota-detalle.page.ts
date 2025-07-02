import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userData } from '../datos'

@Component({
  selector: 'app-mascota-detalle',
  templateUrl: './mascota-detalle.page.html',
  styleUrls: ['./mascota-detalle.page.scss'],
  standalone: false
})
export class MascotaDetallePage implements OnInit {
  mascotaInfo: any = {};
  state: any;

  constructor(private route: ActivatedRoute, private router: Router) { 
    if(!this.router.getCurrentNavigation()?.extras.state)
      this.router.navigate(["/login"]);
    else
      this.state = this.router.getCurrentNavigation()?.extras.state;
  }
  
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    for(let i in userData.mascotas) {
      if(userData.mascotas[i].id == Number(id))
        this.mascotaInfo = userData.mascotas[i];
    }
  }

  volverAlHome() {
    this.router.navigate(['/home'], { state : this.state });
  }
}
