#  Hermanos Jota — Proyecto

Sitio web para la mueblería Hermanos Jota, desarrollado con React + Vite en el frontend y Express + MongoDB en el backend. Incluye catálogo de productos, carrito, filtros de búsqueda respetando el manual de marca.

---

##  Sitios desplegados

- **Frontend (Vercel):** [https://muebleriahermaanosjota.vercel.app](https://muebleriahermaanosjota.vercel.app)
- **Backend (Render):** [https://hermanosjota3.onrender.com](https://hermanosjota3.onrender.com)

---

##  Variables de entorno para desarrollo local

###  Backend (`/backend`)

Crear un archivo `.env` en la carpeta `backend/` con el siguiente contenido:

```env
PORT=4000
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<nombreDB>?retryWrites=true&w=majority
```

>  Asegurate de que tu IP esté habilitada en MongoDB Atlas o agregá `0.0.0.0/0` para desarrollo.

---

###  Frontend (`/client`)

Si usás variables de entorno en el frontend, crear un archivo `.env` en `client/` con:

```env
VITE_API_URL=http://localhost:4000/api
```

>  En producción, el frontend ya apunta al backend desplegado en Render.

---

##  Cómo correr el proyecto en local

### 1. Clonar el repositorio

```bash
git clone https://github.com/camrdri/HermanosJota3
cd HermanosJota3
```

### 2. Instalar dependencias

```bash
cd backend
npm install

cd ../client
npm install
```

### 3. Correr el backend

```bash
cd backend
npm run dev
```

### 4. Correr el frontend

```bash
cd client
npm run dev
```

