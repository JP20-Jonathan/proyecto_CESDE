# Proyecto Integrador CESDE

Plataforma de retos empresariales para CESDE: las empresas publican retos, los estudiantes se postulan y CESDE acompaña todo el proceso.

Monorepo que junta el frontend y el backend del proyecto (cada uno conserva su historial completo de commits).

## Estructura

```
.
├── frontend/   React + Vite
└── backend/    Spring Boot + MySQL
```

## Stack

- **Frontend:** React 19, Vite
- **Backend:** Spring Boot, Spring Data JPA, MySQL, BCrypt
- **Arquitectura:** *screaming architecture* en el frontend (cada carpeta de `modules` es una parte del negocio); API REST en el backend

## Ejecutar

Backend:
```
cd backend
./mvnw spring-boot:run
```

Frontend:
```
cd frontend
npm install
npm run dev
```
