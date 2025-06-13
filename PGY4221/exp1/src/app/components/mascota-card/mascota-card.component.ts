import { Component, Input, OnInit } from '@angular/core';
import { userData } from '../../datos'
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-mascota-card',
  templateUrl: './mascota-card.component.html',
  styleUrls: ['./mascota-card.component.scss'],
  standalone: false
})
export class MascotaCardComponent  implements OnInit {
  @Input() id : Number = -1;
  @Input() state : any;
  mascotaInfo : any = {};  

  constructor(private router: Router) {}

  ngOnInit() {
    console.log(this.state);

    for(let i in userData.mascotas) {
      if(userData.mascotas[i].id == this.id) {
        this.mascotaInfo =  userData.mascotas[i];
      }
    }
  }

  irADetalleMascota() {
    this.router.navigate(['/mascota-detalle/' + this.id], { state: this.state });
  }
}
