package com.backend.demo.quartz.service;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.JobListener;
import org.springframework.stereotype.Component;

@Component
public class JobsListener implements JobListener{

	
	/** 
	 * @return String
	 */
	@Override
	public String getName() {
		return "globalJob";
	}

	
	/** 
	 * @param context
	 */
	@Override
	public void jobToBeExecuted(JobExecutionContext context) {
		System.out.println("JobsListener.jobToBeExecuted()");
	}

	
	/** 
	 * @param context
	 */
	@Override
	public void jobExecutionVetoed(JobExecutionContext context) {
		System.out.println("JobsListener.jobExecutionVetoed()");
	}

	
	/** 
	 * @param context
	 * @param jobException
	 */
	@Override
	public void jobWasExecuted(JobExecutionContext context, JobExecutionException jobException) {
		System.out.println("JobsListener.jobWasExecuted()");
	}

}
