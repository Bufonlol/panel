package com.siradepanel.panel.repository;


import com.siradepanel.panel.entity.Hospital;
import com.siradepanel.panel.entity.User;
import com.siradepanel.panel.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByHospital(Hospital hospital);
    List<User> findByRole(UserRole role);
    boolean existsByEmail(String email);
}