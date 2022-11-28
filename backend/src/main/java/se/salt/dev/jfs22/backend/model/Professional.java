package se.salt.dev.jfs22.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.ArrayList;
import java.util.List;

@Document("professionals")
public class Professional {
    @Id
    @MongoId(value = FieldType.OBJECT_ID)
    private String id;
    private String professionalName;
    private String professionalAddress;
    private String professionalService;
    private String professionalRating;
    private long professionalPrice;
    private String professionalImage;
    private List<ProfessionalHistory> professionalHistory = new ArrayList<>();


    public Professional() {
    }

    public Professional(String professionalName, String professionalAddress, String professionalService) {
        this.professionalName = professionalName;
        this.professionalAddress = professionalAddress;
        this.professionalService = professionalService;
    }

    public Professional(String professionalName, String professionalAddress, String professionalService, String professionalRating, long professionalPrice, String professionalImage) {
        this.professionalName = professionalName;
        this.professionalAddress = professionalAddress;
        this.professionalService = professionalService;
        this.professionalRating = professionalRating;
        this.professionalPrice = professionalPrice;
        this.professionalImage = professionalImage;
    }

    public Professional(String professionalName, String professionalAddress, String professionalService, String professionalRating, long professionalPrice) {
        this.professionalName = professionalName;
        this.professionalAddress = professionalAddress;
        this.professionalService = professionalService;
        this.professionalRating = professionalRating;
        this.professionalPrice = professionalPrice;
    }

    public Professional(String id, String professionalName, String professionalAddress, String professionalService, String professionalRating, long professionalPrice) {
        this.id = id;
        this.professionalName = professionalName;
        this.professionalAddress = professionalAddress;
        this.professionalService = professionalService;
        this.professionalRating = professionalRating;
        this.professionalPrice = professionalPrice;
    }

    public Professional(String id, String professionalName, String professionalAddress, String professionalService, String professionalRating, long professionalPrice, List<UserHistory> userHistory) {
        this.id = id;
        this.professionalName = professionalName;
        this.professionalAddress = professionalAddress;
        this.professionalService = professionalService;
        this.professionalRating = professionalRating;
        this.professionalPrice = professionalPrice;
        this.professionalHistory = professionalHistory;
    }



    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProfessionalName() {
        return professionalName;
    }

    public void setProfessionalName(String professionalName) {
        this.professionalName = professionalName;
    }

    public String getProfessionalAddress() {
        return professionalAddress;
    }

    public void setProfessionalAddress(String professionalAddress) {
        this.professionalAddress = professionalAddress;
    }

    public String getProfessionalService() {
        return professionalService;
    }

    public void setProfessionalService(String professionalService) {
        this.professionalService = professionalService;
    }

    public String getProfessionalRating() {
        return professionalRating;
    }

    public void setProfessionalRating(String professionalRating) {
        this.professionalRating = professionalRating;
    }

    public long getProfessionalPrice() {
        return professionalPrice;
    }

    public void setProfessionalPrice(long professionalPrice) {
        this.professionalPrice = professionalPrice;
    }

    public List<ProfessionalHistory> getProfessionalHistory() {
        return professionalHistory;
    }

    public void setProfessionalHistory(List<ProfessionalHistory> professionalHistory) {
        this.professionalHistory = professionalHistory;
    }

    public String getProfessionalImage() {
        return professionalImage;
    }

    public void setProfessionalImage(String professionalImage) {
        this.professionalImage = professionalImage;
    }


    @Override
    public String toString() {
        return "Professional{" +
                "id='" + id + '\'' +
                ", professionalName='" + professionalName + '\'' +
                ", professionalAddress='" + professionalAddress + '\'' +
                ", professionalService='" + professionalService + '\'' +
                ", professionalRating='" + professionalRating + '\'' +
                ", professionalPrice=" + professionalPrice +
                ", professionalImage='" + professionalImage + '\'' +
                ", professionalHistory=" + professionalHistory +
                '}';
    }
}
