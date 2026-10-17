package com.cesde.proyecto_integrador_backend.Repository;

import java.util.UUID;
import com.cesde.proyecto_integrador_backend.model.Reto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository 
public interface RetoRepository  extends JpaRepository<Reto, UUID>{
    
}
