# Proyecto ABP – Aplicación de Análisis de Productos con APIs REST

Estudiante: Guillén Jonathan  
Carrera: Tecnicatura en Ciencias de Datos e Inteligencia Artificial  
Materia: Proyecto Integrador 1  
Institución: ISPC – Instituto Superior Politécnico Córdoba  
Año: 2025

---

## Objetivo del Proyecto

Crear una aplicación web utilizando React que permita consumir datos de una API externa, visualizar productos, aplicar filtros dinámicos, mostrar estadísticas detalladas, generar gráficos interactivos y exportar información relevante de forma organizada.

---

## Tecnologías Utilizadas

- React  
- Axios  
- Tailwind CSS  
- Chart.js y react-chartjs-2  
- Vite  
- JavaScript (ES6+)

---

## Funcionalidades del Proyecto

### 1. Búsqueda y filtros dinámicos

- Input para buscar productos por nombre en tiempo real.
- Filtro por categoría con un menú desplegable.
- Ordenamiento por precio o rating, en orden ascendente o descendente.
- Reinicio automático de página al cambiar los filtros.

### 2. Estadísticas generales y por categoría

Se calcula en tiempo real a partir de los productos filtrados:

**Generales:**
- Producto más caro y producto más barato
- Precio total de los productos
- Promedio de descuento
- Promedio de rating
- Títulos con más de 20 caracteres
- Cantidad de productos con stock mayor a 50
- Cantidad de productos con rating mayor a 4.5

**Por categoría:**
- Precio promedio
- Rating promedio
- Producto más caro y más barato por cada categoría

### 3. Visualización con gráficos

La app muestra distintos gráficos actualizados dinámicamente:

- Gráfico de barras: promedio de precios por categoría
- Gráfico de torta: cantidad de productos por categoría
- Gráfico de líneas: promedio de rating por categoría

Se utilizó Chart.js y react-chartjs-2 para la visualización.

### 4. Modo oscuro

- Botón para alternar entre modo claro y oscuro.
- Estilos adaptados con Tailwind usando clases dark para el fondo, texto y formularios.

### 5. Exportación de datos

- Exportación de productos filtrados en formato CSV.
- Exportación de productos filtrados en formato JSON.
- Validación previa: si no hay productos, se muestra un mensaje de advertencia.
- Mensaje de éxito al completar la descarga.

### 6. Paginación de productos

La aplicación muestra los productos paginados, de a 10 por página. Se agregaron controles para navegar entre páginas:

- Botones "Anterior" y "Siguiente"
- Visualización actual de la página y total de páginas
- Reinicio automático a la página 1 al cambiar filtros, búsqueda o criterio de orden

Esto mejora el rendimiento visual y la experiencia de usuario al trabajar con grandes cantidades de productos.

---

## Componentes creados

- `App.jsx`: componente principal que contiene la lógica general del proyecto.
- `ProductList.jsx`: muestra la lista de productos como tarjetas.
- `StatsPanel.jsx`: muestra las estadísticas generales y por categoría.
- `ChartsPanel.jsx`: genera los gráficos con los datos filtrados.
- `main.jsx`: punto de entrada principal de la aplicación.
- `index.css`: estilos base e integración de Tailwind CSS.

---

## Estructura del proyecto

ProyectoDieno/  
├── public/  
├── src/  
│ ├── components/  
│ │ ├── ProductList.jsx  
│ │ ├── StatsPanel.jsx  
│ │ └── ChartsPanel.jsx  
│ ├── App.jsx  
│ ├── main.jsx  
│ └── index.css  
├── vite.config.js  
├── postcss.config.cjs  
├── tailwind.config.js  
├── package.json  
└── README.md  
