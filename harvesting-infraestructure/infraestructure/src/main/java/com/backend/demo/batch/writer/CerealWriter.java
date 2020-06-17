package com.backend.demo.batch.writer;

import java.util.List;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import com.backend.demo.batch.model.Cereal;
import com.backend.demo.batch.repository.CerealRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * The Class CerealWriter.
 * 
 */
public class CerealWriter implements ItemWriter<Cereal> {

	private static final Logger log = LoggerFactory.getLogger(CerealWriter.class);


	@Autowired
    private CerealRepository cerealRepository;
	
	/** 
	 * @param cereals
	 * @throws Exception
	 */
	@Override
	public void write(List<? extends Cereal> cereals) throws Exception {
		try {
			cerealRepository.save(cereals);
		} catch (Exception e) {
			//TODO: handle exception
			log.info("duplicate key error collection");
		}
	}
}