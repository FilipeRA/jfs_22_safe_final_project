package se.salt.dev.jfs22.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.salt.dev.jfs22.backend.model.Professional;
import se.salt.dev.jfs22.backend.model.ProfessionalDTO;
import se.salt.dev.jfs22.backend.repository.ProfessionalRepository;

import java.util.List;

@Service
public class AppService {

    @Autowired
    ProfessionalRepository proRepo;

    public Professional addProfessional(ProfessionalDTO professionalDTO) {
        Professional newProfessional = new Professional(
                professionalDTO.professionalName(),
                professionalDTO.professionalAddress(),
                professionalDTO.professionalService()
        );
        return proRepo.save(newProfessional);
    }

    public List<Professional> getProfessionals() {
        return proRepo.findAll();
    }
}
