import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((p) => p._id === producto._id);
    if (existe) {
      if (existe.cantidad >= producto.stock) return; // 🔒 no agregar más si se supera el stock
      setCarrito(carrito.map(p =>
        p._id === producto._id ? { ...p, cantidad: p.cantidad + 1 } : p
      ));
    } else {
      if (producto.stock > 0) {
        setCarrito([...carrito, { ...producto, cantidad: 1 }]);
      }
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((p) => p._id !== id));
  };


  const reducirCantidadCarrito = (id) => {
    const producto = carrito.find((p) => p._id === id);
    if (producto.cantidad > 1) {
      setCarrito(carrito.map(p =>
        p._id === id ? { ...p, cantidad: p.cantidad - 1 } : p
      ));
    } else {
      eliminarDelCarrito(id);
    }
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito, reducirCantidadCarrito }}>
      {children}
    </CartContext.Provider>
  );
}

