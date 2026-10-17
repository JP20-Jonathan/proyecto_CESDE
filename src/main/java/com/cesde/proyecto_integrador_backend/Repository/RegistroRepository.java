package com.cesde.proyecto_integrador_backend.Repository;

import com.cesde.proyecto_integrador_backend.model.Registro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RegistroRepository extends JpaRepository<Registro, UUID> {

    boolean existsByIdUsuarioAndIdReto(UUID idUsuario, UUID idReto);
}
