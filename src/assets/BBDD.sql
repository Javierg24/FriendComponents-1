-- Crear la base de datos
CREATE DATABASE TiendaInformatica;
USE TiendaInformatica;

-- Tabla Usuarios
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Categorías
CREATE TABLE Categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    imagen VARCHAR(255),
    descripcion TEXT
);

-- Tabla Productos
CREATE TABLE Productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    valoracion DECIMAL(3,2) DEFAULT 0.0,
    imagen VARCHAR(255),
    categoria_id INT NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES Categorias(id) ON DELETE CASCADE
);

-- Tabla Opiniones
CREATE TABLE Opiniones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    comentario TEXT NOT NULL,
    valoracion INT CHECK (valoracion BETWEEN 1 AND 5) NOT NULL,
    producto_id INT NOT NULL,
    FOREIGN KEY (producto_id) REFERENCES Productos(id) ON DELETE CASCADE
);

-- Tabla Carrito
CREATE TABLE Carrito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT UNIQUE NOT NULL,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE
);

-- Tabla Productos en Carrito (1:N)
CREATE TABLE Productos_Carrito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carrito_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT DEFAULT 1 NOT NULL,
    FOREIGN KEY (carrito_id) REFERENCES Carrito(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES Productos(id) ON DELETE CASCADE
);


-- Elimina las tablas en el orden que prefieras, ya que las restricciones están desactivadas
DROP TABLE IF EXISTS Productos_Carrito;
DROP TABLE IF EXISTS Carrito;
DROP TABLE IF EXISTS Opiniones;
DROP TABLE IF EXISTS Productos;
DROP TABLE IF EXISTS Categorias;
DROP TABLE IF EXISTS Usuarios;

-- Insertar categorías
INSERT INTO Categorias (nombre, imagen, descripcion) VALUES
('Programas', 'ruta/imagen/programas.jpg', 'Categoría de software y licencias'),
('Móviles', 'ruta/imagen/moviles.jpg', 'Smartphones de última generación'),
('Placas Bases', 'ruta/imagen/placas_bases.jpg', 'Placas base para PCs'),
('Procesadores', 'ruta/imagen/procesadores.jpg', 'Procesadores para equipos avanzados'),
('Ventiladores', 'ruta/imagen/ventiladores.jpg', 'Ventiladores y disipadores de CPU'),
('Memoria RAM', 'ruta/imagen/memoria_ram.jpg', 'Módulos de memoria RAM DDR4 y más'),
('Refrigeración líquida', 'ruta/imagen/refrigeracion_liquida.jpg', 'Sistemas de refrigeración líquida'),
('Fuentes de alimentación', 'ruta/imagen/fuentes.jpg', 'Fuentes de alimentación eficientes'),
('Torres', 'ruta/imagen/torres.jpg', 'Cajas para ensamblar tu PC'),
('Monitores', 'ruta/imagen/monitores.jpg', 'Pantallas de alta calidad y resolución');

-- Insertar productos para cada categoría

-- Programas
INSERT INTO Productos (nombre, descripcion, precio, valoracion, imagen, categoria_id) VALUES
('Microsoft Windows 11 Pro', 'Licencia Permanente - Descarga Digital', 103.99, 4.8, '../../assets/images/productos/mcr11.jpg', 1),
('Microsoft Windows Server 2022 Standard', 'Descarga Digital', 89.99, 4.6, '../../assets/images/productos/mcr22.jpg', 1),
('Microsoft Windows Server 2019 Standard', 'Descarga Digital', 49.99, 4.5, '../../assets/images/productos/mcr19.jpg', 1);

-- Móviles
INSERT INTO Productos (nombre, descripcion, precio, valoracion, imagen, categoria_id) VALUES
('Samsung Galaxy S22', 'Smartphone Android 5G', 799.99, 4.7, '../../assets/images/productos/smsg22.jpg', 2),
('iPhone 13 Pro Max', 'Smartphone Apple con 5G', 1199.99, 4.9, '../../assets/images/productos/iphone13.jpg', 2),
('Xiaomi Mi 11 Ultra', 'Smartphone con cámara avanzada', 649.99, 4.8, '../../assets/images/productos/movil3.jpg', 2);

-- Placas Bases
INSERT INTO Productos (nombre, descripcion, precio, valoracion, imagen, categoria_id) VALUES
('ASUS ROG Strix B550-F', 'Placa base para procesadores AMD', 189.99, 4.7, '../../assets/images/productos/asus.jpg', 3),
('MSI MPG Z590', 'Placa base para procesadores Intel', 229.99, 4.6, '../../assets/images/productos/mpg.jpg', 3),
('Gigabyte X570 AORUS Elite', 'Compatible con PCIe 4.0', 169.99, 4.5, '../../assets/images/productos/placaBase3.jpg', 3);

-- Procesadores
INSERT INTO Productos (nombre, descripcion, precio, valoracion, imagen, categoria_id) VALUES
('Samsung 970 EVO Plus', 'Disco SSD NVMe 1TB', 99.99, 4.9, '../../assets/images/productos/disco1.jpg', 4),
('Crucial MX500', 'Disco SSD SATA 500GB', 69.99, 4.8, '../../assets/images/productos/disco2.jpg', 4),
('WD Black SN850', 'Disco SSD NVMe 2TB', 149.99, 4.7, '../../assets/images/productos/disco3.jpg', 4);

-- Ventiladores
INSERT INTO Productos (nombre, descripcion, precio, valoracion, imagen, categoria_id) VALUES
('Cooler Master Hyper 212', 'Disipador de CPU con ventilador', 39.99, 4.6, '../../assets/images/productos/ventilador1.jpg', 5),
('Noctua NH-D15', 'Disipador de alta eficiencia', 89.99, 4.9, '../../assets/images/productos/ventilador2.jpg', 5),
('Corsair iCUE SP120', 'Ventilador RGB para cajas de PC', 29.99, 4.7, '../../assets/images/productos/ventilador3.jpg', 5);

-- Memoria RAM
INSERT INTO Productos (nombre, descripcion, precio, valoracion, imagen, categoria_id) VALUES
('Corsair Vengeance LPX 16GB', 'DDR4 3200MHz', 79.99, 4.8, '../../assets/images/productos/RAM1.jpg', 6),
('G.Skill Trident Z RGB 32GB', 'DDR4 3600MHz con iluminación RGB', 189.99, 4.9, '../../assets/images/productos/RAM2.jpg', 6),
('Kingston Fury Beast 16GB', 'DDR4 3200MHz', 74.99, 4.7, '../../assets/images/productos/RAM3.jpg', 6);

-- Refrigeración líquida
INSERT INTO Productos (nombre, descripcion, precio, valoracion, imagen, categoria_id) VALUES
('NZXT Kraken X63', 'Kit de refrigeración líquida con iluminación RGB', 149.99, 4.8, '../../assets/images/productos/REF1.jpg', 7),
('Corsair Hydro Series H100i', 'Refrigeración líquida de alto rendimiento', 129.99, 4.7, '../../assets/images/productos/REF2.jpg', 7),
('Cooler Master MasterLiquid ML240L', 'Sistema de refrigeración líquida asequible', 89.99, 4.6, '../../assets/images/productos/REF3.jpg', 7);

-- Fuentes de alimentación
INSERT INTO Productos (nombre, descripcion, precio, valoracion, imagen, categoria_id) VALUES
('Corsair RM850x', 'Fuente de alimentación modular 80+ Gold', 149.99, 4.8, '../../assets/images/productos/FA1.jpg', 8),
('EVGA SuperNOVA 750 G5', 'Fuente de alimentación 80+ Gold', 129.99, 4.7, '../../assets/images/productos/FA2.jpg', 8),
('Thermaltake Smart 500W', 'Fuente de alimentación básica', 49.99, 4.5, '../../assets/images/productos/FA3.jpg', 8);

-- Torres
INSERT INTO Productos (nombre, descripcion, precio, valoracion, imagen, categoria_id) VALUES
('NZXT H510', 'Caja compacta con diseño minimalista', 79.99, 4.7, '../../assets/images/productos/Torre1.jpg', 9),
('Corsair iCUE 4000X RGB', 'Caja con iluminación RGB', 129.99, 4.8, '../../assets/images/productos/Torre2.jpg', 9),
('Cooler Master MasterBox Q300L', 'Caja económica y compacta', 49.99, 4.6, '../../assets/images/productos/Torre3.jpg', 9);

-- Monitores
INSERT INTO Productos (nombre, descripcion, precio, valoracion, imagen, categoria_id) VALUES
('Dell UltraSharp U2723QE', 'Monitor 4K UHD de 27 pulgadas', 649.99, 4.9, '../../assets/images/productos/Monitor1.jpg', 10),
('LG 27GN950-B', 'Monitor gaming 4K con 144Hz', 749.99, 4.8, '../../assets/images/productos/Monitor2.jpg', 10),
('AOC C24G1A', 'Monitor curvo Full HD de 24 pulgadas', 199.99, 4.7, '../../assets/images/productos/Monitor3.jpg', 10);
