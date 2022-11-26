package se.salt.dev.jfs22.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.salt.dev.jfs22.backend.model.*;
import se.salt.dev.jfs22.backend.service.AppService;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    AppService service;

    @GetMapping("/{userEmail}")
    ResponseEntity<User> getUser(@PathVariable String userEmail) {
        User user = service.getUser(userEmail);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/history/{userEmail}")
    ResponseEntity<UserHistory> getLastUserHistory(@PathVariable String userEmail) {
        UserHistory lastUserHistory = service.getLastUserHistory(userEmail);
        return ResponseEntity.ok(lastUserHistory);
    }

    @PostMapping
    ResponseEntity<UserResDTO> addUser(@RequestBody UserDTO userDTO) {
        UserResDTO createdUser = service.addUser(userDTO);
        return ResponseEntity.ok(createdUser);
    }

    @PatchMapping("/addressChange/{userEmail}")
    ResponseEntity<UserResDTO> changeUserAddress(@PathVariable String userEmail, @RequestBody UserAddressDTO userAddress) {
        UserResDTO createdUser = service.changeUserAddress(userEmail, userAddress);
        return ResponseEntity.ok(createdUser);
    }

    @PatchMapping("/{userEmail}")
    ResponseEntity<UserHistory> updateUserHistory(@PathVariable String userEmail, @RequestBody UserHistoryDTO userHistoryDTO) {
        UserHistory updatedUser = service.updateUserHistory(userEmail, userHistoryDTO);
        return ResponseEntity.ok(updatedUser);
    }
}
