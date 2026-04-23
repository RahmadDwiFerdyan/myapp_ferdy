import { useEffect, useState } from "react";

type ProductType = {
  id: string;
  name: string;
  price: number;
  size: string;
  category: string;
};

const Kategori = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/produk");
      const responsedata = await response.json();
      setProducts(responsedata.data);
    } catch (error) {
      console.error("Error fetching produk:", error);
    }
  };

  // pertama kali load
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Daftar Produk</h1>
      <button onClick={fetchProducts}>Refresh Data</button>

      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>price: {product.price}</p>
          <p>size: {product.size}</p>
          <p>category: {product.category}</p>
        </div>
      ))}
    </div>
  );
};

export default Kategori;