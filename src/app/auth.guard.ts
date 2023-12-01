import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkAuth();
  }

  async checkAuth(): Promise<boolean | UrlTree> {
    // Verificar si el usuario ha iniciado sesión (por ejemplo, si los datos de inicio de sesión existen en Ionic Storage)
    const isLoggedIn = await this.storage.get('username') !== null;

    if (isLoggedIn) {
      return true; // El usuario tiene acceso a la página
    } else {
      // Redirigir al usuario a la página de inicio de sesión si no ha iniciado sesión
      return this.router.createUrlTree(['/login']);
    }
  }
}
