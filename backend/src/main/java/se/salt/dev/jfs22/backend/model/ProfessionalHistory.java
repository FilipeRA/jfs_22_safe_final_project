package se.salt.dev.jfs22.backend.model;

import java.util.UUID;

public class ProfessionalHistory {
    private String historyId = UUID.randomUUID().toString();
    private String userId;
    private String userName;
    private String userService;

    public ProfessionalHistory() {
    }

    public ProfessionalHistory(String userId, String userName, String userService) {
        this.userId = userId;
        this.userName = userName;
        this.userService = userService;
    }

    public String getHistoryId() {
        return historyId;
    }

    public void setHistoryId(String historyId) {
        this.historyId = historyId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserService() {
        return userService;
    }

    public void setUserService(String userService) {
        this.userService = userService;
    }

    @Override
    public String toString() {
        return "ProfessionalHistory{" +
                "historyId='" + historyId + '\'' +
                ", userId='" + userId + '\'' +
                ", userName='" + userName + '\'' +
                ", userService='" + userService + '\'' +
                '}';
    }
}
