package com.Munin.MenuMaster.mappers;

import com.Munin.MenuMaster.dto.SignUpDto;
import com.Munin.MenuMaster.dto.UserDto;
import com.Munin.MenuMaster.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto userDto);
}
