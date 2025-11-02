import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { CartContext } from '../context/CartContext';

function DetalleProducto() {
  const { id } = useParams();
  const { agregarAlCarrito, eliminarDelCarrito, carrito } = useContext(CartContext);

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        setCargando(true);
        const response = await fetch(`/api/productos/${id}`); 
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        const data = await response.json();
        setProducto(data);
        setError(null);
      } catch (err) {
        setError(err);
        setProducto(null);
      } finally {
        setCargando(false);
      }
    };
    fetchDetalle();
  }, [id]);

  const handleEliminarProducto = async () => {
    const confirmar = window.confirm(`¿Estás segura de que querés eliminar "${producto.nombre}"?`);
    if (!confirmar) return;

    try {
      const res = await fetch(`/api/productos/${producto._id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('No se pudo eliminar el producto');
      }

      alert('Producto eliminado con éxito');
      window.location.href = '/productos';
    } catch (err) {
      alert(`Error al eliminar: ${err.message}`);
    }
  };

  if (cargando) return <p>Cargando detalles del producto ID: {id}...</p>;
  if (error) return <p>Error al cargar el producto</p>;
  if (!producto) return <p>Producto no encontrado.</p>;

  const itemEnCarrito = carrito.find(p => p._id === producto._id);
  const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;
  const stockAgotado = cantidadEnCarrito >= producto.stock;

  return (
    <div>
      <div className="detalle-producto">
        <img
          src={producto.imagenUrl}
          alt={producto.nombre}
          className="imagen-detalle"
        />

        <div className="info-detalle">
          <h1>{producto.nombre}</h1>
          <p>{producto.descripcion}</p>
          <ul>
            <li><strong>Precio:</strong> ${producto.precio}</li>
            <li><strong>Stock:</strong> {producto.stock}</li>
          </ul>

          <button
            className="boton-agregar"
            onClick={() => agregarAlCarrito(producto)}
            disabled={stockAgotado}
          >
            AGREGAR AL CARRITO
          </button>

          {stockAgotado && (
            <p style={{ color: '#A0522D', fontWeight: 'bold', marginTop: '8px' }}>
              Stock máximo alcanzado
            </p>
          )}

          {itemEnCarrito && (
            <button className="boton-quitar" onClick={() => eliminarDelCarrito(producto._id)}>
              QUITAR DEL CARRITO
            </button>
          )}

          <button className="boton-eliminar" onClick={handleEliminarProducto}>
            ELIMINAR PRODUCTO
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DetalleProducto;

