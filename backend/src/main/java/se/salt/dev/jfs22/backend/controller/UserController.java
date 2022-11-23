package se.salt.dev.jfs22.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.salt.dev.jfs22.backend.model.User;
import se.salt.dev.jfs22.backend.model.UserDTO;
import se.salt.dev.jfs22.backend.service.AppService;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    AppService service;

    @GetMapping
    ResponseEntity<User> getSpecificUser(@RequestBody UserDTO userDTO) {
        User specificUser = service.getSpecificUser(userDTO);
        return ResponseEntity.ok(specificUser);
    }

    @PostMapping
    ResponseEntity<User> addUser(@RequestBody UserDTO userDTO) {
        User createdUser = service.addUser(userDTO);
        return ResponseEntity.ok(createdUser);
    }
}
