import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CrearProductoForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', precio: 0, descripcion: '', imagenUrl: '', stock: 0 });

  const cambios = (e) => {
    const { name, value } = e.target;
    const newValue = (name === 'precio' || name === 'stock') 
        ? parseFloat(value) 
        : value;
    setForm(prev => ({ ...prev, [name]: newValue }));
  };

  const enviar = async (evento) => {
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
    <div className="admin-page-container">
      <h1 className="admin-titulo">Crear Nuevo Producto</h1>
      <div className="admin-form-container">
        <form id="form-crear-producto" onSubmit={enviar}>
          <div>
            <label htmlFor="nombre">Nombre del Producto</label>
            <input type="text" name="nombre" value={form.nombre} onChange={cambios} placeholder="Nombre (Obligatorio)" required />
          </div>

          <div>
            <label htmlFor="descripcion">Descripción</label>
            <textarea name="descripcion" value={form.descripcion} onChange={cambios} placeholder="Descripción" />            
          </div>

          <div>
            <label htmlFor="precio">Precio ($)</label>
            <input type="number" name="precio" value={form.precio} onChange={cambios} placeholder="Precio (Obligatorio)" required min="0" />
          </div>

          <div>
            <label htmlFor="stock">Stock Disponible</label>
            <input type="number" name="stock" value={form.stock} onChange={cambios} placeholder="Stock" min="0" />  
          </div>

          <div>
            <label htmlFor="imagenUrl">URL de la Imagen</label>
            <input type="text" name="imagenUrl" value={form.imagenUrl} onChange={cambios} placeholder="URL de la imagen" />  
          </div>

          <button type="submit">Crear Producto</button>
        </form>
      </div>
    </div>
  );
}

export default CrearProductoForm;