# Portal de Capacitaciones

Este proyecto es un **Portal de Capacitaciones** desarrollado con **React (frontend)** y **Node.js + Express + MongoDB Atlas (backend)**.  
Incluye módulos de autenticación, gestión de cursos, inscripciones y reportes, con un dashboard diferenciado para **administradores** y **estudiantes**.

---

## Tecnologías utilizadas
### Frontend
- React + Hooks
- Axios (para consumir API)
- React Router (navegación)
- LocalStorage (persistencia de sesión)

### Backend
- Node.js + Express
- MongoDB Atlas (Mongoose ODM)
- JWT (Json Web Token) para autenticación
- Bcrypt para encriptación de contraseñas
- CORS para comunicación con frontend

---

## Estructura del proyecto

portal-capacitaciones/ │ README.md │ ├───frontend │ └───src │ │ App.js │ │ │ └───modules │ │ usuarios.js │ │ dashboard.js │ │ cursos.js │ │ inscripciones.js │ │ reportes.js │ └───backend │ server.js │ .env │ package.json │ ├───models │ Usuario.js │ Curso.js │ Inscripcion.js │ ├───routes │ auth.js │ cursos.js │ inscripciones.js │ reportes.js │ └───middleware auth.js


---

## Instalación

### 1. Clonar el repositorio
```bash
git clone <url-del-repo>
cd portal-capacitaciones

2. Instalar dependencias

cd backend
npm install


cd frontend
npm install


Configurar variables de entorno

MONGO_URI="mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/portal"
JWT_SECRET="clave_secreta"
PORT=4000

Ejecución

cd backend
npm run dev

Servidor disponible en:

http://localhost:4000

Frontend

cd frontend
npm start

Aplicación disponible en:

http://localhost:3000

Endpoints principales (Backend)
Autenticación
POST /api/auth/register → Registrar usuario

POST /api/auth/login → Iniciar sesión y obtener token

Cursos
GET /api/cursos → Listar cursos

POST /api/cursos → Crear curso (requiere token)

DELETE /api/cursos/:id → Eliminar curso (requiere token)

Inscripciones
POST /api/inscripciones → Inscribirse en un curso (requiere token)

GET /api/inscripciones → Listar inscripciones (admin ve todas, estudiante solo las suyas)

Reportes
GET /api/reportes/admin → Estadísticas globales (solo admin)

GET /api/reportes/estudiante → Cursos inscritos del estudiante

Pruebas
Puedes probar los endpoints usando:

Thunder Client (extensión para VS Code)

Insomnia

cURL desde la terminal

Ejemplo con cURL:

curl -X GET http://localhost:4000/api/cursos
