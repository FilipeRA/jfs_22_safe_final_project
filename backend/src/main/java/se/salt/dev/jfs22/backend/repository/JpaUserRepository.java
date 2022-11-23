package se.salt.dev.jfs22.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import se.salt.dev.jfs22.backend.model.User;

public interface JpaUserRepository extends MongoRepository<User, String> {
    User findUserByUserEmail(String email);
}
