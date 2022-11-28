package se.salt.dev.jfs22.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.salt.dev.jfs22.backend.model.*;
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
                professionalDTO.professionalService(),
                professionalDTO.professionalRating(),
                professionalDTO.professionalPrice(),
                professionalDTO.professionalImage()
        );
        return proRepo.save(newProfessional);
    }

    public List<Professional> getProfessionals() {
        return proRepo.findAll();
    }

    public Professional getSpecificProfessional(String id) {
        return proRepo.findProfessionalById(id);
    }

    public User getUser(String userEmail) {
        return userRepo.findUserByEmail(userEmail);
    }

    public UserResDTO addUser(UserDTO userDTO) {
        if (userRepo.findUserByEmail(userDTO.userEmail()) == null) {
            User newUser = new User(
                    userDTO.userName(),
                    userDTO.userEmail());
            User createdUser = userRepo.save(newUser);

            List<UserHistory> userHistories = createdUser.getUserHistory().stream()
                    .map(userHistory -> new UserHistory(
                            userHistory.getProfessionalId(),
                            userHistory.getProfessionalName(),
                            userHistory.getProfessionalService(),
                            userHistory.getTotalServicePrice(),
                            userHistory.getProfessionalImage()))
                    .toList();

            UserResDTO userResDTO = new UserResDTO(
                    createdUser.getId(),
                    createdUser.getUserName(),
                    createdUser.getUserEmail(),
                    createdUser.getUserAddress(),
                    createdUser.getUserRating(),
                    createdUser.getUserImage(),
                    userHistories
            );

            return userResDTO;
        }

        User user = userRepo.findUserByEmail(userDTO.userEmail());

        List<UserHistory> userHistories = user.getUserHistory().stream()
                .map(userHistory -> new UserHistory(
                        userHistory.getHistoryId(),
                        userHistory.getProfessionalId(),
                        userHistory.getProfessionalName(),
                        userHistory.getProfessionalService(),
                        userHistory.getTotalServicePrice(),
                        userHistory.getProfessionalImage()))
                .toList();

        return new UserResDTO(
                user.getId(),
                user.getUserName(),
                user.getUserEmail(),
                user.getUserAddress(),
                user.getUserRating(),
                user.getUserImage(),
                userHistories
        );

    }

    public UserHistory updateUserHistory(String userEmail, UserHistoryDTO userHistoryDTO) {
        if (userRepo.findUserByEmail(userEmail) == null) {
            User newUser = new User(
                    userHistoryDTO.userName(),
                    userHistoryDTO.userEmail());
            userRepo.save(newUser);
        }

        UserHistory userHistory = new UserHistory(
                userHistoryDTO.professionalId(),
                userHistoryDTO.professionalName(),
                userHistoryDTO.professionalService(),
                userHistoryDTO.totalServicePrice(),
                userHistoryDTO.professionalImage()
        );

        UserHistory savedUserHistory = userRepo.updateUserHistoryByEmail(userEmail, userHistory);

        User updatedUser = userRepo.findUserByEmail(userEmail);

        ProfessionalHistory proHistory = new ProfessionalHistory(
                updatedUser.getId(),
                updatedUser.getUserName(),
                savedUserHistory.getProfessionalService()
        );

        Professional pro = proRepo.updateProfessionalHistoryByProfessionalId(userHistory.getProfessionalId(), proHistory);

        System.out.println(pro);

        return savedUserHistory;
    }

    public UserHistory getLastUserHistory(String userEmail) {
        User user = userRepo.findUserByEmail(userEmail);
        return user.getUserHistory().get(user.getUserHistory().size() - 1);
    }

    public UserResDTO changeUserAddress(String userEmail, UserAddressDTO userAddressDTO) {
        User userToUpdate = userRepo.findUserByEmail(userEmail);
        userToUpdate.setUserAddress(userAddressDTO.userAddress());

        User updatedUser = userRepo.save(userToUpdate);

        return new UserResDTO(
                updatedUser.getId(),
                updatedUser.getUserName(),
                updatedUser.getUserEmail(),
                updatedUser.getUserAddress(),
                updatedUser.getUserRating(),
                updatedUser.getUserImage(),
                updatedUser.getUserHistory()
        );
    }
}
