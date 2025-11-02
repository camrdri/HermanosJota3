import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Home() {
  const heroStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/Aparador-Uspallata.png)`,
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