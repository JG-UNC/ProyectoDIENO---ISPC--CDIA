function ProductList({ products }) {
  if (products.length === 0) return <p>No se encontraron productos.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {products.map(product => (
        <div
          key={product.id}
          className="bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-sm transition duration-300 transform hover:scale-105 hover:shadow-md"
          style={{ maxWidth: '100%', overflow: 'hidden' }}
        >
          <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
          <p className="text-gray-600">${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
