package com.fireemblem.heroes.controller;

import com.fireemblem.heroes.models.HeroType;
import com.fireemblem.heroes.models.Hero;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class HeroRepresentation {
	
	int id;
	HeroType type;
	int level;
	String name;
	int hp;
	int atk;
	int spd;
	int def;
	int res;
	
	public Hero toHero() {
		return new Hero(
			id,
			type,
			level,
			name,
			hp,
			atk,
			spd,
			def,
			res
		);
	}
	
	public static HeroRepresentation from(Hero hero) {
		return HeroRepresentation.builder()
			.id(hero.getId())
			.type(hero.getType())
			.level(hero.getLevel())
			.name(hero.getName())
			.hp(hero.getHp())
			.atk(hero.getAtk())
			.spd(hero.getSpd())
			.def(hero.getDef())
			.res(hero.getRes())
			.build();
	}
}
