export default function StatsPanel({ stats }) {
  // Verificamos que las propiedades existan antes de usarlas
  const {
    masCaro = { title: '-', price: 0 },
    masBarato = { title: '-', price: 0 },
    titulosLargos = 0,
    precioTotal = 0,
    descuentoPromedio = 0
  } = stats || {}

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Estadísticas</h2>
      <ul className="list-disc pl-5 text-gray-700">
        <li><strong>Producto más caro:</strong> {masCaro.title} - ${masCaro.price}</li>
        <li><strong>Producto más barato:</strong> {masBarato.title} - ${masBarato.price}</li>
        <li><strong>Títulos con más de 20 caracteres:</strong> {titulosLargos}</li>
        <li><strong>Precio total:</strong> ${precioTotal}</li>
        <li><strong>Promedio de descuento:</strong> {descuentoPromedio.toFixed(2)}%</li>
      </ul>
    </div>
  )
}
