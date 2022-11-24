package se.salt.dev.jfs22.backend.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import se.salt.dev.jfs22.backend.model.Professional;

import java.util.List;

@Repository
public class ProfessionalRepository {

    @Autowired
    JpaProfessionalRepository proRepo;

    public Professional save(Professional newProfessional) {
        return proRepo.save(newProfessional);
    }

    public List<Professional> findAll() {
        List<Professional> allProfessionals = proRepo.findAll();
        return allProfessionals;
    }

    public Professional findProfessionalById(String id) {
        return proRepo.findProfessionalById(id);
    }
}
