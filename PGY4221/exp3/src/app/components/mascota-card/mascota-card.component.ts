import { Component, Input, OnInit } from '@angular/core';
import { userData } from '../../datos'
import { NavigationExtras, Router } from '@angular/router';
import { Mascota } from '../../services/mascota';

@Component({
  selector: 'app-mascota-card',
  templateUrl: './mascota-card.component.html',
  styleUrls: ['./mascota-card.component.scss'],
  standalone: false
})
export class MascotaCardComponent  implements OnInit {
  @Input() mascota!: Mascota;
  @Input() state: any; 

  constructor(private router: Router) {}

  ngOnInit() {}

  irADetalleMascota() {
    this.router.navigate(['/mascota-detalle/' + this.mascota.id], { state: this.state });
  }
}
