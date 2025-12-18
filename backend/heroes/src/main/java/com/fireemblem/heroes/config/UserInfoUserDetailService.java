package com.fireemblem.heroes.config;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.fireemblem.heroes.models.User;
import com.fireemblem.heroes.service.UserRepository;



@Component
public class UserInfoUserDetailService implements UserDetailsService {

	@Autowired
	private UserRepository repository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> userInfo = repository.findByUsername(username);

		return userInfo.map(UserInfoUserDetail::new)
				.orElseThrow(() -> new UsernameNotFoundException("user not found " + username));

	}
}