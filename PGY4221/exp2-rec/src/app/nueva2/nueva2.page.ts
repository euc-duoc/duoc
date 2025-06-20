import { Component, OnInit } from '@angular/core';
import { DBService } from '../services/db.service';

@Component({
  selector: 'app-nueva2',
  templateUrl: './nueva2.page.html',
  styleUrls: ['./nueva2.page.scss'],
  standalone: false
})
export class Nueva2Page implements OnInit {
  texto: string = '';

  constructor(private db: DBService) { }

  ngOnInit() {
    this.db.dbState().subscribe({
      next: async () => {
        this.texto = await this.db.obtenerTexto()
      }
    });    
  }
}
