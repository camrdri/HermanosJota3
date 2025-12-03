import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api'; 

function Perfil() {
    const { currentUser, logout } = useContext(AuthContext);
    const [pedidos, setPedidos] = useState([]);
    const [dato, setDato] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPerfil = async () => {
            const token = currentUser?.token;

            if (!token) {
                setCargando(false);
                return;}

            try {
                const perfilPromise = await fetch(`${API_URL}/perfil`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` 
                    },
                });

                const pedidosPromise = await fetch(`${API_URL}/pedidos`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` 
                    },
                });

                const [perfilResponse, pedidosResponse] = await Promise.all([perfilPromise, pedidosPromise]);

                if (perfilResponse.status === 401 || pedidosResponse.status === 401) {
                    logout();
                    throw new Error("Su sesión ha expirado. Por favor, vuelva a iniciar sesión.");
                }

                if (!perfilResponse.ok || !pedidosResponse.ok) {
                    throw new Error('Error al obtener datos del servidor.');
                }

            const perfilData = await perfilResponse.json();
            const pedidosData = await pedidosResponse.json();
                
            setDato(perfilData);
            setPedidos(pedidosData);

            } catch (err) {
                setError(err.message);
                console.error("Error al cargar el perfil:", err);
            } finally {
                setCargando(false);
            }
        };

        fetchPerfil();
    }, [currentUser, logout]); 

    if (cargando) return <div>Cargando perfil...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="perfil-container">
            <h2>Mi Perfil</h2>
            {dato ? (
                <div className="perfil-info">
                    <p><strong>Nombre:</strong> {dato.nombre || currentUser.nombre}</p>
                    <p><strong>Email:</strong> {dato.email || currentUser.email}</p>
                    <p><strong>Rol:</strong> {dato.rol || 'Cliente'}</p>
                    <hr/>
                    <h3>Mis Pedidos Recientes</h3>
                    {orders.length > 0 ? (
                        <ul className="pedidos-list">
                            {orders.map(order => (
                                <li key={order._id} className="pedido-item">
                                    <p><strong>Pedido No:</strong> {order._id.slice(-8)}</p>
                                    <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                    <p><strong>Total:</strong> **${order.totalAmount.toFixed(2)}**</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Aún no tienes pedidos registrados.</p>
                    )}
                    <button onClick={logout} className="btn-logout">Cerrar Sesión</button>
                </div>
            ) : (
                <p>No se encontraron datos de perfil.</p>
            )}
        </div>
    );
}

export default Perfil;