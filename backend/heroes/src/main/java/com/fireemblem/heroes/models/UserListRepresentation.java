package com.fireemblem.heroes.models;

import java.util.List;

import com.fireemblem.heroes.controller.UserRepresentation;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class UserListRepresentation {
	
	List<UserRepresentation> users;
	
	public static UserListRepresentation from(List<User> users) {
		return UserListRepresentation.builder()
			.users(users.stream()
					.map(UserRepresentation::from)
					.toList()
			).build();
	}

}
