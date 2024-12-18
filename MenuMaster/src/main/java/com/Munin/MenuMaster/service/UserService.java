package com.Munin.MenuMaster.service;

import com.Munin.MenuMaster.dto.UserDTO;
import com.Munin.MenuMaster.model.User;

import java.util.List;

public interface UserService {
    void updateUserRole(Long userId, String roleName);

    List<User> getAllUsers();

    UserDTO getUserById(Long id);


    User findByUsername(String username);

    void generatePasswordResetToken(String email);

    void resetPassword(String token, String newPassword);
}
