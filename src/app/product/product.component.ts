import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../servicios/producto.service';
import { OpinionService } from '../servicios/opinion.service';
import { CarritoService } from '../servicios/carrito.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  producto: any; // Producto actual seleccionado
  opiniones: any[] = []; // Lista de opiniones del producto
  comentarioForm!: FormGroup; // Formulario reactivo para comentarios
  productoId!: number;
  usuarioId!: number;
  cantidadTotal: number = 0; // Para almacenar la cantidad total de productos en el carrito

  constructor(
    private meta: Meta, 
    private title: Title,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productoService: ProductoService,
    private opinionService: OpinionService,
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    //Meta y título
    this.title.setTitle('Producto');
    this.meta.updateTag({ name: 'description', content: 'Página del producto' });
    this.meta.updateTag({ name: 'keywords', content: 'datos del producto' });

    // Obtener el ID del producto desde la URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productoId = Number(id);
      this.cargarProducto(this.productoId);
      this.obtenerOpiniones(this.productoId);
    }

    // Obtener el ID del usuario desde localStorage (suponiendo que el objeto usuario está guardado)
    const usuario = JSON.parse(localStorage.getItem('user') || '{}');
    if (usuario && usuario.id) {
      this.usuarioId = usuario.id;
      this.obtenerCantidadTotalCarrito(); // Obtener la cantidad total al cargar el componente
    } else {
      console.error('No se encontró el usuario en localStorage');
    }

    // Inicializar el formulario de comentarios
    this.comentarioForm = this.fb.group({
      persona: ['', [Validators.required]],
      mensaje: ['', [Validators.required]],
      nota: [1, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  // Obtener el producto desde la base de datos
  cargarProducto(id: number): void {
    this.productoService.getProductoPorId(id).subscribe(
      (producto) => {
        this.producto = producto;
      },
      (error) => {
        console.error('Error al obtener el producto:', error);
      }
    );
  }

  // Obtener opiniones por producto_id
  obtenerOpiniones(productoId: number): void {
    this.opinionService.getOpinionesPorProducto(productoId).subscribe(
      (opiniones) => {
        this.opiniones = opiniones;
      },
      (error) => {
        console.error('Error al obtener opiniones:', error);
      }
    );
  }

  // Agregar una nueva opinión
  agregarComentario(): void {
    if (this.comentarioForm.valid) {
      const nuevaOpinion = {
        producto_id: this.productoId,
        ...this.comentarioForm.value
      };

      this.opinionService.addOpinion(nuevaOpinion).subscribe(
        () => {
          this.obtenerOpiniones(this.productoId); // Recargar opiniones tras añadir
          this.comentarioForm.reset();
        },
        (error) => {
          console.error('Error al agregar la opinión:', error);
        }
      );
    }
  }

  // Método para agregar al carrito y actualizar la cantidad total
  agregarAlCarrito(): void {
    const cantidad = 1;
    this.carritoService.agregarAlCarrito(this.usuarioId, this.productoId, cantidad).subscribe(
      (response) => {
        alert('¡Producto añadido al carrito!');
        console.log('Producto añadido al carrito:', response);
        this.obtenerCantidadTotalCarrito(); // Actualizar la cantidad total al agregar un producto
      },
      (error) => {
        console.error('Error al añadir el producto al carrito:', error);
      }
    );
  }

  // Método para obtener la cantidad total de productos en el carrito
  obtenerCantidadTotalCarrito(): void {
    this.carritoService.obtenerCantidadTotal(this.usuarioId).subscribe(
      (response) => {
        this.cantidadTotal = response.cantidad_total;
        console.log('Cantidad total de productos en el carrito:', this.cantidadTotal);
      },
      (error) => {
        console.error('Error al obtener la cantidad total del carrito:', error);
      }
    );
  }
}
