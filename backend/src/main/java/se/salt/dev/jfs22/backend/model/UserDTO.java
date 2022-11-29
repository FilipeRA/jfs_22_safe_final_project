package se.salt.dev.jfs22.backend.model;

public record UserDTO(
        String userName,
        String userEmail,
        String userImage
) {
}
