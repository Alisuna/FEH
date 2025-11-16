package com.fireemblem.heroes.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fireemblem.heroes.service.HeroService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/heroes")
public class HeroController {
	
	private HeroService heroService;
	
	public HeroController(HeroService heroService) {
		this.heroService = heroService;
	}
	
	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<HeroRepresentation> findById(@PathVariable("id") int id) {
		try {
			return heroService.findById(id)
				.map(HeroRepresentation::from)
				.map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
		} catch (Exception exception) {
			log.warn(exception.getMessage());
			return ResponseEntity.internalServerError().build();
		}
	}
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<HeroListRepresentation> findAll() {
		try {
			return ResponseEntity.ok(HeroListRepresentation.from(heroService.findAll()));
		} catch (Exception exception) {
			log.warn(exception.getMessage());
			return ResponseEntity.internalServerError().build();
		}
	}
	
	@PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<HeroRepresentation> create(@RequestBody HeroRepresentation heroRepresentation) {
		try {
			return ResponseEntity.ok(HeroRepresentation.from(heroService.create(heroRepresentation.toHero())));
		} catch (Exception exception) {
			log.warn(exception.getMessage());
			return ResponseEntity.internalServerError().build();
		}
	}
	
	@PostMapping(value = "/update/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<HeroRepresentation> update(
		@PathVariable("id") int id,
		@RequestBody HeroRepresentation heroRepresentation
	) {
		try {
			return ResponseEntity.ok(HeroRepresentation.from(heroService.update(heroRepresentation.toHero(), id)));
		} catch (Exception exception) {
			log.warn(exception.getMessage());
			return ResponseEntity.internalServerError().build();
		}
	}
	
	@DeleteMapping(value = "/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<HeroRepresentation> delete(@PathVariable("id") int id) {
		try {
			return ResponseEntity.ok(HeroRepresentation.from(heroService.delete(id)));
		} catch (Exception exception) {
			log.warn(exception.getMessage());
			return ResponseEntity.internalServerError().build();
		}
	}
}
