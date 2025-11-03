import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CrearProductoPage.css'; // reutilizamos estilos de edición

function CrearProductoForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    precio: 0,
    descripcion: '',
    imagenUrl: '',
    stock: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = (name === 'precio' || name === 'stock')
      ? parseFloat(value)
      : value;
    setForm(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    try {
      const respuesta = await fetch('/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!respuesta.ok) {
        throw new Error('Falló la creación del producto');
      } else {
        const nuevoProducto = await respuesta.json();
        alert(`Producto "${nuevoProducto.nombre}" creado con éxito.`);
        navigate(`/productos/${nuevoProducto._id}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="form-admin">
      <form onSubmit={handleSubmit}>
        <h3>Crear Nuevo Producto</h3>

        <label htmlFor="nombre">Nombre (Obligatorio)</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre (Obligatorio)"
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

        <label htmlFor="precio">Precio (Obligatorio)</label>
        <input
          type="number"
          id="precio"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          placeholder="Precio (Obligatorio)"
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

        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
}

export default CrearProductoForm;
