package com.backend.demo.batch.model;

import java.util.Vector;

import javax.persistence.Id;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

/**
 * The Class EuropePork.
 * 
 */
@Getter
@Setter
@Document(collection = "EuropePork")
public class EuropePork {

    @Id
    public ObjectId id;
    
	private DateJson date;
	private String animal;
	private String type;
	private Vector<MercadosEU> markets;

	public EuropePork() {}

	public EuropePork(DateJson date, String animal, String type) {
		this.date = date;
		this.animal = animal;
		this.type = type;
		this.markets = new Vector<MercadosEU>();
	}

	public EuropePork(String animal, String type) {
		this.animal = animal;
		this.type = type;
		this.markets = new Vector<MercadosEU>();

	}

	public void setMercado(String precio, String pais){
		MercadosEU m = new MercadosEU(Double.parseDouble(precio), pais);
		markets.add(m);
	}

	@Override
	public String toString() {
		return "EuropePork [animal=" + animal + ", date=" + date + ", id=" + id + ", markets=" + markets + ", type="
				+ type + "]";
	}
  
}