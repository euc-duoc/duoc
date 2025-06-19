import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.page.html',
  styleUrls: ['./nueva.page.scss'],
  standalone: false
})
export class NuevaPage implements OnInit {
  numero: Number = 0;

  constructor(private storage: StorageService) { }

  async ngOnInit() {
    this.numero = await this.storage.obtener();
  }

  async actualizar() {
    this.numero = await this.storage.incrementar();
  }
}
