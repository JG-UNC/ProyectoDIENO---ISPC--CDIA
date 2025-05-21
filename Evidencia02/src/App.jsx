import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import StatsPanel from './components/StatsPanel';

function App() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');

  // Cargar productos desde la API al iniciar
  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => console.error('Error al obtener productos:', error));
  }, []);

  // Filtrado dinámico de productos por texto de búsqueda
  const filteredProducts = searchText
    ? products.filter(p =>
        p.title.toLowerCase().includes(searchText.toLowerCase()))
    : products;

  // Función para calcular estadísticas dinámicas
  const calcularEstadisticas = (productos) => {
    if (productos.length === 0) return null;

    const masCaro = productos.reduce((prev, curr) => (curr.price > prev.price ? curr : prev));
    const masBarato = productos.reduce((prev, curr) => (curr.price < prev.price ? curr : prev));
    const titulosLargos = productos.filter(p => p.title.length > 20).length;
    const precioTotal = productos.reduce((acc, p) => acc + p.price, 0);
    const promedioDescuento = productos.reduce((acc, p) => acc + p.discountPercentage, 0) / productos.length;

    return {
      masCaro,
      masBarato,
      titulosLargos,
      precioTotal,
      promedioDescuento: promedioDescuento.toFixed(2),
    };
  };

  const stats = calcularEstadisticas(filteredProducts);

  return (
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">
        Evidencia 2 – ISPC
      </h1>

      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {/* Panel de estadísticas */}
      <StatsPanel stats={stats} />

      {/* Lista de productos filtrados */}
      <ProductList products={filteredProducts} />
    </div>
  );
}

export default App;
