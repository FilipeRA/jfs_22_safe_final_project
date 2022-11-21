package se.salt.dev.jfs22.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import se.salt.dev.jfs22.backend.model.Professional;

import java.util.List;

public interface JpaProfessionalRepository extends MongoRepository<Professional, String>  {
}
