package com.backend.demo.batch.listener;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.backend.demo.batch.reader.CerealReader;
import com.backend.demo.batch.reader.EuropeReader;
import com.backend.demo.batch.util.HttpDownloadUtility;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;

/**
 * The Class JobListener
 *
 */
public class JobListenerEurope extends JobExecutionListenerSupport {

	private static final Logger log = LoggerFactory.getLogger(JobListenerEurope.class);

	private String webUrl;
	private String fileUrl;
	private String saveDir;
	private String patron;
	private List<EuropeReader> europeReaders;

	public JobListenerEurope(String webUrl, String fileUrl, String saveDir, String patron, List<EuropeReader> europeReaders) {
		this.webUrl = webUrl;
		this.fileUrl = fileUrl;
		this.saveDir = saveDir;
		this.patron = patron;
		this.europeReaders = europeReaders;
	}
	
	/** 
	 * @param jobExecution
	 */
	@Override
	public void beforeJob(JobExecution jobExecution) {
		log.info("Process starts");
		//Get web html
		String html = HttpDownloadUtility.getHTML(webUrl);
		//Get all files in web html with this patron
		List<String> files = HttpDownloadUtility.getAllFiles(html,patron);
		List<String> filesToRead = new ArrayList<String>();	
        try {
			//Download files
			for (String file : files) {
				if(!HttpDownloadUtility.existFile(saveDir + file)){
					HttpDownloadUtility.downloadFile(fileUrl + file, saveDir, file);
					log.info("Download file: " + fileUrl + file);
					filesToRead.add(file);
				}
			}
			
			for (EuropeReader europeReader : europeReaders) {
				europeReader.filesToRead(filesToRead);
			}
			
        } catch (IOException ex) {
            ex.printStackTrace();
		}
		
	}

	/** 
	 * @param jobExecution
	 */
	@Override
	public void afterJob(JobExecution jobExecution) {
		if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
			log.info("Process COMPLETED");
		}
		else if (jobExecution.getStatus() == BatchStatus.FAILED) {
			//job failure
			log.error("Process FAILURE");
		}
	}
}
