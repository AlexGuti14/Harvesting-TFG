package com.backend.demo.batch.quartz;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.configuration.JobLocator;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;

/**
 * The Class QuartzJobLauncher.
 *
 */
public class QuartzJobLauncher extends QuartzJobBean {
	
	private static final Logger log = LoggerFactory.getLogger(QuartzJobLauncher.class);

	private String jobName;

	@Autowired
	private JobLauncher jobLauncher;
	
	@Autowired
	private JobLocator jobLocator;
	
	
	/** 
	 * @return String
	 */
	public String getJobName() {
		return jobName;
	}
	
	/** 
	 * @param jobName
	 */
	public void setJobName(String jobName) {
		this.jobName = jobName;
	}
	
	/** 
	 * @return JobLauncher
	 */
	public JobLauncher getJobLauncher() {
		return jobLauncher;
	}
	
	/** 
	 * @param jobLauncher
	 */
	public void setJobLauncher(JobLauncher jobLauncher) {
		this.jobLauncher = jobLauncher;
	}
	
	/** 
	 * @return JobLocator
	 */
	public JobLocator getJobLocator() {
		return jobLocator;
	}
	
	/** 
	 * @param jobLocator
	 */
	public void setJobLocator(JobLocator jobLocator) {
		this.jobLocator = jobLocator;
	}

	
	/** 
	 * @param context
	 * @throws JobExecutionException
	 */
	@Override
	protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
		try {
			/*
			JobParametersBuilder jobBuilder= new JobParametersBuilder();
            jobBuilder.addString("filePath", "Hey");
			JobParameters jobParameters =jobBuilder.toJobParameters();
			*/
			//String myObject = (String) context.getJobDetail().getJobDataMap().get("carrier");
			
			Job job = jobLocator.getJob(jobName);
			JobExecution jobExecution = jobLauncher.run(job, new JobParameters());
			log.info("{}_{} was completed successfully", job.getName(), jobExecution.getId());
		} catch (Exception e) {
			log.error("Encountered job execution exception!");
		}

	}

}
