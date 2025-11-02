import { Routes, Route } from 'react-router-dom';
import "./App.css";
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import Catalogo from './pages/CatalogoPage';
import DetalleProducto from './pages/DetalleProductoPage';
import CrearProductoForm from './pages/admin/CrearProductoPage';
import Contacto from './pages/ContactoPage';
import EditarProducto from './pages/admin/EditarProductoPage';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/productos" element={<Catalogo />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path="/admin/crear-producto" element={<CrearProductoForm />} />
          <Route path="/admin/editar-producto/:id" element={<EditarProducto />} />
        </Routes>
      </main>
    </div>
  );
}

export default App; 
