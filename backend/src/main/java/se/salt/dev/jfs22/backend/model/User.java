package se.salt.dev.jfs22.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.ArrayList;
import java.util.List;

@Document("users")
public class User {
    @Id
    @MongoId(value = FieldType.OBJECT_ID)
    private String id;
    private String userName;
    private String userEmail;
    private String userAddress;
    private int userRating;
    private String userImage;
    private List<UserHistory> userHistory = new ArrayList<>();

    public User() {
    }

    public User(String userName, String userEmail) {
        this.userName = userName;
        this.userEmail = userEmail;
    }

    public User(String userName, String userEmail, String userAddress, int userRating, String userImage, List<UserHistory> userHistory) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userAddress = userAddress;
        this.userRating = userRating;
        this.userImage = userImage;
        this.userHistory = userHistory;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserAddress() {
        return userAddress;
    }

    public void setUserAddress(String userAddress) {
        this.userAddress = userAddress;
    }

    public int getUserRating() {
        return userRating;
    }

    public void setUserRating(int userRating) {
        this.userRating = userRating;
    }

    public String getUserImage() {
        return userImage;
    }

    public void setUserImage(String userImage) {
        this.userImage = userImage;
    }

    public List<UserHistory> getUserHistory() {
        return userHistory;
    }

    public void setUserHistory(List<UserHistory> userHistory) {
        this.userHistory = userHistory;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", userName='" + userName + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", userAddress='" + userAddress + '\'' +
                ", userRating=" + userRating +
                ", userImage='" + userImage + '\'' +
                ", userHistory=" + userHistory +
                '}';
    }
}



//History
//        Professional ID
//        Name
//        Service
//        TotalPrice