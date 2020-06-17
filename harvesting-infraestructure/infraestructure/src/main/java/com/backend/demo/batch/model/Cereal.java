package com.backend.demo.batch.model;

import javax.persistence.Id;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

/**
 * The Class Cereal.
 * 
 */
@Getter
@Setter
@Document(collection = "Cereal")
public class Cereal {

	@Id
    public ObjectId id;
	private DateJson date;
	private String cereal;
	private String type;
	private String category;
	private String market;
    private double value;

    public Cereal() {}

	public Cereal(String cereal, String type, double value, String market, DateJson date) {
		this.cereal = cereal;
		this.type = type;
		this.value = value;
		this.market = market;
		this.date = date;
	}

	public Cereal(DateJson date, String cereal, String type, String category, String market, double value) {
		this.date = date;
		this.cereal = cereal;
		this.type = type;
		this.category = category;
		this.market = market;
		this.value = value;
	}

	@Override
	public String toString() {
		return "Cereal [category=" + category + ", cereal=" + cereal + ", date=" + date + ", id=" + id + ", market="
				+ market + ", type=" + type + ", value=" + value + "]";
	}
}