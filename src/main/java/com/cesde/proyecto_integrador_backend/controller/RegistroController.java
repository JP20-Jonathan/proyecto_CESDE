package com.cesde.proyecto_integrador_backend.controller;

import com.cesde.proyecto_integrador_backend.model.Registro;
import com.cesde.proyecto_integrador_backend.service.RegistroService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/registro")
public class RegistroController {

    @Autowired
    RegistroService registroService;

    @PostMapping
    public Registro guardarRegistro(@Valid @RequestBody Registro registro) {
        return registroService.guardarRegistro(registro);
    }

    @GetMapping("/{id}")
    public Registro buscarRegistroPorId(@PathVariable UUID id) {
        return registroService.buscarRegistroPorId(id);
    }

    @GetMapping("/registros")
    public List<Registro> listarRegistros() {
        return registroService.listarRegistros();
    }

    @DeleteMapping("/{id}")
    public String borrarRegistroPorId(@PathVariable UUID id) {
        registroService.borrarRegistro(id);
        return "El Registro ha sido eliminado correctamente";
    }

    @PutMapping("/actualizar/{id}")
    public Registro actualizarRegistro(@PathVariable UUID id, @Valid @RequestBody Registro registro) {
        return registroService.actualizarRegistro(id, registro);
    }
}
