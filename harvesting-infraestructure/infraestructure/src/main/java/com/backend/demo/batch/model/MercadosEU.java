package com.backend.demo.batch.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MercadosEU {
	
	private double price;
	private String country;

	public MercadosEU(double price, String country) {
		this.price = price;
		this.country = country;
	}

	@Override
	public String toString() {
		return "MercadosEU [country=" + country + ", price=" + price + "]";
	}

	
}