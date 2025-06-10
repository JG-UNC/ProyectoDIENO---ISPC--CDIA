function ProductList({ products }) {

  const renderStars = (rating) => {
    const estrellas = []
    const redondeado = Math.round(rating) // Redondea el rating al entero más cercano

    for (let i = 1; i <= 5; i++) {
      if (i <= redondeado) {
        estrellas.push('★') // Estrella llena
      } else {
        estrellas.push('☆') // Estrella vacía
      }
    }

    return estrellas.join(' ')
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {/* Contenedor en formato grilla responsiva que adapta el número de columnas al tamaño de pantalla. */}
      
      {products.map((prod) => (
        // Itera sobre cada producto recibido en la prop 'products' usando map.
        // 'prod' representa un producto individual.

        <div
          key={prod.id}
          className="p-4 border rounded shadow bg-white dark:bg-gray-800"
        >
          {/* Crea una tarjeta individual para cada producto. */}
          {/* Aplica estilos con Tailwind (borde, fondo claro/oscuro, sombra). */}

          <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
            {prod.title}
          </h3>
          {/* Muestra el título del producto con estilo. */}

          <p className="text-gray-600 dark:text-gray-300">
            ${prod.price}
          </p>
          {/* Muestra el precio del producto en texto más pequeño y tenue. */}

          <p className="text-yellow-500 text-sm">
            Rating: {renderStars(prod.rating)} ({prod.rating})
          </p>
          {/* Muestra el rating visualmente con estrellitas + valor numérico. */}
        </div>
      ))}
    </div>
  )
}

export default ProductList
// Exporta el componente para poder usarlo desde App.jsx u otros archivos.

/*
- Este componente se encarga de mostrar todos los productos filtrados.
- Muestra cada producto como una tarjeta con título, precio y rating (ahora con estrellitas).
- Utiliza clases de Tailwind para el diseño responsivooo.
- Admite modo oscuro con las clases 'dark:bg-*' y 'dark:text-*'.
- Es importado por App.jsx.
*/
