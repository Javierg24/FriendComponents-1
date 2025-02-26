import { Component, OnInit } from '@angular/core';
import { CantidadCarritoService } from '../servicios/cantidad-carrito.service';
import { AuthService } from '../servicios/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;
  userName: string | null = null;
  userEmail: string | null = null;

  constructor(
    private cartCountService: CantidadCarritoService, 
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // Suscribirse al BehaviorSubject para actualizar el contador en tiempo real
    this.cartCountService.cartCount$.subscribe(count => {      
      this.cartCount = count;
    });
  
    // Obtener usuario desde el localStorage (o AuthService)
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.userName = parsedUser.nombre || 'Invitado';
      this.userEmail = parsedUser.correo || 'No disponible';
  
      // Verifica que el objeto usuario tenga el id esperado
      if (parsedUser.id) {
        // Cargar la cantidad de productos del carrito
        this.cargarCantidadCarrito(parsedUser.id);
      } else {
        console.error('El objeto usuario no tiene el campo id:', parsedUser);
      }
    }
  }
  
  cargarCantidadCarrito(userId: number) {    
    this.cartCountService.obtenerCantidadCarrito(userId).subscribe(
      (cantidad) => {        
        this.cartCountService.updateCartCount(cantidad);
      },
      (error) => console.error('Error al cargar la cantidad del carrito', error)
    );
  }
  
  logout(): void {
    this.authService.logout();
  }
}
