package com.fireemblem.heroes.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "app_user")
public class User {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
	@Column(unique = true)
	private String username;
	private String password;
	private String role;
	
	public User() {}
	
	public User(String username, String password) {
		this.username = username;
		this.password = password;
	}
	
	public User(String username, String password, String role) {
		this.username = username;
		this.password = password;
		this.role = role;
	}
	
	public User(int id,String username, String password, String role) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.role = role;
	}
}
