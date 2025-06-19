import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.page.html',
  styleUrls: ['./portada.page.scss'],
  standalone: false
})
export class PortadaPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irAHome() {
    this.router.navigate(['/home']);
  }
}
