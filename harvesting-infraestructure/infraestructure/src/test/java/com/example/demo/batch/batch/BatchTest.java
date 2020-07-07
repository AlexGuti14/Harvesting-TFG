package com.example.demo.batch.batch;

import static org.junit.Assert.assertEquals;
import java.util.ArrayList;
import java.util.List;

import com.backend.demo.batch.model.Cereal;
import com.backend.demo.batch.model.CerealDTO;
import com.backend.demo.batch.processor.CerealProcessor;
import com.backend.demo.batch.reader.CerealReader;

import org.junit.Test;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.test.MetaDataInstanceFactory;

public class BatchTest {   
	/*
	private String filesDir = "src/test/resources/filesTest/";
	
	@Test
	public void reader() throws Exception {
		StepExecution stepExecution = MetaDataInstanceFactory.createStepExecution(new JobParameters());
	  
		CerealReader reader =  new CerealReader(11,36,4,filesDir,"TRIGO",1,3,4,2);
		reader.setFecha(10, 4);
		
		List<String> files = new ArrayList<String>();
		files.add("informesemanaldecoyunturas-18_tcm30-537807.xlsx");
		reader.filesToRead(files);
		
		reader.beforeStep(stepExecution);
		CerealDTO cerealDTO = reader.read();

		CerealProcessor processor = new CerealProcessor();
		Cereal cereal = processor.process(cerealDTO);
		
		assertEquals(cereal.getCereal(),"TRIGO");
		assertEquals(cereal.getType(),"BlandoPanificable");
		assertEquals(cereal.getMarket(), "Albacete");
		assertEquals(cereal.getValue(), 197, 0);	
	}
	*/
}