import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriasService } from '../servicios/categorias-service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  categorias: any[] = [];
  mostrarModal: boolean = false;

  constructor(private router: Router, private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    this.obtenerCategorias();
    this.verificarCookies();
  }

  obtenerCategorias(): void {
    this.categoriasService.getCategorias().subscribe(
      (data) => {
        this.categorias = data;
      },
      (error) => {
        console.error('Error al obtener las categorías', error);
      }
    );
  }

  seleccionarCategoria(categoriaId: number): void {
    this.router.navigate(['../productos', categoriaId]);
  }

  verificarCookies(): void {
    const cookiesAceptadas = localStorage.getItem('cookiesAceptadas');
    if (!cookiesAceptadas) {
      console.log("Mostrando modal y bloqueando scroll"); // Para ver si entra aquí
      this.mostrarModal = true;
      document.body.classList.add("no-scroll"); // Bloquea el scroll
    }
  }
  
  aceptarCookies(): void {
    localStorage.setItem('cookiesAceptadas', 'true');
    this.mostrarModal = false;
    document.body.classList.remove("no-scroll"); // Restaura el scroll
    console.log("Cookies aceptadas, eliminando no-scroll");
  }
  
  rechazarCookies(): void {
    localStorage.removeItem('cookiesAceptadas');
    this.mostrarModal = false;
    document.body.classList.remove("no-scroll"); // Restaura el scroll
    console.log("Cookies rechazadas, eliminando no-scroll");
  }
  
  logout(): void {
    localStorage.removeItem('usuario'); // Borra los datos de usuario
    this.router.navigate(['/login']); // Redirige a la pantalla de login
  }
}
