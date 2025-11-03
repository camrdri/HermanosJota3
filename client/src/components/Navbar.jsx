import { useState, useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Navbar.css'; // si querés estilos personalizados

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [carritoOpen, setCarritoOpen] = useState(false);
  const { carrito, eliminarDelCarrito } = useContext(CartContext);
  const cantidadTotal = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCarritoOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src="/images/logo-principal.svg" alt="Hermanos Jota" />
      </Link>

      <button 
        className="menu-toggle" 
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>INICIO</Link></li>
        <li><Link to="/productos" onClick={() => setMenuOpen(false)}>CATÁLOGO</Link></li>
        <li><Link to="/contacto" onClick={() => setMenuOpen(false)}>CONTACTO</Link></li>
      </ul>

      <div className="carrito-wrapper" ref={dropdownRef}>
        <div className="carrito-icono" onClick={() => setCarritoOpen(!carritoOpen)}>
          <i className="bi bi-cart3"></i>
          {cantidadTotal > 0 && (
            <span className="carrito-contador">{cantidadTotal}</span>
          )}
        </div>

        {carritoOpen && (
          <div className="carrito-dropdown">
            <h4>Mi Carrito</h4>
            {carrito.length === 0 ? (
              <p className="carrito-vacio">Tu carrito está vacío.</p>
            ) : (
              <>
                <ul className="carrito-lista">
                  {carrito.map((p) => (
                    <li key={p._id} className="carrito-item">
                      <img src={p.imagenUrl} alt={p.nombre} />
                      <div className="carrito-detalle">
                        <span className="nombre">{p.nombre}</span>
                        <span className="cantidad">x{p.cantidad}</span>
                        <span className="precio">${p.precio}</span>
                      </div>
                      <button onClick={() => eliminarDelCarrito(p._id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="carrito-total">
                  <strong>Total:</strong> ${carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0)}
                </div>
                <button className="boton-comprar">
                  <i className="bi bi-credit-card"></i> COMPRAR
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

