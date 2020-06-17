package com.backend.demo.quartz.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;

import com.backend.demo.batch.quartz.QuartzJobLauncher;
import com.backend.demo.quartz.dto.ServerResponse;
import com.backend.demo.quartz.service.JobService;
import com.backend.demo.quartz.util.ServerResponseCode;


@RestController
@RequestMapping("/scheduler/")
@Api(value = "Jobs", description = "Operaciones para la gestión de trabajos")
public class JobController {

	@Autowired
	@Lazy
	JobService jobService;

	/** 
	 * @param @RequestParam("jobName"
	 * @return ServerResponse
	 */
	@RequestMapping(value = "schedule", method = RequestMethod.GET)	
	public ServerResponse schedule(@RequestParam("jobName") String jobName, @RequestParam("jobType") String jobType,
			@RequestParam("jobScheduleTime") @DateTimeFormat(pattern = "yyyy/MM/dd HH:mm") Date jobScheduleTime, 
			@RequestParam("cronExpression") String cronExpression){
		System.out.println("JobController.schedule()");

		//Job Name is mandatory
		if(jobName == null || jobName.trim().equals("")){
			return getServerResponse(ServerResponseCode.JOB_NAME_NOT_PRESENT, false);
		}

		//Check if job Name is unique;
		if(!jobService.isJobWithNamePresent(jobName)){

			if(cronExpression == null || cronExpression.trim().equals("")){
				//Single Trigger
				boolean status = jobService.scheduleOneTimeJob(jobName, jobType, QuartzJobLauncher.class, jobScheduleTime);
				if(status){
					return getServerResponse(ServerResponseCode.SUCCESS, jobService.getAllJobs());
				}else{
					return getServerResponse(ServerResponseCode.ERROR, false);
				}
				
			}else{
				//Cron Trigger
				boolean status = jobService.scheduleCronJob(jobName, jobType, QuartzJobLauncher.class, jobScheduleTime, cronExpression);
				if(status){
					return getServerResponse(ServerResponseCode.SUCCESS, jobService.getAllJobs());
				}else{
					return getServerResponse(ServerResponseCode.ERROR, false);
				}				
			}
		}else{
			return getServerResponse(ServerResponseCode.JOB_WITH_SAME_NAME_EXIST, false);
		}
	}

	
	/** 
	 * @param jobName
	 */
	@RequestMapping(value = "unschedule", method = RequestMethod.GET)
	public void unschedule(@RequestParam("jobName") String jobName) {
		System.out.println("JobController.unschedule()");
		jobService.unScheduleJob(jobName);
	}

	
	/** 
	 * @param jobName
	 * @return ServerResponse
	 */
	@RequestMapping(value = "delete", method = RequestMethod.DELETE)
	public ServerResponse delete(@RequestParam("jobName") String jobName) {
		System.out.println("JobController.delete()");		

		if(jobService.isJobWithNamePresent(jobName)){
			boolean isJobRunning = jobService.isJobRunning(jobName);

			if(!isJobRunning){
				boolean status = jobService.deleteJob(jobName);
				if(status){
					return getServerResponse(ServerResponseCode.SUCCESS, true);
				}else{
					return getServerResponse(ServerResponseCode.ERROR, false);
				}
			}else{
				return getServerResponse(ServerResponseCode.JOB_ALREADY_IN_RUNNING_STATE, false);
			}
		}else{
			//Job doesn't exist
			return getServerResponse(ServerResponseCode.JOB_DOESNT_EXIST, false);
		}
	}

	
	/** 
	 * @param jobName
	 * @return ServerResponse
	 */
	@RequestMapping(value = "pause", method = RequestMethod.GET)
	public ServerResponse pause(@RequestParam("jobName") String jobName) {
		System.out.println("JobController.pause()");

		if(jobService.isJobWithNamePresent(jobName)){

			boolean isJobRunning = jobService.isJobRunning(jobName);

			if(!isJobRunning){
				boolean status = jobService.pauseJob(jobName);
				if(status){
					return getServerResponse(ServerResponseCode.SUCCESS, true);
				}else{
					return getServerResponse(ServerResponseCode.ERROR, false);
				}			
			}else{
				return getServerResponse(ServerResponseCode.JOB_ALREADY_IN_RUNNING_STATE, false);
			}

		}else{
			//Job doesn't exist
			return getServerResponse(ServerResponseCode.JOB_DOESNT_EXIST, false);
		}		
	}

	
	/** 
	 * @param jobName
	 * @return ServerResponse
	 */
	@RequestMapping(value = "resume", method = RequestMethod.GET)
	public ServerResponse resume(@RequestParam("jobName") String jobName) {
		System.out.println("JobController.resume()");

		if(jobService.isJobWithNamePresent(jobName)){
			String jobState = jobService.getJobState(jobName);

			if(jobState.equals("PAUSED")){
				System.out.println("Job current state is PAUSED, Resuming job...");
				boolean status = jobService.resumeJob(jobName);

				if(status){
					return getServerResponse(ServerResponseCode.SUCCESS, true);
				}else{
					return getServerResponse(ServerResponseCode.ERROR, false);
				}
			}else{
				return getServerResponse(ServerResponseCode.JOB_NOT_IN_PAUSED_STATE, false);
			}

		}else{
			//Job doesn't exist
			return getServerResponse(ServerResponseCode.JOB_DOESNT_EXIST, false);
		}
	}

	
	/** 
	 * @param @RequestParam("jobName")
	 * @return ServerResponse
	 */
	@RequestMapping(value = "update", method = RequestMethod.GET)
	public ServerResponse updateJob(@RequestParam("jobName") String jobName, 
			@RequestParam("jobScheduleTime") @DateTimeFormat(pattern = "yyyy/MM/dd HH:mm") Date jobScheduleTime, 
			@RequestParam("cronExpression") String cronExpression){
		System.out.println("JobController.updateJob()");

		//Job Name is mandatory
		if(jobName == null || jobName.trim().equals("")){
			return getServerResponse(ServerResponseCode.JOB_NAME_NOT_PRESENT, false);
		}

		//Edit Job
		if(jobService.isJobWithNamePresent(jobName)){
			
			if(cronExpression == null || cronExpression.trim().equals("")){
				//Single Trigger
				boolean status = jobService.updateOneTimeJob(jobName, jobScheduleTime);
				if(status){
					return getServerResponse(ServerResponseCode.SUCCESS, jobService.getAllJobs());
				}else{
					return getServerResponse(ServerResponseCode.ERROR, false);
				}
				
			}else{
				//Cron Trigger
				boolean status = jobService.updateCronJob(jobName, jobScheduleTime, cronExpression);
				if(status){
					return getServerResponse(ServerResponseCode.SUCCESS, jobService.getAllJobs());
				}else{
					return getServerResponse(ServerResponseCode.ERROR, false);
				}				
			}
			
			
		}else{
			return getServerResponse(ServerResponseCode.JOB_DOESNT_EXIST, false);
		}
	}

	
	/** 
	 * @return ServerResponse
	 */
	@RequestMapping(value = "jobs", method = RequestMethod.GET)
	public ServerResponse getAllJobs(){
		System.out.println("JobController.getAllJobs()");

		List<Map<String, Object>> list = jobService.getAllJobs();
		return getServerResponse(ServerResponseCode.SUCCESS, list);
	}

	
	/** 
	 * @param jobName
	 * @return ServerResponse
	 */
	@RequestMapping(value = "checkJobName", method = RequestMethod.GET)
	public ServerResponse checkJobName(@RequestParam("jobName") String jobName){
		System.out.println("JobController.checkJobName()");

		//Job Name is mandatory
		if(jobName == null || jobName.trim().equals("")){
			return getServerResponse(ServerResponseCode.JOB_NAME_NOT_PRESENT, false);
		}
		
		boolean status = jobService.isJobWithNamePresent(jobName);
		return getServerResponse(ServerResponseCode.SUCCESS, status);
	}

	
	/** 
	 * @param jobName
	 * @return ServerResponse
	 */
	@RequestMapping(value = "isJobRunning", method = RequestMethod.GET)
	public ServerResponse isJobRunning(@RequestParam("jobName") String jobName) {
		System.out.println("JobController.isJobRunning()");

		boolean status = jobService.isJobRunning(jobName);
		return getServerResponse(ServerResponseCode.SUCCESS, status);
	}

	
	/** 
	 * @param jobName
	 * @return ServerResponse
	 */
	@RequestMapping(value = "jobState", method = RequestMethod.GET)
	public ServerResponse getJobState(@RequestParam("jobName") String jobName) {
		System.out.println("JobController.getJobState()");

		String jobState = jobService.getJobState(jobName);
		return getServerResponse(ServerResponseCode.SUCCESS, jobState);
	}

	
	/** 
	 * @param jobName
	 * @return ServerResponse
	 */
	@RequestMapping(value = "stop", method = RequestMethod.GET)
	public ServerResponse stopJob(@RequestParam("jobName") String jobName) {
		System.out.println("JobController.stopJob()");

		if(jobService.isJobWithNamePresent(jobName)){

			if(jobService.isJobRunning(jobName)){
				boolean status = jobService.stopJob(jobName);
				if(status){
					return getServerResponse(ServerResponseCode.SUCCESS, true);
				}else{
					//Server error
					return getServerResponse(ServerResponseCode.ERROR, false);
				}

			}else{
				//Job not in running state
				return getServerResponse(ServerResponseCode.JOB_NOT_IN_RUNNING_STATE, false);
			}

		}else{
			//Job doesn't exist
			return getServerResponse(ServerResponseCode.JOB_DOESNT_EXIST, false);
		}
	}

	
	/** 
	 * @param jobName
	 * @return ServerResponse
	 */
	@RequestMapping(value = "start", method = RequestMethod.GET)
	public ServerResponse startJobNow(@RequestParam("jobName") String jobName) {
		System.out.println("JobController.startJobNow()");

		if(jobService.isJobWithNamePresent(jobName)){

			if(!jobService.isJobRunning(jobName)){
				boolean status = jobService.startJobNow(jobName);

				if(status){
					//Success
					return getServerResponse(ServerResponseCode.SUCCESS, true);

				}else{
					//Server error
					return getServerResponse(ServerResponseCode.ERROR, false);
				}

			}else{
				//Job already running
				return getServerResponse(ServerResponseCode.JOB_ALREADY_IN_RUNNING_STATE, false);
			}

		}else{
			//Job doesn't exist
			return getServerResponse(ServerResponseCode.JOB_DOESNT_EXIST, false);
		}
	}

	
	/** 
	 * @param responseCode
	 * @param data
	 * @return ServerResponse
	 */
	public ServerResponse getServerResponse(int responseCode, Object data){
		ServerResponse serverResponse = new ServerResponse();
		serverResponse.setStatusCode(responseCode);
		serverResponse.setData(data);
		return serverResponse; 
	}
}
