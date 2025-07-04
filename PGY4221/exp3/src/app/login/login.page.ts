import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  storage: StorageService | null = null;

  constructor(storage: StorageService) {
    this.storage = storage;
  }

  async ngOnInit() {}
}
