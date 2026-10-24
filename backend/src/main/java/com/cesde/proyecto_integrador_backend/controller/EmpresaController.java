package com.cesde.proyecto_integrador_backend.controller;


import com.cesde.proyecto_integrador_backend.model.Empresa;
import com.cesde.proyecto_integrador_backend.service.EmpresaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1/empresa")
public class EmpresaController {

    @Autowired
    EmpresaService empresaService;

    @PostMapping
    public Empresa guardarEmpresa(@Valid @RequestBody Empresa empresa){
       return empresaService.guardarEmpresa(empresa);
    }

    @GetMapping("/{id}")
    public Empresa buscarEmpresaPorId(@PathVariable UUID id){
        return empresaService.buscarEmpresaPorId(id);
    }

    @DeleteMapping("/{id}")
    public String borrarEmpresaPorId(@PathVariable UUID id){
        empresaService.borrarEmpresa(id);
        return "Se ha borrado con Exito";
    }

    @GetMapping("/empresas")
    public List<Empresa> listarEmpresas (){
        return empresaService.listarEmpresas();
    }

    @PutMapping("/actualizar/{id}")
    public Empresa actualizarEmpresa (@PathVariable UUID id, @Valid @RequestBody Empresa empresa){
        return empresaService.actualizarEmpresa(id, empresa);
    }
}
