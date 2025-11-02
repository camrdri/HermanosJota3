import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CrearProductoPage.css';

function CrearProductoForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', precio: 0, descripcion: '', imagenUrl: '', stock: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error('Falló la creación del producto');
      } else { 
        const nuevoProducto = await response.json();
        alert(`Producto "${nuevoProducto.nombre}" creado con éxito.`);
        navigate(`/productos/${nuevoProducto._id}`); 
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>Crear Nuevo Producto</h3>
        <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre (Obligatorio)" required />
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" />
        <input type="number" name="precio" value={form.precio} onChange={handleChange} placeholder="Precio (Obligatorio)" required min="0" />
        <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" min="0" />
        <input type="text" name="imagenUrl" value={form.imagenUrl} onChange={handleChange} placeholder="URL de la imagen" />
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
}

export default CrearProductoForm;
