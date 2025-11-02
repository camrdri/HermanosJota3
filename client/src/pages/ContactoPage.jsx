import { useState } from "react";
import Footer from "../components/Footer";

export default function ContactoPage() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);
    setExito(false);

    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, mensaje }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        let errorMessage = `Error ${response.status}: `;
        try {
          const errorData = JSON.parse(errorBody);
          errorMessage += errorData.message || errorData.error || errorBody;
        } catch {
          errorMessage += errorBody.substring(0, 100);
        }
        throw new Error(errorMessage || 'Falló el envío del mensaje.');
      }

      setExito(true);
      setNombre("");
      setEmail("");
      setMensaje("");
    } catch (err) {
      setError(err.message);
      console.error("Error al enviar el contacto:", err);
    } finally {
      setCargando(false);
      setTimeout(() => {
        setExito(false);
        setError(null);
      }, 5000);
    }
  };

  return (
    <div className="contacto-page">
      <h1 className="contacto-titulo">CONTACTO</h1>
      <p className="contacto-subtitulo">
        ¿Tenés preguntas? Dejanos tu mensaje y te responderemos pronto.
      </p>

      <div className="contact-form-container">
        <form id="form-contacto" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            required
            disabled={cargando}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            required
            disabled={cargando}
          />

          <label htmlFor="mensaje">Mensaje:</label>
          <textarea
            id="mensaje"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            rows="5"
            placeholder="Escribí tu mensaje..."
            required
            disabled={cargando}
          />

          <button type="submit" disabled={cargando}>
            {cargando ? "Enviando..." : "Enviar"}
          </button>
        </form>

        {exito && (
          <div id="mensaje-exito">
            Gracias {nombre}, tu mensaje fue enviado.
          </div>
        )}

        {error && <div id="mensaje-error">{error}</div>}

        {cargando && !exito && !error && (
          <p>Enviando mensaje...</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
