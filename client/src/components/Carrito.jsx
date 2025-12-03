import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Carrito({ visible, cerrar }) {
  const { carrito, eliminarDelCarrito, vaciarCarrito, reducirCantidadCarrito, agregarAlCarrito } = useContext(CartContext);
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  if (!visible) return null;

  return (
    <div className="carrito-panel">
      <button onClick={cerrar}>Cerrar</button>
      <h2>Tu carrito</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {carrito.map((p) => (
            <li key={p._id}>
              {p.nombre} x {p.cantidad}
              <button onClick={() => reducirCantidadCarrito(p._id)}>-</button>
                    <span> {p.cantidad} </span>
              <button onClick={() => agregarAlCarrito(p)}>+</button>
              <button onClick={() => eliminarDelCarrito(p._id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      {carrito.length > 0 && (
        <button onClick={vaciarCarrito}>Vaciar carrito</button>
      )}
      <button onClick={() => {cerrar();}}> Finalizar Compra </button>
    </div>
  );
}

export default Carrito;
