package com.fireemblem.heroes.service;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fireemblem.heroes.models.User;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByUsername(String username);

}
