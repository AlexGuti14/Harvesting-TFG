package com.backend.demo.batch.processor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.item.ItemProcessor;
import com.backend.demo.batch.model.EuropePork;

/**
 * The Class BobinoProcessor.
 * 
 */
public class EuropeProcessor implements ItemProcessor<EuropePork, EuropePork> {

	private static final Logger log = LoggerFactory.getLogger(EuropeProcessor.class);

	/** 
	 * @param b
	 * @return Bobino
	 * @throws Exception
	 */
	@Override
	public EuropePork process(final EuropePork b) throws Exception {

		log.trace("Converting (" + b + ") into (" + b + ")");

		return b;
	}

}
