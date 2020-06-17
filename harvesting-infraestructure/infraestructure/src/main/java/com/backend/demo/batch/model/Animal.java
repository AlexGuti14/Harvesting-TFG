package com.backend.demo.batch.model;

import javax.persistence.Id;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

/**
 * The Class Animal.
 */
@Getter
@Setter
@Document(collection = "Historical")
public class Animal {

    @Id
	public ObjectId id;

	private DateJson date;
	private String animal;
	private String type;
	private String category;
	private String market;
    private double value;

    public Animal() {}

	public Animal(String animal, String type, double value, String market, DateJson date) {
		this.animal = animal;
		this.type = type;
		this.value = value;
		this.market = market;
		this.date = date;
	}

	public Animal(DateJson date, String animal, String type, String category, String market, double value) {
		this.date = date;
		this.animal = animal;
		this.type = type;
		this.category = category;
		this.market = market;
		this.value = value;
	}  

	@Override
	public String toString() {
		return "Animal [animal=" + animal + ", category=" + category + ", date=" + date + ", id=" + id + ", market="
				+ market + ", type=" + type + ", value=" + value + "]";
	}
    
}