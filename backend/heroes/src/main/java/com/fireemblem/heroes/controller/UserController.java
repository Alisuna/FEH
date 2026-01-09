package com.fireemblem.heroes.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fireemblem.heroes.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class LoginController {
	
	private UserService userService;
	
	public LoginController(UserService userService) {
		this.userService = userService;
	}
	
	@PostMapping("/login")
	public ResponseEntity<Response> login(@RequestBody Request request) {
		try {
			return ResponseEntity.ok(new Response(userService.login(request.toUser())));
		} catch (Exception exception) {
			log.warn(exception.getMessage());
			return ResponseEntity.internalServerError().build();
		}
	}
	
	@PostMapping("/register")
	public ResponseEntity<Response> regsiter(@RequestBody Request request) {
		try {
			return ResponseEntity.ok(new Response(userService.register(request.toUser())));
		} catch (Exception exception) {
			log.warn(exception.getMessage());
			return ResponseEntity.internalServerError().build();
		}
	}
}
