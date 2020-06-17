package com.backend.demo.batch.model;

import javax.persistence.Id;
import org.bson.types.ObjectId;
import org.joda.time.LocalDate;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.Setter;

/**
 * The Class Porcino.
 */
@Getter
@Setter
@Document(collection = "porcinos")
public class Porcino {

    @Id
    public ObjectId id;
    
    private String tipo;
    private String categoria;
    private String clase;
    private String semanaActual;
    private double precioSemanaAnterior;
    private double precioSemanaActual;
    private double variacion;
    private String mercado;
    private LocalDate fecha;

    public Porcino() {}

    public Porcino(String tipo, String clase, String semanaActual, double precioSemanaAnterior,
            double precioSemanaActual, double variacion, String mercado) {
        this.tipo = tipo;
        this.clase = clase;
        this.semanaActual = semanaActual;
        this.precioSemanaAnterior = precioSemanaAnterior;
        this.precioSemanaActual = precioSemanaActual;
        this.variacion = variacion;
        this.mercado = mercado;
    }
    
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
        return "Porcino [categoria=" + categoria + ", clase=" + clase + ", id=" + id + ", mercado=" + mercado
                + ", precioSemanaActual=" + precioSemanaActual + ", precioSemanaAnterior=" + precioSemanaAnterior
                + ", semanaActual=" + semanaActual + ", tipo=" + tipo + ", variacion=" + variacion + "]";
    }

}