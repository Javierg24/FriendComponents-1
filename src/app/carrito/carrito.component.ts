// carrito.component.ts
import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../servicios/carrito.service';
import { CantidadCarritoService } from '../servicios/cantidad-carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];
  usuarioId!: number;
  carritoId!: number;

  constructor(
    private carritoService: CarritoService,
    private cartCountService: CantidadCarritoService
  ) { }

  ngOnInit(): void {
    // Obtener el ID del usuario desde localStorage (suponiendo que el objeto usuario está guardado)
    const usuario = JSON.parse(localStorage.getItem('user') || '{}');
    if (usuario && usuario.id) {
      this.usuarioId = usuario.id;
    } else {
      console.error('No se encontró el usuario en localStorage');
    }
    this.cargarCarrito();
  }

  // Cargar productos del carrito desde el backend
  cargarCarrito() {
    this.carritoService.obtenerCarrito(this.usuarioId).subscribe(
      (data) => {        
        if (data.length > 0 && data[0].carrito_id) {
          this.carritoId = data[0].carrito_id; // Asigna el ID del carrito
        }
        this.carrito = data.map((item: any) => ({
          cart_id: item.carrito_id,
          id: item.id,
          nombre: item.nombre,
          precio: parseFloat(item.precio),
          cantidad: item.cantidad,
          imagen: item.imagen || '../../assets/images/productos/default.jpg'
        }));
        // Actualizar el contador (suma total de unidades)
        this.actualizarContador();
      },
      (error) => console.error('Error al cargar el carrito', error)
    );
  }

  // Sumar todas las cantidades del carrito
  actualizarContador() {
    const total = this.carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    this.cartCountService.updateCartCount(total);
  }

  // Agregar una unidad y actualizar en el backend
  agregarUnidad(index: number) {
    const producto = this.carrito[index];
    producto.cantidad++;
    this.carritoService.actualizarCantidad(this.usuarioId, producto.id, producto.cantidad).subscribe(
      () => {        
        this.actualizarContador();
      },
      (error) => console.error('Error al actualizar la cantidad del producto', error)
    );
  }

  // Quitar una unidad y actualizar en el backend; si la cantidad llega a 0 se elimina el producto
  quitarUnidad(index: number) {
    const producto = this.carrito[index];
    if (producto.cantidad > 1) {
      producto.cantidad--;
      this.carritoService.actualizarCantidad(this.usuarioId, producto.id, producto.cantidad).subscribe(
        () => {          
          this.actualizarContador();
        },
        (error) => console.error('Error al actualizar la cantidad del producto', error)
      );
    } else if (producto.cantidad === 1) {
      // Si la cantidad es 1, al quitar se establece a 0, eliminando el producto
      this.carritoService.actualizarCantidad(this.usuarioId, producto.id, 0).subscribe(
        (response) => {        
          // Eliminar el producto del arreglo local
          this.carrito.splice(index, 1);
          this.actualizarContador();
        },
        (error) => {
          console.error("Error al eliminar el producto con cantidad 0", error);
        }
      );
    }
  }

  // Eliminar producto del carrito y actualizar en el backend
  eliminarProducto(i: number) {
    const producto = this.carrito[i];
    if (this.usuarioId && producto && producto.id) {
      this.carritoService.eliminarDelCarrito(this.usuarioId, producto.id).subscribe(
        (response) => {          
          this.carrito.splice(i, 1);
          this.actualizarContador();
        },
        (error) => {
          console.error('Error al eliminar el producto del carrito', error);
        }
      );
    }
  }

  // Calcular total del carrito
  getTotal(): number {
    return this.carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  }

  // Realizar pedido (simulación)
  realizarPedido() {
    
    const usuario = JSON.parse(localStorage.getItem('user') || '{}');
    if (!usuario.correo) {
      console.error('El usuario no tiene un email registrado');
      return;
    }
    
    const pedido = {
      email: usuario.correo,
      productos: this.carrito,
      total: this.getTotal()
    };
  
    // Enviar datos al backend
    fetch('http://localhost/FriendComponents/controller/sendMail.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert('Pedido realizado con éxito. Se ha enviado un correo de confirmación.');
    })
    .catch(error => console.error('Error al enviar el correo:', error));
  }
  
}
