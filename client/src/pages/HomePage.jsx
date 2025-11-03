import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Home() {
  console.log('🏠 Componente Home montado');

  const heroStyle = {
    backgroundImage: `url(/images/Aparador-Uspallata.png)`,
  };

  return (
    <div>
      <div className="hero" style={heroStyle}>
        <div className="hero-content">
          <h1>HONRAMOS LA TRADICIÓN MIENTRAS INNOVAMOS</h1>
          <p>Muebles que cuentan historias, hechos con materiales nobles y manos expertas.</p>
          <Link to="/productos" className="hero-button">VER CATÁLOGO</Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
