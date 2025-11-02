import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ producto }) { 
  return (
    <Link to={`/productos/${producto._id}`} className="tarjeta-individual">
      {producto.imagenUrl && (
        <img
          src={producto.imagenUrl} 
          alt={producto.nombre}
          className="imagen-producto"
        />
      )}
      <h3>{producto.nombre}</h3>
      <p>${producto.precio}</p>
      
    </Link>
  );
}

