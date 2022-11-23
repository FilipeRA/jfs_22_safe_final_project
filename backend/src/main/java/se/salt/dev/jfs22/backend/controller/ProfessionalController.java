package se.salt.dev.jfs22.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.salt.dev.jfs22.backend.model.Professional;
import se.salt.dev.jfs22.backend.model.ProfessionalDTO;
import se.salt.dev.jfs22.backend.service.AppService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/professionals")
public class ProfessionalController {

    @Autowired
    AppService service;

    @GetMapping
    ResponseEntity<List<Professional>> getProfessionals() {
        List<Professional> professionals = service.getProfessionals();
        return ResponseEntity.ok(professionals);
    }

    @GetMapping("/{id}")
    ResponseEntity<Professional> getSpecificRecipe(@PathVariable String id) {
        Professional specificProfessional = service.getSpecificProfessional(id);
        return ResponseEntity.ok(specificProfessional);
    }

    @PostMapping
    ResponseEntity<Professional> addProfessional(@RequestBody ProfessionalDTO professionalDTO) {
        Professional createdProfessional = service.addProfessional(professionalDTO);
        return ResponseEntity.ok(createdProfessional);
    }


}
