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

    // Relación: muchos registros pertenecen a un usuario
    @NotNull(message = "El usuario es obligatorio")
    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    // Relación: muchos registros pertenecen a un reto
    @NotNull(message = "El reto es obligatorio")
    @ManyToOne
    @JoinColumn(name = "id_reto", nullable = false)
    private Reto reto;


    public Registro() {
    }

    public Registro(UUID id, LocalDateTime fechaRegistro, String observacion, EstadoRegistro estado, Usuario usuario, Reto reto) {
        this.id = id;
        this.fechaRegistro = fechaRegistro;
        this.observacion = observacion;
        this.estado = estado;
        this.usuario = usuario;
        this.reto = reto;
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

    public Usuario getUsuario() {
        return usuario;
    }

    public Reto getReto() {
        return reto;
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

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public void setReto(Reto reto) {
        this.reto = reto;
    }
}


