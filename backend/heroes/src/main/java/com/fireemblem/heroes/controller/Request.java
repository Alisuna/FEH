package com.fireemblem.heroes.controller;

import com.fireemblem.heroes.models.User;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;

@Value
@Builder
@Getter
@Setter
public class Request {

	private String username;
	private String password;
	
	public User toUser() {
		return new User(
			username,
			password
		);
	}

}
