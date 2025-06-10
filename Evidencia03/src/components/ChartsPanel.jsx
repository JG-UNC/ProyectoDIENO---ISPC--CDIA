import { Bar, Pie, Line } from 'react-chartjs-2'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
)

function ChartsPanel({ productos }) {
  // Cuenta cuántos productos hay por categoría
  const productosPorCategoria = productos.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1
    return acc
  }, {})

  const categorias = Object.keys(productosPorCategoria)
  // Extrae las categorías únicas

  const cantidades = Object.values(productosPorCategoria)
  // Extrae el total de productos por cada categoría

  // Gráfico de Barras: Productos por categoría
  const barData = {
    labels: categorias,
    datasets: [
      {
        label: 'Productos por categoría',
        data: cantidades,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderWidth: 1
      }
    ]
  }

  const barOptions = {
    responsive: true,
    indexAxis: 'x',
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Cantidad de productos por categoría' }
    }
  }

  // Gráfico Pie: Distribución por rating 
  const ratingAlto = productos.filter(p => p.rating > 4.5).length
  const ratingBajo = productos.length - ratingAlto

  const pieData = {
    labels: ['Rating > 4.5', 'Rating ≤ 4.5'],
    datasets: [
      {
        label: 'Distribución por rating',
        data: [ratingAlto, ratingBajo],
        backgroundColor: ['#10b981', '#ef4444'],
        borderWidth: 1
      }
    ]
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Distribución por rating' }
    }
  }

  // Gráfico de Barras horizontales: Precio promedio
  const promedioPrecioPorCategoria = categorias.map(cat => {
    const items = productos.filter(p => p.category === cat)
    const suma = items.reduce((acc, p) => acc + p.price, 0)
    return (suma / items.length).toFixed(2)
  })

  const precioData = {
    labels: categorias,
    datasets: [
      {
        label: 'Precio promedio ($)',
        data: promedioPrecioPorCategoria,
        backgroundColor: 'rgba(255, 206, 86, 0.6)'
      }
    ]
  }

  const precioOptions = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Precio promedio por categoría' }
    }
  }

  // Gráfico de Línea: Stock promedio
  const stockPromedioPorCategoria = categorias.map(cat => {
    const items = productos.filter(p => p.category === cat)
    const suma = items.reduce((acc, p) => acc + p.stock, 0)
    return (suma / items.length).toFixed(2)
  })

  const stockData = {
    labels: categorias,
    datasets: [
      {
        label: 'Stock promedio',
        data: stockPromedioPorCategoria,
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.4
      }
    ]
  }

  const stockOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Stock promedio por categoría' }
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Visualización de datos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Bar data={barData} options={barOptions} />
        </div>
        <div className="h-[300px]">
          <Pie data={pieData} options={pieOptions} />
        </div>
        <div>
          <Bar data={precioData} options={precioOptions} />
        </div>
        <div>
          <Line data={stockData} options={stockOptions} />
        </div>
      </div>
    </div>
  )
}

export default ChartsPanel

// Este componente muestra 4 tipos de gráficos:
// 1. Barras verticales: cantidad de productos por categoría.
// 2. Pie (torta): porcentaje de productos con rating alto o bajo.
// 3. Barras horizontales: precio promedio por categoría.
// 4. Línea: stock promedio por categoría.
// Los datos se calculan en base al array 'productos' recibido por props.
// Usa Chart.js junto con react-chartjs-2 para la visualización.
