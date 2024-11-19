package com.Munin.MenuMaster;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
		"com.Munin.MenuMaster.service",
		"com.Munin.MenuMaster.controller",
		"com.Munin.MenuMaster.security",
		"com.Munin.MenuMaster.util"
})
public class MenuMasterApplication {

	public static void main(String[] args) {
		SpringApplication.run(MenuMasterApplication.class, args);
	}

}
