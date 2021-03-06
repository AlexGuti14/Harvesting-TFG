package com.backend.demo.batch.processor;

import org.springframework.batch.item.ItemProcessor;
import com.backend.demo.batch.model.Animal;
import com.backend.demo.batch.model.DateJson;
import com.backend.demo.batch.model.Porcino;
import org.joda.time.LocalDate;

public class AnimalProcessor implements ItemProcessor<Porcino, Animal> {
	
	/** 
	 * @param b
	 * @return Porcino
	 * @throws Exception
	 */
	@Override
	public Animal process(final Porcino b) throws Exception {

		if(b.getMercado()==null){
			b.setMercado("Nacional");
		}

		String mercado = b.getMercado();
		if(mercado.contains(" ")){
			mercado = mercado.replaceAll("\\s+","");
			b.setMercado(mercado);
		}
		if(mercado.contains("PRECIOMEDIONACIONAL")){
			b.setMercado("Nacional");
		}
		if(mercado.contains("Zaragoza")){
			b.setMercado("Zaragoza");
		}
		if(mercado.contains("Lleida")){
			b.setMercado("Lerida");
		}


		String clase = b.getClase();
		if(clase.contains("SELECTO")){
			b.setClase("Selecto");
		}
		else if(clase.contains("NORMAL")){
			b.setClase("Normal");
		}
		else if(clase.contains("GRASO")){
			b.setClase("Graso");
		}
		else if(clase.contains("Segovia.Base 20kg de peso.")){
			b.setClase("Lechon");
			b.setMercado("Segovia");
			b.setPrecioSemanaActual(String.valueOf(b.getPrecioSemanaActual()/100));
		}
		else if(clase.contains("Lleida.Base 20kg de peso.")){
			b.setClase("Lechon");
			b.setMercado("Lerida");
			b.setPrecioSemanaActual(String.valueOf(b.getPrecioSemanaActual()/100));
		}

		String fecha = b.getSemanaActual();
		if(fecha.contains("\n")){
			b.setSemanaActual(fecha.replaceAll("\n"," "));
		}

		LocalDate  f;
		fecha = fecha.replaceAll("\n"," ");
		fecha = fecha.replace("    "," ").replace("   "," ").replace("  "," ");
		
		String[] tipo = fecha.split(" ");
		
		if(tipo.length>3){
			String[] n = tipo[2].split("/");
			if(n.length>2){
				String[] d = n[1].split("-");
				int anyo = Integer.parseInt(tipo[3]);
				if(d[0].equals("12")){
					anyo = Integer.parseInt(tipo[3]) - 1;
				}
				f = new LocalDate(anyo, Integer.parseInt(d[0]), Integer.parseInt(n[0]));
			}
			else{
				String[] d = n[0].split("-");
				f = new LocalDate(Integer.parseInt(tipo[3]), Integer.parseInt(n[1]), Integer.parseInt(d[0]));
			}
		}
		else{
			String[] n = tipo[1].split("/");
			if(n.length>2){
				String[] d = n[1].split("-");

				f = new LocalDate(Integer.parseInt(tipo[2]), Integer.parseInt(d[0]), Integer.parseInt(n[0]));
			}
			else{
				String[] d = n[0].split("-");
				f = new LocalDate(Integer.parseInt(tipo[2]), Integer.parseInt(n[1]), Integer.parseInt(d[0]));
			}
		}
		b.setFecha(f);

		Animal a = new Animal("pork", b.getClase(), b.getPrecioSemanaActual(), b.getMercado(), new DateJson(b.getFecha(), new LocalDate()));
		
		return a;
	}

}