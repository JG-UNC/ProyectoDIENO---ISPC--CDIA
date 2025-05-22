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

Se desarrolló una función que calcula métricas clave en tiempo real:

- Producto más caro (nombre y precio).
- Producto más barato.
- Títulos largos (> 20 caracteres).
- Precio total de productos filtrados.
- Promedio de descuento (`discountPercentage`).

Estas estadísticas se calculan en `App.jsx` y se pasan a `StatsPanel.jsx` como `props`.

---

## 2.Componentes reutilizables

Se creó:

- `ProductList.jsx`: muestra productos.
- `StatsPanel.jsx`: muestra estadísticas.

Ambos componentes son funcionales, sin lógica de estado.

---

### 3.Filtro de búsqueda

- Input filtra productos por título.
- Muestra todos si está vacío.
- Case-insensitive.

```js
const filteredProducts = searchText
  ? products.filter(p =>
      p.title.toLowerCase().includes(searchText.toLowerCase()))
  : products;

---


### 4.Estilos con Tailwind

- Tarjetas: bg-gray-100, shadow, rounded, hover:scale-105.

- Panel stats: bg-blue-50, text-gray-700, rounded.

- Diseño responsive y animaciones suaves.

---