package com.backend.demo.batch.writer;

import java.util.List;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import com.backend.demo.batch.model.Animal;
import com.backend.demo.batch.repository.AnimalRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
/**
 * The Class BobinoWriter.
 * 
 */
public class AnimalWriter implements ItemWriter<Animal> {

	private static final Logger log = LoggerFactory.getLogger(AnimalWriter.class);

	@Autowired
	private AnimalRepository animalRepository;
	
	/** 
	 * @param porcinos
	 * @throws Exception
	 */
	@Override
	public void write(List<? extends Animal> animal) throws Exception {

		try {
			animalRepository.save(animal);
		} catch (Exception e) {
			//TODO: handle exception
			log.info("duplicate key error collection");
		}
		
	}

}