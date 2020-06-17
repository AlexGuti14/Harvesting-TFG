package com.backend.demo.batch.writer;

import java.util.List;
import org.springframework.batch.item.ItemWriter;
import org.springframework.beans.factory.annotation.Autowired;
import com.backend.demo.batch.model.EuropePork;
import com.backend.demo.batch.repository.EuropeRepository;

/**
 * The Class BobinoWriter.
 * 
 */
public class EuropeWriter implements ItemWriter<EuropePork> {

	@Autowired
    private EuropeRepository euRepository;
	
	/** 
	 * @param bobinos
	 * @throws Exception
	 */
	@Override
	public void write(List<? extends EuropePork> eupork) throws Exception {

		euRepository.save(eupork);
		
	}

}
