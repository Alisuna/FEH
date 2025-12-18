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
import java.util.Optional;
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
        Authentication authentication = authenticationManager
            .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(user.getUsername());
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

}
