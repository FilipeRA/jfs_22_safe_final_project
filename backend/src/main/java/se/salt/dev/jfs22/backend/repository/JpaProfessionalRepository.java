package se.salt.dev.jfs22.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import se.salt.dev.jfs22.backend.model.Professional;

public interface JpaProfessionalRepository extends MongoRepository<Professional, String>  {
}
