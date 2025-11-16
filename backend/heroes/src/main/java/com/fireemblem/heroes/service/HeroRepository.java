package com.fireemblem.heroes.service;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fireemblem.heroes.models.Hero;

public interface HeroRepository extends JpaRepository<Hero, Long> {

}
