import React, { useState, useEffect } from 'react';
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('/api/productos');
        if (!response.ok) {
          throw new Error('Falló la carga de productos');
        }
        const data = await response.json();
        setProductos(data);
      } catch (err) {
        setError(err.message || 'Error de red o producto no encontrado'); 
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);  

  if (loading) {
    return <h2> Cargando productos... </h2>;
  }

  if (error) {
    return <p>Error al cargar el catálogo: {error.message}</p>;
  }

return (
    <div>
      <div className="page-container">
        <h2 className="titulos">Catálogo de Mueblería Jota</h2>
      </div>
      <div id="grilla-productos">
        {productos.map(p => (
          <ProductCard key={p._id} producto={p} /> 
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Catalogo;