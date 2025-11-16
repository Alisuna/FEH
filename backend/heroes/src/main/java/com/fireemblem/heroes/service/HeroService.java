package com.fireemblem.heroes.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.fireemblem.heroes.models.Hero;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class HeroService {
	
	private HeroRepository heroRepository;
	
	public HeroService(HeroRepository heroRepository) {
		this.heroRepository = heroRepository;
	}
	
	@Transactional
	public List<Hero> findAll() {
		return heroRepository.findAll();
	}
	
	@Transactional
	public Optional<Hero> findById(long id) {
		return heroRepository.findById(id);
	}
	
	@Transactional
	public Hero create(Hero hero) {
		return heroRepository.save(hero);
	}
	
	@Transactional
	public Hero update(Hero updatedHero, int id) {
		Hero hero = heroRepository.findById((long) id).orElseThrow(() -> new EntityNotFoundException());
		hero = updatedHero;
		return hero;
	}
	
	@Transactional
	public Hero delete(int id) {
		Hero hero = heroRepository.findById((long) id).orElseThrow(() -> new EntityNotFoundException());
		heroRepository.delete(hero);
		return hero;
	}
}
