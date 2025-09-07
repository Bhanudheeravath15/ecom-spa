import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products") // Update this if needed
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFiltered(data);
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  useEffect(() => {
    const results = products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(results);
  }, [search, products]);

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map(product => (
          <div key={product._id} className="border rounded p-4 shadow">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-700">₹{product.price}</p>
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
