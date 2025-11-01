import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Home() {
  return (
    <div>
      <h1>Mueblería Jota</h1>
      <p>Tu lugar ideal para encontrar muebles de calidad.</p>
      
      <section>
        <h2>Explora Nuestro Catálogo</h2>
        <Link to="/productos">
          Ir al Catálogo de Productos
        </Link>
      </section>

      <Footer />
    </div>
  );
}

export default Home;