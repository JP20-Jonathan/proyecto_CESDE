package com.cesde.proyecto_integrador_backend.service;

import com.cesde.proyecto_integrador_backend.Repository.RegistroRepository;
import com.cesde.proyecto_integrador_backend.model.Registro;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class RegistroService {

    @Autowired
    RegistroRepository registroRepository;


public Registro guardarRegistro(Registro registro){
    if (registroRepository.existsByIdUsuarioAndIdReto(registro.getIdUsuario(), registro.getIdReto())){
        throw new ResponseStatusException(HttpStatus.CONFLICT, "El usuario ya esta inscrito en este reto");
    }
    return registroRepository.save(registro);
}

public Registro buscarRegistroPorId(UUID id){
    return registroRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Registro no encontrado"));
}

public String borrarRegistro(UUID id){
    if (!registroRepository.existsById(id)){
        throw new RuntimeException(("Registro no encontrado"));
    }
    registroRepository.deleteById(id);
    return "Registro eliminado";
}

public List<Registro> listarRegistros(){
    return registroRepository.findAll();
}

public Registro actualizarRegistro(UUID id, Registro registro){
    Registro reg = registroRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Registro no encontrado"));

    reg.setFechaRegistro(registro.getFechaRegistro());
    reg.setObservacion(registro.getObservacion());
    reg.setEstado(registro.getEstado());
    reg.setIdUsuario(registro.getIdUsuario());
    reg.setIdReto(registro.getIdReto());

    return registroRepository.save(reg);
}


}