import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';


function DetalleProducto() {
  const {id} = useParams();
  const navigate = useNavigate();
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
        setError(null)
      } catch (err) {
        setError(err);
        setProducto(null);
      } finally {
        setCargando(false);
      }
    };
    fetchDetalle();
  }, [id]);

  const borrado = async () => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar el producto con ID: ${id}?`)) {
      return;
    } try {
          const response = await fetch(`/api/productos/${id}`, {
          method: 'DELETE',
      });
      if (!response.ok) {
          throw new Error('Error al eliminar el producto');
      }
      alert(`Producto "${producto.nombre}" eliminado con éxito.`);
      navigate('/productos');

      } catch (err) {
      setError(err.message || 'Error de red o producto no encontrado');
      setProducto(null);
      alert(`Error al eliminar el producto: ${err.message}`);
      }
  };

  if (cargando) {
    return <p>Cargando detalles del producto ID: {id}...</p>;
  }

  if (error) {
    return <p>Error al cargar el producto</p>;
  }
  
  
  if (!producto) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <div>
      <h1>Detalles del Producto: {producto.nombre}</h1>
      <p>ID: {producto._id}</p>
      <p>Precio: ${producto.precio}</p>
      <p>Descripción: {producto.descripcion}</p>
      <p>Stock: {producto.stock}</p>
      <img src={producto.imagenUrl} alt={producto.nombre} style={{ width: '200px' }} />
      <button onClick={borrado}> Eliminar Producto </button>
      <Footer />
    </div>
  );
}

export default DetalleProducto;