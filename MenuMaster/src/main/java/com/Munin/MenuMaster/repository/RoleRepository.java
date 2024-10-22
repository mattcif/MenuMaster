package com.Munin.MenuMaster.repository;

import com.Munin.MenuMaster.model.AppRole;
import com.Munin.MenuMaster.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByRoleName(AppRole appRole);

}
