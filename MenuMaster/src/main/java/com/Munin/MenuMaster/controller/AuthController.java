package com.Munin.MenuMaster.controller;

import com.Munin.MenuMaster.config.UserAuthProvider;
import com.Munin.MenuMaster.dto.CredentialsDto;
import com.Munin.MenuMaster.dto.SignUpDto;
import com.Munin.MenuMaster.dto.UserDto;
import com.Munin.MenuMaster.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RequiredArgsConstructor
@RestController
public class AuthController {

    @Autowired
    private  UserService userService;
    @Autowired
    private  UserAuthProvider userAuthProvider;

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody CredentialsDto credentialsDto) {
        UserDto userDto = userService.login(credentialsDto);

        userDto.setToken(userAuthProvider.createToken(userDto.getLogin()));
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody SignUpDto sign) {
        UserDto user = userService.register(sign);
        user.setToken(userAuthProvider.createToken(user.getLogin()));
        return ResponseEntity.created(URI.create("/users/" + user.getId()))
                .body(user);
    }
}
