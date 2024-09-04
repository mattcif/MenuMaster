package com.Munin.MenuMaster.config;

import com.Munin.MenuMaster.mappers.UserMapper;
import com.Munin.MenuMaster.mappers.UserMapperImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig {
    @Bean
    public UserMapper userMapper() {
        return new UserMapperImpl();
    }
}
