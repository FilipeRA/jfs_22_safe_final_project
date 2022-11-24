package se.salt.dev.jfs22.backend.model;

import java.util.List;

public record UserResDTO(
        String id,
        String userName,
        String userEmail,
        String userAddress,
        int userRating,
        String userImage,
        List<UserHistory>userHistory
) {
}
