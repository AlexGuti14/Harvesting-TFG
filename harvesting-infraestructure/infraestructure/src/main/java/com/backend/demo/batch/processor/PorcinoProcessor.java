package com.backend.demo.batch.processor;

import org.springframework.batch.item.ItemProcessor;
import com.backend.demo.batch.model.Porcino;
import org.joda.time.LocalDate;

public class PorcinoProcessor implements ItemProcessor<Porcino, Porcino> {
	
	/** 
	 * @param b
	 * @return Porcino
	 * @throws Exception
	 */
	@Override
	public Porcino process(final Porcino b) throws Exception {


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


		String clase = b.getClase();
		if(clase.contains("SELECTO")){
			b.setClase("SELECTO");
		}
		else if(clase.contains("NORMAL")){
			b.setClase("NORMAL");
		}
		else if(clase.contains("GRASO")){
			b.setClase("GRASO");
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
	
				f = new LocalDate(Integer.parseInt(tipo[3]), Integer.parseInt(d[0]), Integer.parseInt(n[0]));
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
		
		return b;
	}

}