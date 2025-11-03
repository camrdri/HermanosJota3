import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <h4>CONTACTO</h4>
          <p>
            Showroom y Taller<br />
            Hermanos Jota — Casa Taller<br />
            San Juan 2847<br />
            C1234ABG — San Cristóbal, CABA
          </p>
        </div>

        <div className="footer-col">
          <h4>HORARIOS</h4>
          <p>
            Lunes a Viernes: 10:00 - 19:00<br />
            Sábados: 10:00 - 14:00
          </p>
        </div>

        <div className="footer-col">
          <h4>CONTACTO DIGITAL</h4>
          <p>
            Website: <a href="https://www.hermanosjota.com.ar" target="_blank" rel="noopener noreferrer">www.hermanosjota.com.ar</a><br />
            Email general: <a href="mailto:info@hermanosjota.com.ar">info@hermanosjota.com.ar</a><br />
            Instagram: <a href="https://instagram.com/hermanosjota" target="_blank" rel="noopener noreferrer">@hermanosjota</a><br />
            Instagram tienda: <a href="https://instagram.com/hermanosjota_tienda" target="_blank" rel="noopener noreferrer">@hermanosjota_tienda</a><br />
            WhatsApp: <a href="https://wa.me/541158578800" target="_blank" rel="noopener noreferrer">+54 11 5857-8800</a>
          </p>
        </div>

        <div className="footer-col">
          <h4>MAPA DEL SITIO</h4>
          <p>
            <a href="http://localhost:3000/">Inicio</a><br />
            <a href="http://localhost:3000/productos">Productos</a><br />
            <a href="http://localhost:3000/contacto">Contacto</a>
          </p>
        </div>

        <div className="footer-col">
          <h4>CRÉDITOS</h4>
          <p>
            Dirección Creativa: Estudio Hermanos<br />
            Diseño: María Fernanda López<br />
            Fotografía: Santiago Outón<br />
            Redacción: Camila Montes<br />
            Tipografía: Inter por Rasmus Andersson
          </p>
        </div>
      </div>

      <div className="footer-copy">
        © 2025 Hermanos Jota. todos los derechos reservados.
      </div>
    </footer>
  );
}

