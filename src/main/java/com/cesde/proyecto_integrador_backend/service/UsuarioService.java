package com.cesde.proyecto_integrador_backend.service;

import com.cesde.proyecto_integrador_backend.Repository.UsuarioRepository;
import com.cesde.proyecto_integrador_backend.dto.LoginRequest;
import com.cesde.proyecto_integrador_backend.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    // Cifra las contraseñas para no guardarlas en texto plano
    BCryptPasswordEncoder cifrador = new BCryptPasswordEncoder();

    public Usuario registrar(Usuario usuario) {
        if (usuarioRepository.existsByCorreo(usuario.getCorreo())) {
            throw new RuntimeException("Ya existe un usuario con ese correo");
        }
        usuario.setContrasena(cifrador.encode(usuario.getContrasena()));
        return usuarioRepository.save(usuario);
    }

    public Usuario iniciarSesion(LoginRequest datos) {
        Usuario usuario = usuarioRepository.findByCorreo(datos.correo())
                .orElseThrow(() -> new RuntimeException("Correo o contraseña incorrectos"));

        if (!cifrador.matches(datos.contrasena(), usuario.getContrasena())) {
            throw new RuntimeException("Correo o contraseña incorrectos");
        }
        return usuario;
    }
}
