import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditarProducto() {
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

  // 🔹 Cargar datos del producto cuando se abre la página
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`/api/productos/${id}`);
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

  // 🔹 Actualiza el formulario al escribir
  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 🔹 Enviar actualización
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Error al actualizar el producto');
      alert('Producto actualizado con éxito');
      navigate(`/productos/${id}`); // volver al detalle
    } catch (err) {
      alert(`${err.message}`);
    }
  };

  if (cargando) return <p>Cargando datos del producto...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
        />
        <input
          type="number"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          placeholder="Precio"
          required
          min="0"
        />
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          min="0"
        />
        <input
          type="text"
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

export default EditarProducto;
