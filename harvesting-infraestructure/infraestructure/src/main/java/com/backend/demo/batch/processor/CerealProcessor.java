package com.backend.demo.batch.processor;

import com.backend.demo.batch.model.Cereal;
import com.backend.demo.batch.model.CerealDTO;
import com.backend.demo.batch.model.DateJson;
import org.springframework.batch.item.ItemProcessor;
import org.joda.time.LocalDate;

public class CerealProcessor implements ItemProcessor<CerealDTO, Cereal> {

	/** 
	 * @param c
	 * @return Cereal
	 * @throws Exception
	 */
	@Override
	public Cereal process(final CerealDTO c) throws Exception {

		c.setMercado(c.getMercado().replaceAll(" ", ""));

		String tipo = c.getClase();
		if(tipo.contains("Trigo")){
			tipo = tipo.replaceAll("Trigo","");
		}
		else if(tipo.contains("Cebada")){
			tipo = tipo.replaceAll("Cebada","");
		}
		else if(tipo.contains("Maiz")){
			tipo = tipo.replaceAll("Maiz","");
		}
		else if(tipo.contains("Arroz")){
			tipo = tipo.replaceAll("Arroz","");
		}
		c.setClase(tipo.replaceAll(" ", ""));


		String fecha = c.getSemanaActual();
		if(fecha.contains("\n")){
			c.setSemanaActual(fecha.replaceAll("\n"," "));
		}

		LocalDate  f;
		fecha = fecha.replaceAll("\n"," ");
		fecha = fecha.replace("    "," ").replace("   "," ").replace("  "," ");
		
		String[] partes = fecha.split(" ");
		
		String[] n = partes[2].split("/");
		if(n.length>2){
			String[] d = n[1].split("-");
			int anyo = Integer.parseInt(partes[3]);
			if(d[0].equals("12")){
				anyo = Integer.parseInt(partes[3]) - 1;
			}
			f = new LocalDate(anyo, Integer.parseInt(d[0]), Integer.parseInt(n[0]));
		}
		else{
			String[] d = n[0].split("-");
			f = new LocalDate(Integer.parseInt(partes[3]), Integer.parseInt(n[1]), Integer.parseInt(d[0]));
		}
		
		c.setFecha(f);

		Cereal cereal = new Cereal(c.getTipo(), c.getClase(), c.getPrecioSemanaActual(), c.getMercado(), new DateJson(c.getFecha(), new LocalDate()));;

		return cereal;
	}

}