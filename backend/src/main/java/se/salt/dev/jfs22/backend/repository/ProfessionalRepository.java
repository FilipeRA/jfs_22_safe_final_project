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
        System.out.println("This prints");
        List<Professional> allProfessionals = proRepo.findAll();
        System.out.println(allProfessionals);
        return allProfessionals;
    }
}
