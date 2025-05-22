function StatsPanel({ stats, porCategoria }) {
  if (!stats) return (
    <div className="bg-red-100 p-4 rounded shadow mb-6">
      <p className="text-red-700 font-medium">No hay estadísticas disponibles.</p>
    </div>
  )

  return (
    <div className="bg-blue-50 dark:bg-blue-800 dark:text-white p-4 rounded-md shadow mb-6">
      <h2 className="text-xl font-semibold mb-2">📊 Estadísticas Generales</h2>
      <ul className="list-disc ml-5 space-y-1">
        <li><strong>Producto más caro:</strong> {stats.masCaro.title} – ${stats.masCaro.price}</li>
        <li><strong>Producto más barato:</strong> {stats.masBarato.title} – ${stats.masBarato.price}</li>
        <li><strong>Títulos largos (&gt;20 caracteres):</strong> {stats.titulosLargos}</li>
        <li><strong>Precio total:</strong> ${stats.precioTotal.toFixed(2)}</li>
        <li><strong>Promedio de descuento:</strong> {stats.descuentoPromedio}%</li>
        <li><strong>Promedio de rating:</strong> {stats.promedioRating}</li>
        <li><strong>Productos con stock &gt; 50:</strong> {stats.stockAlto}</li>
        <li><strong>Productos con rating &gt; 4.5:</strong> {stats.ratingAlto}</li>
      </ul>

      {porCategoria && porCategoria.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">📂 Estadísticas por Categoría</h3>
          {porCategoria.map((catStat, index) => (
            <div key={index} className="mb-4 border-b border-white/30 pb-2">
              <p><strong>Categoría:</strong> {catStat.categoria}</p>
              <p>🔹 Precio promedio: ${catStat.promedioPrecio}</p>
              <p>🔹 Rating promedio: {catStat.promedioRating}</p>
              <p>🔹 Más caro: {catStat.masCaro.title} – ${catStat.masCaro.price}</p>
              <p>🔹 Más barato: {catStat.masBarato.title} – ${catStat.masBarato.price}</p>
            </div>
          ))}
        </div>
      )}

      <p className="text-green-600 dark:text-green-300 font-medium mt-4">
        Tailwind CSS está funcionando correctamente
      </p>
    </div>
  )
}

export default StatsPanel
