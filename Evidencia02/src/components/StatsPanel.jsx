// Muestra estadísticas calculadas dinámicamente
function StatsPanel({ stats }) {
  if (!stats) return <p className="text-red-500">No hay estadísticas disponibles.</p>;

  return (
    <div className="bg-blue-50 p-4 rounded-md shadow mb-6">
      <h2 className="text-xl font-semibold mb-2 text-gray-700">📊 Estadísticas</h2>
      <ul className="list-disc ml-5 space-y-1 text-gray-800">
        <li><strong>Producto más caro:</strong> {stats.masCaro.title} – ${stats.masCaro.price}</li>
        <li><strong>Producto más barato:</strong> {stats.masBarato.title} – ${stats.masBarato.price}</li>
        <li><strong>Títulos largos (&gt;20 caracteres):</strong> {stats.titulosLargos}</li>
        <li><strong>Precio total:</strong> ${stats.precioTotal}</li>
        <li><strong>Promedio de descuento:</strong> {stats.promedioDescuento}%</li>
      </ul>
      <p className="text-green-600 font-medium mt-2">Tailwind CSS está funcionando correctamente</p>
    </div>
  );
}

export default StatsPanel;
