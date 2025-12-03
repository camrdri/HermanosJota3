import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext'; 

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api'; 

function TerminarComprar() {
    const { carrito, vaciarCarrito } = useContext(CartContext);
    const { currentUser, logout } = useContext(AuthContext);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const total = () => carrito.reduce((acc, p) => acc + p.price * p.cantidad, 0);

    const handleCrearPedido = async () => {
        if (carrito.length === 0) {
            setError("No puedes finalizar la compra con un carrito vacío.");
            return;
        }
        if (!currentUser || !currentUser.token) {
            setError("Debes iniciar sesión para completar la compra.");
            return;
        }

        const pedidoJSON = {
            items: carrito.map(item => ({
                productId: item._id, 
                quantity: item.cantidad
            })),
            totalAmount: total()
        };

        setCargando(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/pedidos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.token}` 
                },
                body: JSON.stringify(pedidoJSON)
            });

            if (response.status === 401) {
                logout();
                throw new Error("Su sesión ha expirado. Por favor, inicie sesión de nuevo.");
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al procesar el pedido.');
            }

            vaciarCarrito();
            alert("¡Tu pedido ha sido creado con éxito!");
            navigate('/perfil');

        } catch (err) {
            console.error('Error al finalizar la compra:', err);
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="checkout-container">
            <h2>Resumen del Pedido</h2>
            <div>
            {carrito.length === 0 ? (
                    <p>El carrito está vacío. ¡Redirigiendo a la tienda!</p>
                ) : (
                    <ul className="lista-checkout">
                        {carrito.map((item) => (
                            <li key={item._id} className="item-checkout">
                                <div>
                                    <strong>{item.nombre}</strong> ({item.cantidad} unidades)
                                </div>
                                <div>
                                    ${item.price.toFixed(2)} c/u | Subtotal: **${(item.price * item.cantidad).toFixed(2)}**
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <hr/>
            <p>Total a Pagar: **${total().toFixed(2)}**</p>            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button 
                onClick={handleCrearPedido}
                disabled={cargando || carrito.length === 0}
            >
                {cargando ? 'Procesando...' : 'Confirmar y Pagar'}
            </button>
        </div>
    );
}

export default TerminarComprar;