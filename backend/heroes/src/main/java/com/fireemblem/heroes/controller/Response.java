package com.fireemblem.heroes.controller;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;

@Value
@Builder
@Getter
@Setter
public class Response {

	private String token;

}