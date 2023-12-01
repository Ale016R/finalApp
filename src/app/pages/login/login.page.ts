import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  username: string | undefined;
  password: string | undefined;
  errorMessage: string | undefined;

  constructor(private storage: Storage, private router: Router) { }

  async iniciarSesion() {
    try {
      const storedUsername = await this.storage.get('username');
      const storedPassword = await this.storage.get('password');

      if (this.username === storedUsername && this.password === storedPassword) {

        this.router.navigate(['/perfil']);
      } else {
        this.errorMessage = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      this.errorMessage = 'Ocurrió un error al iniciar sesión: ' + error;
    }
  }
}
