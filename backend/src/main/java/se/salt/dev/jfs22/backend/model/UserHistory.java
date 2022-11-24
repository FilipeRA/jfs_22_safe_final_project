package se.salt.dev.jfs22.backend.model;

import java.util.UUID;

public class UserHistory {
    private String historyId = UUID.randomUUID().toString();
    private String professionalId;
    private String professionalName;
    private String professionalService;
    private long totalServicePrice;

    public UserHistory() {
    }

    public UserHistory(String professionalId, String professionalName, String professionalService, long totalServicePrice) {
        this.professionalId = professionalId;
        this.professionalName = professionalName;
        this.professionalService = professionalService;
        this.totalServicePrice = totalServicePrice;
    }

    public UserHistory(String historyId, String professionalId, String professionalName, String professionalService, long totalServicePrice) {
        this.historyId = historyId;
        this.professionalId = professionalId;
        this.professionalName = professionalName;
        this.professionalService = professionalService;
        this.totalServicePrice = totalServicePrice;
    }

    public String getHistoryId() {
        return historyId;
    }

    public void setHistoryId(String historyId) {
        this.historyId = historyId;
    }

    public String getProfessionalId() {
        return professionalId;
    }

    public void setProfessionalId(String professionalId) {
        this.professionalId = professionalId;
    }

    public String getProfessionalName() {
        return professionalName;
    }

    public void setProfessionalName(String professionalName) {
        this.professionalName = professionalName;
    }

    public String getProfessionalService() {
        return professionalService;
    }

    public void setProfessionalService(String professionalService) {
        this.professionalService = professionalService;
    }

    public long getTotalServicePrice() {
        return totalServicePrice;
    }

    public void setTotalServicePrice(long totalServicePrice) {
        this.totalServicePrice = totalServicePrice;
    }

    @Override
    public String toString() {
        return "UserHistory{" +
                "historyId='" + historyId + '\'' +
                ", professionalId='" + professionalId + '\'' +
                ", professionalName='" + professionalName + '\'' +
                ", professionalService='" + professionalService + '\'' +
                ", totalServicePrice=" + totalServicePrice +
                '}';
    }
}
