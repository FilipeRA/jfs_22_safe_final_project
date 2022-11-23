package se.salt.dev.jfs22.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.salt.dev.jfs22.backend.model.Professional;
import se.salt.dev.jfs22.backend.model.ProfessionalDTO;
import se.salt.dev.jfs22.backend.model.User;
import se.salt.dev.jfs22.backend.model.UserDTO;
import se.salt.dev.jfs22.backend.repository.ProfessionalRepository;
import se.salt.dev.jfs22.backend.repository.UserRepository;

import java.util.List;

@Service
public class AppService {

    @Autowired
    ProfessionalRepository proRepo;

    @Autowired
    UserRepository userRepo;

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

    public Professional getSpecificProfessional(String id) {
        return proRepo.findProfessionalById(id);
    }

    public User getSpecificUser(UserDTO userDTO) {
        if (userRepo.findUserByEmail(userDTO.userEmail()) == null) {
            User newUser = new User(
                    userDTO.userName(),
                    userDTO.userEmail());
            return userRepo.save(newUser);
        }

        return userRepo.findUserByEmail(userDTO.userEmail());
    }

    public User addUser(UserDTO userDTO) {
        if (userRepo.findUserByEmail(userDTO.userEmail()) == null) {
            User newUser = new User(
                    userDTO.userName(),
                    userDTO.userEmail());
            return userRepo.save(newUser);
        }

        return userRepo.findUserByEmail(userDTO.userEmail());
    }
}
