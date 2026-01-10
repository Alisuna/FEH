package com.fireemblem.heroes.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fireemblem.heroes.models.UserListRepresentation;
import com.fireemblem.heroes.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class UserController {
	
	private UserService userService;
	
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@PostMapping(value = "/login")
	public ResponseEntity<Response> login(@RequestBody Request request) {
		try {
			return ResponseEntity.ok(new Response(userService.login(request.toUser())));
		} catch (Exception exception) {
			log.warn(exception.getMessage());
			return ResponseEntity.internalServerError().build();
		}
	}
	
	@PostMapping(value = "/register")
	public ResponseEntity<Response> regsiter(@RequestBody Request request) {
		try {
			return ResponseEntity.ok(new Response(userService.register(request.toUser())));
		} catch (Exception exception) {
			log.warn(exception.getMessage());
			return ResponseEntity.internalServerError().build();
		}
	}
	
	@GetMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserListRepresentation> getAll() {
		try {
			return ResponseEntity.ok(UserListRepresentation.from(userService.getAll()));
		} catch (Exception exception) {
			log.warn(exception.getMessage());
			return ResponseEntity.internalServerError().build();
		}
	}
	
	@PostMapping(value = "/users/changeRole", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserRepresentation> changeRole(@RequestBody UserRepresentation userRepresentation) {
		try {
			return ResponseEntity.ok(UserRepresentation.from(userService.changeRole(userRepresentation.toUser())));
		} catch (Exception exception) {
			log.warn(exception.getMessage());
			return ResponseEntity.internalServerError().build();
		}
	}
	
	@DeleteMapping(value = "/users/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserRepresentation> delete(@PathVariable("id") int id) {
		try {
			return ResponseEntity.ok(UserRepresentation.from(userService.delete(id)));
		} catch (Exception exception) {
			log.warn(exception.getMessage());
			return ResponseEntity.internalServerError().build();
		}
	}
}
