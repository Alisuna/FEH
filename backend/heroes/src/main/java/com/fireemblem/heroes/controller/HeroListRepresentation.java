package com.fireemblem.heroes.controller;

import java.util.List;

import com.fireemblem.heroes.models.Hero;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class HeroListRepresentation {
	
	List<HeroRepresentation> heroList;
	
	public static HeroListRepresentation from(List<Hero> heroList) {
		return HeroListRepresentation.builder()
			.heroList(heroList.stream()
					.map(HeroRepresentation::from)
					.toList()
			)
			.build();
	}
}
