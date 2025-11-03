import React, { useState, useEffect } from 'react';
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('asc'); // 'asc' o 'desc'

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/productos`);
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

  const filtrarYOrdenar = () => {
    let filtrados = productos.filter(p =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    filtrados.sort((a, b) => {
      if (orden === 'asc') return a.precio - b.precio;
      else return b.precio - a.precio;
    });

    return filtrados;
  };

  if (loading) {
    return <h2> Cargando productos... </h2>;
  }

  if (error) {
    return <p>Error al cargar el catálogo: {error}</p>;
  }

  return (
    <div>
      <div className="page-container">
        <h2 className="titulos">Catálogo de Mueblería Jota</h2>

        <div className="filtros-catalogo">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <select value={orden} onChange={(e) => setOrden(e.target.value)}>
            <option value="asc">Precio: menor a mayor</option>
            <option value="desc">Precio: mayor a menor</option>
          </select>
        </div>
      </div>

      <div id="grilla-productos">
        {filtrarYOrdenar().map(p => (
          <ProductCard key={p._id} producto={p} />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Catalogo;
