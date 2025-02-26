import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/FriendComponents/controller/UsuarioController.php'; // URL de tu API

  constructor(
     private http: HttpClient,
     private router: Router,
     private cookieService: CookieService
    ) {}

  // Método para hacer el login
  login(email: string, password: string): Observable<any> {
    const params = new HttpParams().set('correo', email).set('contrasenia', password);
    return this.http.get<any>(this.apiUrl, { params }).pipe(
      tap((response) => {
        if (response.mensaje === 'Login exitoso') {
          // Guarda solo los datos necesarios en localStorage
          const userData = {
            nombre: response.usuario.nombre,  // Asegurar que tiene nombre
            correo: response.usuario.correo, // Guardar el email
            id: response.usuario.id           // Si tiene un ID, también se puede almacenar
          };
          localStorage.setItem('user', JSON.stringify(userData));
          this.cookieService.set('user', JSON.stringify(userData), 1, '/', 'localhost');
        }
      })
    );
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('user');
    this.cookieService.delete('user', '/', 'localhost'); // Eliminar cookie
    this.router.navigate(['/login']);
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null && this.cookieService.check('user');
  }
  // Obtener usuario desde localStorage o cookies
  getUser(): any {
    const user = localStorage.getItem('user') && this.cookieService.get('user');
    return user ? JSON.parse(user) : null;
  }

  // Método para obtener el correo desde localStorage
  getUserEmail(): string | null {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.correo || null; // Retorna el email o null si no existe
    }
    return null;
  }
}
