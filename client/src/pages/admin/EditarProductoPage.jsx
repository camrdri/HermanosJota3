import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CrearProductoPage.css'; // reutilizamos el CSS de alta

function EditarProductoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    imagenUrl: ''
  });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        console.log('API:', import.meta.env.VITE_API_URL);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/productos/${id}`);
        if (!res.ok) throw new Error('Producto no encontrado');
        const data = await res.json();
        setForm({
          nombre: data.nombre,
          descripcion: data.descripcion,
          precio: data.precio,
          stock: data.stock,
          imagenUrl: data.imagenUrl
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    fetchProducto();
  }, [id]);


  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log('API:', import.meta.env.VITE_API_URL);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Error al actualizar el producto');
      alert('Producto actualizado con éxito');
      navigate(`/productos/${id}`);
    } catch (err) {
      alert(`${err.message}`);
    }
  };


  if (cargando) return <p>Cargando datos del producto...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="form-admin">
      <form onSubmit={handleSubmit}>
        <h3>Editar Producto</h3>

        <label htmlFor="nombre">Nombre (Obligatorio)</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />

        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
        />

        <label htmlFor="precio">Precio</label>
        <input
          type="number"
          id="precio"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          placeholder="Precio"
          required
          min="0"
        />

        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          min="0"
        />

        <label htmlFor="imagenUrl">URL de la imagen</label>
        <input
          type="text"
          id="imagenUrl"
          name="imagenUrl"
          value={form.imagenUrl}
          onChange={handleChange}
          placeholder="URL de la imagen"
        />

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditarProductoPage;
