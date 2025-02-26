import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'http://localhost/FriendComponents/controller/CarritoController.php'; // URL de tu API

  constructor(private http: HttpClient) { }

  // Obtener los productos en el carrito de un usuario
  obtenerCarrito(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?usuario_id=${usuarioId}`);
  }

  // Agregar un producto al carrito
  agregarAlCarrito(usuarioId: number, productoId: number, cantidad: number): Observable<any> {
    const body = { usuario_id: usuarioId, producto_id: productoId, cantidad: cantidad };
    return this.http.post(`${this.apiUrl}`, body);
  }

  // Eliminar un producto del carrito
  eliminarDelCarrito(usuarioId: number, productoId: number): Observable<any> {
    const url = `${this.apiUrl}?usuario_id=${usuarioId}&producto_id=${productoId}`;
    console.log('URL de eliminación:', url);  // Verifica que la URL esté construida correctamente
    return this.http.delete(url);
  }

  // Actualizar la cantidad de un producto en el carrito
  actualizarCantidad(usuarioId: number, productoId: number, cantidad: number): Observable<any> {
    const body = { usuario_id: usuarioId, producto_id: productoId, cantidad: cantidad };
    return this.http.put(`${this.apiUrl}`, body);
  }

  // Calcular el total del carrito de un usuario
  calcularTotal(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/CALCULAR_TOTAL?usuario_id=${usuarioId}`);
  }

  // Obtener la cantidad total de productos en el carrito de un usuario
  obtenerCantidadTotal(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/GET_CANTIDAD_TOTAL?usuario_id=${usuarioId}`);
  }




}
