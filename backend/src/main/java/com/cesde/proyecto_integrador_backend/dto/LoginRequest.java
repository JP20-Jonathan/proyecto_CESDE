package com.cesde.proyecto_integrador_backend.dto;

import jakarta.validation.constraints.NotBlank;

// Datos que llegan al iniciar sesión
public record LoginRequest(
        @NotBlank(message = "El correo es obligatorio") String correo,
        @NotBlank(message = "La contraseña es obligatoria") String contrasena) {
}
