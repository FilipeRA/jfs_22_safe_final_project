package se.salt.dev.jfs22.backend.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import se.salt.dev.jfs22.backend.model.User;
import se.salt.dev.jfs22.backend.model.UserHistory;

@Repository
public class UserRepository {

    @Autowired
    JpaUserRepository userRepo;

    public User findUserByEmail(String email) {
        return userRepo.findUserByUserEmail(email);
    }

    public User save(User newUser) {
        return userRepo.save(newUser);
    }

    public UserHistory updateUserHistoryByEmail(String userEmail, UserHistory userHistory) {
        User userToUpdate = userRepo.findUserByUserEmail(userEmail);
        userToUpdate.getUserHistory().add(userHistory);
        userRepo.save(userToUpdate);
        return userHistory;
    }
}
