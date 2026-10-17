package com.cesde.proyecto_integrador_backend.model;

import com.cesde.proyecto_integrador_backend.enums.EstadoRegistro;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table (name = "REGISTRO",
// Creo la restricción UNIQUE en la BDD que respalda la regla de negocio del 409 (no duplicar usuario+reto)
uniqueConstraints = @UniqueConstraint (columnNames ={"id_usuario", "id_reto"}))

public class Registro {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotNull(message = "La fecha de registro es obligatoria")
    @Column(name = "fecha_registro", nullable = false)
    private LocalDateTime fechaRegistro;

    @NotBlank(message = "La observación es obligatoria")
    @Column(name = "observacion", nullable = false)
    private String observacion;

    @NotNull(message = "El estado es obligatorio")
    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    private EstadoRegistro estado;

    @NotNull(message = "El usuario es obligatorio")
    @Column(name = "id_usuario", nullable = false)
    private UUID idUsuario;          // UUID futuramente se reemplazará por @ManyToOne para relacionar

    @NotNull(message = "El reto es obligatorio")
    @Column(name = "id_reto", nullable = false)
    private UUID idReto;            // UUID futuramente se reemplazará por @ManyToOne para relacionar


    public Registro() {
    }

    public Registro(UUID id, LocalDateTime fechaRegistro, String observacion, EstadoRegistro estado, UUID idUsuario, UUID idReto) {
        this.id = id;
        this.fechaRegistro = fechaRegistro;
        this.observacion = observacion;
        this.estado = estado;
        this.idUsuario = idUsuario;
        this.idReto = idReto;
    }

    public UUID getId() {
        return id;
    }

    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }

    public String getObservacion() {
        return observacion;
    }

    public EstadoRegistro getEstado() {
        return estado;
    }

    public UUID getIdUsuario() {
        return idUsuario;
    }

    public UUID getIdReto() {
        return idReto;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public void setEstado(EstadoRegistro estado) {
        this.estado = estado;
    }

    public void setIdUsuario(UUID idUsuario) {
        this.idUsuario = idUsuario;
    }

    public void setIdReto(UUID idReto) {
        this.idReto = idReto;
    }
}


