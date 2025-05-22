import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import ProductList from './components/ProductList'
import StatsPanel from './components/StatsPanel'

function App() {
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [mostrarEstadisticas, setMostrarEstadisticas] = useState(true)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas')
  const [orden, setOrden] = useState('')
  const modoOscuro = useRef(false)

  const alternarModoOscuro = () => {
    modoOscuro.current = !modoOscuro.current
    document.documentElement.classList.toggle('dark')
  }

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=100')
      .then(res => setProductos(res.data.products))
      .catch(err => console.error(err))
  }, [])

  const categorias = ['todas', ...new Set(productos.map(p => p.category))]

  let productosFiltrados = productos.filter(p =>
    p.title.toLowerCase().includes(busqueda.toLowerCase()) &&
    (categoriaSeleccionada === 'todas' || p.category === categoriaSeleccionada)
  )

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

  const calcularEstadisticasPorCategoria = (productos) => {
    const categorias = [...new Set(productos.map(p => p.category))]

    const estadisticas = categorias.map(categoria => {
      const items = productos.filter(p => p.category === categoria)

      if (items.length === 0) return null

      const promedioPrecio = (
        items.reduce((acc, p) => acc + p.price, 0) / items.length
      ).toFixed(2)

      const promedioRating = (
        items.reduce((acc, p) => acc + p.rating, 0) / items.length
      ).toFixed(2)

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

  const estadisticas = calcularEstadisticas(productosFiltrados)
  const estadisticasPorCategoria = calcularEstadisticasPorCategoria(productosFiltrados)

  return (
    <div className="p-6 font-sans bg-gray-100 dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-300 mb-4">
        Evidencia 2 – ISPC
      </h1>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500"
        />

        <select
          value={categoriaSeleccionada}
          onChange={e => setCategoriaSeleccionada(e.target.value)}
          className="p-2 border rounded w-full md:w-1/4 bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={orden}
          onChange={e => setOrden(e.target.value)}
          className="p-2 border rounded w-full md:w-1/4 bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          <option value="">Sin orden</option>
          <option value="precio-asc">Precio (ascendente)</option>
          <option value="precio-desc">Precio (descendente)</option>
          <option value="rating-asc">Rating (ascendente)</option>
          <option value="rating-desc">Rating (descendente)</option>
        </select>
      </div>

      {/* Botones */}
      <div className="flex gap-4 mb-6">
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
      </div>

      {mostrarEstadisticas && (
        <StatsPanel stats={estadisticas} porCategoria={estadisticasPorCategoria} />
      )}

      <ProductList products={productosFiltrados} />
    </div>
  )
}

export default App
