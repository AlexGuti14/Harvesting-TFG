package com.backend.demo.batch.model;

import org.joda.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

/**
 * The Class Cereal.
 * 
 */
@Getter
@Setter
public class CerealDTO {
	
	private String tipo;
	private String clase; 
	private String semanaActual;
	private double precioSemanaAnterior;
	private double precioSemanaActual;
	private double variacion;
	private String mercado;
	private LocalDate fecha;

	public CerealDTO(){}

    /** 
     * @param precioSemanaAnterior
     */
    public void setPrecioSemanaAnterior(String precioSemanaAnterior) {
        this.precioSemanaAnterior = Double.parseDouble(precioSemanaAnterior.replace(",", "."));
    }
    
    /** 
     * @param precioSemanaActual
     */
    public void setPrecioSemanaActual(String precioSemanaActual) {
        this.precioSemanaActual = Double.parseDouble(precioSemanaActual.replace(",", "."));
    }

    /** 
     * @param variacion
     */
    public void setVariacion() {
        this.variacion = precioSemanaActual - precioSemanaAnterior;
	}
	
	@Override
	public String toString() {
		return "Cereal [clase=" + clase + ", fecha=" + fecha + ", mercado=" + mercado
				+ ", precioSemanaActual=" + precioSemanaActual + ", precioSemanaAnterior=" + precioSemanaAnterior
				+ ", semanaActual=" + semanaActual + ", tipo=" + tipo + ", variacion=" + variacion + "]";
	}
	
	
}