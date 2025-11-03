import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Carrito({ visible, cerrar }) {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CartContext);

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
              <button onClick={() => eliminarDelCarrito(p._id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      {carrito.length > 0 && (
        <button onClick={vaciarCarrito}>Vaciar carrito</button>
      )}
    </div>
  );
}

export default Carrito;
