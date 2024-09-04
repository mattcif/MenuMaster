package com.Munin.MenuMaster.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String login;
    private String token;
}
