package com.fireemblem.heroes.controller;

import com.fireemblem.heroes.models.User;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class UserRepresentation {
	
	int id;
	String username;
	String role;
	
	public User toUser() {
		return new User(
			id,
			username,
			role
		);
	}
	
	public static UserRepresentation from(User user) {
		return UserRepresentation.builder()
				.id(user.getId())
				.username(user.getUsername())
				.role(user.getRole())
				.build();
	}

}
