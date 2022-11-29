package se.salt.dev.jfs22.backend.model;

public record UserHistoryDTO(
        String userName,
        String userEmail,
        String userImage,
        String professionalId,
        String professionalName,
        String professionalService,
        long totalServicePrice,
        String professionalImage
) {
}
