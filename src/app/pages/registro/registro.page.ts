import { Component, OnInit } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: 'registro.page.html',
  styleUrls: ['registro.page.scss'],
})
export class RegistroPage implements OnInit {
  username: string | undefined;
  password: string | undefined;
  platform: string | undefined;
  errorMessage: string | undefined;


  constructor(private storage: Storage, private router: Router) {
  }
  async ngOnInit() {
    await this.storage.create();
  }
  async registrarUsuario() {
    if (this.username && this.password) {
      try {
        await this.storage.set('username', this.username);
        await this.storage.set('password', this.password);

        console.log('Usuario registrado correctamente en Ionic Storage');
        alert('Usuario creado con éxito! Ahora serás redirigido a la página para iniciar sesión');
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Error al registrar el usuario en Ionic Storage', error);
        this.errorMessage = 'Ocurrió un error al registrar el usuario: ' + error;
      }
    } else {
      console.warn('Por favor, ingrese un nombre de usuario y una contraseña válidos.');
    }
  }


}
