function StatsPanel({ stats, porCategoria }) {


  if (!stats) return (
    // Si no hay estadísticas disponibles (por ejemplo, no hay productos), muestra un mensaje de error.
    <div className="bg-red-100 p-4 rounded shadow mb-6">
      <p className="text-red-700 font-medium">No hay estadísticas disponibles.</p>
    </div>
  )

  return (
    <div className="bg-blue-50 dark:bg-blue-800 dark:text-white p-4 rounded-md shadow mb-6">
      {/* Contenedor general del panel de estadísticas. Aplica fondo claro u oscuro según el modo. */}

      <h2 className="text-xl font-semibold mb-2">Estadísticas Generales</h2>
      {/* Título principal del panel */}

      <ul className="list-disc ml-5 space-y-1">
        {/* Lista de estadísticas generales */}
        <li><strong>Producto más caro:</strong> {stats.masCaro.title} – ${stats.masCaro.price}</li>
        {/* Muestra el producto más caro */}

        <li><strong>Producto más barato:</strong> {stats.masBarato.title} – ${stats.masBarato.price}</li>
        {/* Muestra el producto más barato */}

        <li><strong>Títulos largos (&gt;20 caracteres):</strong> {stats.titulosLargos}</li>
        {/* Muestra cuántos productos tienen títulos largos */}

        <li><strong>Precio total:</strong> ${stats.precioTotal.toFixed(2)}</li>
        {/* Suma total del precio de los productos filtrados */}

        <li><strong>Promedio de descuento:</strong> {stats.descuentoPromedio}%</li>
        {/* Promedio de descuento aplicado en los productos */}

        <li><strong>Promedio de rating:</strong> {stats.promedioRating}</li>
        {/* Promedio general de calificación de los productos */}

        <li><strong>Productos con stock &gt; 50:</strong> {stats.stockAlto}</li>
        {/* Cuántos productos tienen stock alto */}

        <li><strong>Productos con rating &gt; 4.5:</strong> {stats.ratingAlto}</li>
        {/* Cuántos productos tienen excelente rating */}
      </ul>

      {porCategoria && porCategoria.length > 0 && (
        // Si existen estadísticas por categoría, las muestra
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Estadísticas por Categoría</h3>

          {porCategoria.map((catStat, index) => (
            // Itera por cada categoría y muestra los datos agrupados
            <div key={index} className="mb-4 border-b border-white/30 pb-2">
              <p><strong>Categoría:</strong> {catStat.categoria}</p>
              <p>- Precio promedio: ${catStat.promedioPrecio}</p>
              <p>- Rating promedio: {catStat.promedioRating}</p>
              <p>- Más caro: {catStat.masCaro.title} – ${catStat.masCaro.price}</p>
              <p>- Más barato: {catStat.masBarato.title} – ${catStat.masBarato.price}</p>
            </div>
          ))}
        </div>
      )}

      <p className="text-green-600 dark:text-green-300 font-medium mt-4">
        Tailwind CSS está funcionando correctamente
      </p>
      {/* Mensaje que confirma que los estilos visuales se están aplicando correctamente */}
    </div>
  )
}

export default StatsPanel
// Exporta el componente para que pueda ser usado en App.jsx

/*
FUNCIONALIDAD DEL ARCHIVO:

- Muestra las estadísticas generales de los productos filtrados.
- También muestra estadísticas específicas agrupadas por categoría.
- Presenta la información de forma clara y visual, usando Tailwind CSS.
- Aplica diseño adaptable y modo oscuro automáticamente.

RELACIÓN ENTRE ARCHIVOS:

- Es llamado por App.jsx.
- Recibe como props las estadísticas calculadas en App.jsx.
- Se renderiza de forma condicional según si hay o no datos.
*/
// Este componente es esencial para mostrar el resumen de datos de los productos filtrados.
