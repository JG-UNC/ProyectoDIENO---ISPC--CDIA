import { useEffect, useState, useRef } from 'react'

import axios from 'axios'

import ProductList from './components/ProductList'

import StatsPanel from './components/StatsPanel'

import ChartsPanel from './components/ChartsPanel'

function App() {
  const [productos, setProductos] = useState([])  // Estado que almacena los productos obtenidos de la API.
  const [busqueda, setBusqueda] = useState('')    // Estado para guardar el texto de búsqueda.
  const [mostrarEstadisticas, setMostrarEstadisticas] = useState(true)  // Muestra u oculta la sección de estadísticas.
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas')  // Estado para la categoría filtrada.
  const [orden, setOrden] = useState('')          // Estado que indica el criterio de ordenamiento.
  const [paginaActual, setPaginaActual] = useState(1)  // Estado para la paginación (número de página actual).
  const productosPorPagina = 10                   // Cantidad de productos a mostrar por página.
  const modoOscuro = useRef(false)                // Referencia para act/des modo oscuro.

  const alternarModoOscuro = () => {
    modoOscuro.current = !modoOscuro.current
    document.documentElement.classList.toggle('dark')
  }
  // Alterna el modo claro/oscuro cambiando la clase en el HTML.

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=50')
      .then(res => setProductos(res.data.products))
      .catch(err => console.error(err))
  }, [])
  // Al cargar el componente, hace una llamada a la API para obtener los productos.

  const categorias = ['todas', ...new Set(productos.map(p => p.category))]
  // Genera una lista de categorías únicas a partir de los productos.

  let productosFiltrados = productos.filter(p =>
    p.title.toLowerCase().includes(busqueda.toLowerCase()) &&
    (categoriaSeleccionada === 'todas' || p.category === categoriaSeleccionada)
  )
  // Filtra los productos por texto ingresado y por categoría seleccionada.

  // Aplica ordenamientos según el criterio seleccionado.
  if (orden === 'precio-asc') productosFiltrados.sort((a, b) => a.price - b.price)
  if (orden === 'precio-desc') productosFiltrados.sort((a, b) => b.price - a.price)
  if (orden === 'rating-asc') productosFiltrados.sort((a, b) => a.rating - b.rating)
  if (orden === 'rating-desc') productosFiltrados.sort((a, b) => b.rating - a.rating)

  const calcularEstadisticas = (items) => {
    if (items.length === 0) return null

    const masCaro = items.reduce((max, p) => p.price > max.price ? p : max)
    const masBarato = items.reduce((min, p) => p.price < min.price ? p : min)
    const titulosLargos = items.filter(p => p.title.length > 20).length
    const precioTotal = items.reduce((sum, p) => sum + p.price, 0)
    const descuentoPromedio = items.reduce((acc, p) => acc + p.discountPercentage, 0) / items.length
    const promedioRating = items.reduce((acc, p) => acc + p.rating, 0) / items.length
    const stockAlto = items.filter(p => p.stock > 50).length
    const ratingAlto = items.filter(p => p.rating > 4.5).length

    return {
      masCaro,
      masBarato,
      titulosLargos,
      precioTotal,
      descuentoPromedio: descuentoPromedio.toFixed(2),
      promedioRating: promedioRating.toFixed(2),
      stockAlto,
      ratingAlto,
    }
  }
  // Calcula estadísticas generales a partir de los productos filtrados.

  const calcularEstadisticasPorCategoria = (productos) => {
    const categorias = [...new Set(productos.map(p => p.category))]

    const estadisticas = categorias.map(categoria => {
      const items = productos.filter(p => p.category === categoria)
      if (items.length === 0) return null

      const promedioPrecio = (items.reduce((acc, p) => acc + p.price, 0) / items.length).toFixed(2)
      const promedioRating = (items.reduce((acc, p) => acc + p.rating, 0) / items.length).toFixed(2)
      const masCaro = items.reduce((max, p) => p.price > max.price ? p : max)
      const masBarato = items.reduce((min, p) => p.price < min.price ? p : min)

      return {
        categoria,
        promedioPrecio,
        promedioRating,
        masCaro: { title: masCaro.title, price: masCaro.price },
        masBarato: { title: masBarato.title, price: masBarato.price }
      }
    }).filter(Boolean)

    return estadisticas
  }
  // Agrupa estadísticas por cada categoría de producto.

  const exportarCSV = () => {
    if (productosFiltrados.length === 0) {
      alert("No hay productos para exportar.")
      return
    }
    const headers = Object.keys(productosFiltrados[0])
    const rows = productosFiltrados.map(p =>
      headers.map(h => `"${(p[h] ?? '').toString().replace(/"/g, '""')}` ).join(',')
    )
    const csvContent = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'productos.csv'
    a.click()
    URL.revokeObjectURL(url)
    alert("Exportación CSV realizada con éxito!")
  }
  // Exporta los productos filtrados a un archivo CSV descargable y muestra mensaje de éxito.

  const exportarJSON = () => {
    if (productosFiltrados.length === 0) {
      alert("No hay productos para exportar.")
      return
    }
    const blob = new Blob([JSON.stringify(productosFiltrados, null, 2)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'productos.json'
    a.click()
    URL.revokeObjectURL(url)
    alert("Exportación JSON realizada con éxito!")
  }
  // Exporta los productos filtrados a un archivo JSON y muestra mensaje de éxito.

  // Calcular paginación
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina)
  const inicio = (paginaActual - 1) * productosPorPagina
  const fin = inicio + productosPorPagina
  const productosPaginados = productosFiltrados.slice(inicio, fin)
  // Se calculan los índices de corte para mostrar los productos de la página actual.

  const estadisticas = calcularEstadisticas(productosFiltrados)
  const estadisticasPorCategoria = calcularEstadisticasPorCategoria(productosFiltrados)
  // Ejecuta las funciones para obtener estadísticas generales y por categoría.

  return (
    <div className="p-6 font-sans bg-gray-100 dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      {/* Contenedor principal con estilo y modo oscuro */}

      <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-300 mb-4">
       Proyecto Integrador - Evidencia 3 - ISPC
      </h1>

      {/* Filtros de búsqueda, categoría y orden */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={e => {
            setBusqueda(e.target.value)
            setPaginaActual(1)  // Reiniciar a la primera página cuando cambia la búsqueda
          }}
          className="p-2 border rounded w-full md:w-1/3 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500"
        />

        <select
          value={categoriaSeleccionada}
          onChange={e => {
            setCategoriaSeleccionada(e.target.value)
            setPaginaActual(1)  // Reiniciar a la primera página cuando cambia el filtro
          }}
          className="p-2 border rounded w-full md:w-1/4 bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={orden}
          onChange={e => {
            setOrden(e.target.value)
            setPaginaActual(1)  // Reiniciar a la primera página cuando cambia el orden
          }}
          className="p-2 border rounded w-full md:w-1/4 bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          <option value="">Sin orden</option>
          <option value="precio-asc">Precio (ascendente)</option>
          <option value="precio-desc">Precio (descendente)</option>
          <option value="rating-asc">Rating (ascendente)</option>
          <option value="rating-desc">Rating (descendente)</option>
        </select>
      </div>

      {/* Botones de acciones */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => setMostrarEstadisticas(prev => !prev)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {mostrarEstadisticas ? "Ocultar" : "Mostrar"} Estadísticas
        </button>

        <button
          onClick={alternarModoOscuro}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Alternar Modo Oscuro
        </button>

        <button
          onClick={exportarCSV}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Exportar CSV
        </button>

        <button
          onClick={exportarJSON}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Exportar JSON
        </button>
      </div>

      {/* Paneles condicionales: estadísticas y gráficos */}
      {mostrarEstadisticas && (
        <>
          <StatsPanel stats={estadisticas} porCategoria={estadisticasPorCategoria} />
          <ChartsPanel productos={productosFiltrados} />
        </>
      )}

      {/* Lista de productos paginados o mensaje si no hay resultados */}
      <div className="mt-10">
        {productosFiltrados.length === 0 ? (
          <p className="text-center text-red-500 font-semibold mt-8">
            No se encontraron productos con los criterios seleccionados.
          </p>
        ) : (
          <>
            <ProductList products={productosPaginados} />
            {/* Controles de paginación */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
                disabled={paginaActual === 1}
                className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
              >
                ◀ Anterior
              </button>
              <span>Página {paginaActual} de {totalPaginas}</span>
              <button
                onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
                disabled={paginaActual === totalPaginas}
                className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
              >
                Siguiente ▶
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
// Exporta el componente principal para ser usado en main.jsx.

/*
FUNCIONALIDAD GENERAL:

- Este archivo es el núcleo de toda la aplicación, como se ve...
- Contiene los estados, llamadas a la API, cálculos de estadísticas y renderiza la interfaz.
- Muestra los productos, los filtros, los botones, las estadísticas, los gráficos y la paginación.
- Aquí se maneja la lógica de negocio, estados y renderizado de la UI.

CONEXIONES CON OTROS ARCHIVOS:

- App.jsx es importado y usado en main.jsx
- Conecta y utiliza:
  - ProductList.jsx → muestra los productos
  - StatsPanel.jsx → muestra estadísticas
  - ChartsPanel.jsx → muestra gráficos
*/


