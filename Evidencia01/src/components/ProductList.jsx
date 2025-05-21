export default function ProductList({ products }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map(product => (
        <div key={product.id} className="border p-4 bg-white shadow hover:scale-105 transition">
          <h2 className="font-semibold">{product.title}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  )
}
