import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductList from './components/ProductList'
import StatsPanel from './components/StatsPanel'

function App() {
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState('')

  // Obtener productos desde la API externa
  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => setProductos(response.data.products))
      .catch(error => console.error(error))
  }, [])

  // Filtrar productos por nombre
  const productosFiltrados = productos.filter(producto =>
    producto.title.toLowerCase().includes(busqueda.toLowerCase())
  )

  // Calcular estadísticas
  const calcularEstadisticas = (items) => {
    if (items.length === 0) return {
      masCaro: { title: '-', price: 0 },
      masBarato: { title: '-', price: 0 },
      titulosLargos: 0,
      precioTotal: 0,
      descuentoPromedio: 0
    }

    const masCaro = items.reduce((max, p) => p.price > max.price ? p : max, items[0])
    const masBarato = items.reduce((min, p) => p.price < min.price ? p : min, items[0])
    const titulosLargos = items.filter(p => p.title.length > 20).length
    const precioTotal = items.reduce((suma, p) => suma + p.price, 0)
    const descuentoPromedio = items.reduce((suma, p) => suma + p.discountPercentage, 0) / items.length

    return { masCaro, masBarato, titulosLargos, precioTotal, descuentoPromedio }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6 font-sans">
      
      {/* Confirmación de funcionamiento */}
      <div className="bg-green-100 text-green-800 border border-green-300 rounded p-4 mb-6 shadow">
        <h1 className="text-xl font-bold">✅ Tailwind CSS está funcionando correctamente</h1>
        <p className="text-sm">Este proyecto utiliza React + Vite + Tailwind CSS + Axios.</p>
      </div>

      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar producto por nombre..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        className="border border-gray-300 p-3 w-full rounded-lg mb-6 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Estadísticas dinámicas */}
      <div className="mb-6">
        <StatsPanel stats={calcularEstadisticas(productosFiltrados)} />
      </div>

      {/* Lista de productos */}
      <ProductList products={productosFiltrados} />

      {/* Etiqueta de evidencia */}
      <div className="mt-10 text-center text-gray-700 text-sm">
        <p className="font-bold text-lg">📘 Evidencia 2 - ISPC</p>
        <p>Filtrado dinámico, estadísticas, y separación en componentes funcionales reutilizables.</p>
      </div>
    </div>
  )
}

export default App
