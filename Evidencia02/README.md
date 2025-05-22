# 📄 EVIDENCIA 2 – Aplicación de React con Axios, Filtros y Estadísticas

**Estudiante**: Guillén Jonathan  
**Carrera**: Tecnicatura en Ciencias de datos e IA
**Materia**: Proyecto Integrador 1
**Institución**: ISPC – Instituto Superior Politécnico Córdoba  
**Año**: 2025  

---

## Objetivo

Evaluar la capacidad del estudiante para:

- Obtener datos de una API utilizando Axios.
- Aplicar filtros dinámicos usando `useState` y `useEffect`.
- Mostrar estadísticas basadas en los datos obtenidos.
- Crear y utilizar componentes reutilizables en React.
- Implementar renderizado condicional y manejo de listas.

---

## Actividades realizadas

## 1.Estadísticas dinámicas agregadas

Se incluyeron más de tres estadísticas dinámicas basadas en los productos filtrados:
Se desarrolló una función que calcula métricas clave en tiempo real:

- Producto más caro (nombre y precio)
- Producto más barato
- Cantidad de títulos con más de 20 caracteres
- Precio total de productos filtrados
- Promedio de descuento (`discountPercentage`)
- Promedio de rating
- Productos con `stock > 50`
- Productos con `rating > 4.5`

Las estadísticas se actualizan automáticamente según el filtro aplicado.

---

## 2.Componentes reutilizables

Se creó:

- `ProductList.jsx`: muestra productos.
- `StatsPanel.jsx`: muestra estadísticas.

Ambos componentes son funcionales, sin lógica de estado.

---

### 3.Validación de búsqueda vacía

- Cuando el campo de búsqueda está vacío, se muestran todos los productos sin errores.
- Las estadísticas se ajustan correctamente al listado completo o filtrado.

---

### 4.Diseño visual

- Aplicación de estilos con **Tailwind CSS**.
- Las tarjetas de productos tienen bordes, padding, sombra y animación en hover.(bg-gray-100, shadow, rounded, hover:scale-105.)
- La sección de estadísticas tiene fondo distinto (`bg-blue-50`) y tipografía clara.
- Modo claro y **modo oscuro** incluido mediante `useRef` y `classList.toggle('dark')`.
- Diseño responsive y animaciones suaves.
---


### 5.Filtro de búsqueda

- Input filtra productos por título.
- Muestra todos si está vacío.
- Case-insensitive.

 ```js
const filteredProducts = searchText
  ? products.filter(p =>
      p.title.toLowerCase().includes(searchText.toLowerCase()))
  : products;
 ```
---
 
### 6.Captura de aplicación

![{75252D44-A0B9-468C-8EDC-7820EEB1DBF7}](https://github.com/user-attachments/assets/9b0d2fdd-c1c4-43bf-b73f-762a9cb81929)


