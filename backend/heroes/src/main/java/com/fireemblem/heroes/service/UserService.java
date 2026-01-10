package com.fireemblem.heroes.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fireemblem.heroes.config.JWTService;
import com.fireemblem.heroes.models.User;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

import jakarta.persistence.EntityNotFoundException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTService jwtService;
	
	@Transactional
    public String login(User user) {
		User loggedInUser = userRepository.findByUsername(user.getUsername()).orElseThrow(() -> new EntityNotFoundException());
		
        Authentication authentication = authenticationManager
            .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(loggedInUser);
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
	
	@Transactional
	public String register(User user) {
		Optional<User> users = userRepository.findByUsername(user.getUsername());
		
		if(users.isPresent()) {
			return "User already exists";
		}
		
		User newUser = new User();
		newUser.setUsername(user.getUsername());
		newUser.setPassword(passwordEncoder.encode(user.getPassword()));
		if(userRepository.count() == 0) {
			newUser.setRole("ADMIN");
		} else {
			newUser.setRole("USER");
		}
		
		userRepository.save(newUser);
		
		return "User created with id " + newUser.getId();
	}
	
	@Transactional
	public List<User> getAll() {
		return userRepository.findAll();
	}
	
	@Transactional
	public User changeRole(User user) {
		User existingUser = userRepository.findById(user.getId()).orElseThrow(() -> new EntityNotFoundException());
		if(user.getRole().equals("ADMIN") && userRepository.findByRole("ADMIN").size() <= 1) {
			throw new RuntimeException("There has to be always one Admin active");
		}
		if(user.getRole().equals("ADMIN")) {
			existingUser.setRole("USER");
		} else {
			existingUser.setRole("ADMIN");
		}
		return existingUser;
	}
	
	@Transactional
	public User delete(int id) {
		User user = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException());
		if(user.getRole().equals("ADMIN") && userRepository.findByRole("ADMIN").size() <= 1) {
			throw new RuntimeException("There has to be always one Admin active");
		}
		userRepository.delete(user);
		return user;
	}

}
