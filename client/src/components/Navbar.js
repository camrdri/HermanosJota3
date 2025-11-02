import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
    </nav>
  );
}

export default Navbar;
