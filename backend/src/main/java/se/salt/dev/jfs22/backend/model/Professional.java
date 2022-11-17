package se.salt.dev.jfs22.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document("professionals")
public class Professional {
    @Id
    @MongoId(value = FieldType.OBJECT_ID)
    private String id;

}
