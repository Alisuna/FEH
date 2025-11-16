package com.fireemblem.heroes.models;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Hero {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
	@Enumerated(EnumType.STRING)
	private HeroType type;
	
	private int level;
	private String name;
	private int hp;
	private int atk;
	private int spd;
	private int def;
	private int res;
	
	//waffe
	//drei fähigkeiten
	
	public Hero() {
	}
	
	public Hero(
			HeroType type,
			int level,
			String name,
			int hp,
			int atk,
			int spd,
			int def,
			int res
	) {
		this.type = type;
		this.level = level;
		this.name = name;
		this.hp = hp;
		this.atk = atk;
		this.spd = spd;
		this.def = def;
		this.res = res;
	}
	
	public Hero(
			int id,
			HeroType type,
			int level,
			String name,
			int hp,
			int atk,
			int spd,
			int def,
			int res
		) {
		this.id = id;
		this.type = type;
		this.level = level;
		this.name = name;
		this.hp = hp;
		this.atk = atk;
		this.spd = spd;
		this.def = def;
		this.res = res;
	}
}
