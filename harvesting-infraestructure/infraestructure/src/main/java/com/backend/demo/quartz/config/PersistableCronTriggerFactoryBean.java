package com.backend.demo.quartz.config;

import java.text.ParseException;

import org.springframework.scheduling.quartz.CronTriggerFactoryBean;

/**
 * Needed to set Quartz useProperties=true when using Spring classes,
 * because Spring sets an object reference on JobDataMap that is not a String
 * 
 * @see http://site.trimplement.com/using-spring-and-quartz-with-jobstore-properties/
 * @see http://forum.springsource.org/showthread.php?130984-Quartz-error-IOException
 */
public class PersistableCronTriggerFactoryBean extends CronTriggerFactoryBean {
	
    public static final String JOB_DETAIL_KEY = "jobDetail";
    public static final String JOB_LOCATOR_KEY = "jobLauncher";
    public static final String JOB_LAUNCHER_KEY = "jobLocator";

    
	
    
    /** 
     * @throws ParseException
     */
    @Override
    public void afterPropertiesSet() throws ParseException{
        super.afterPropertiesSet();

        //Remove the JobDetail element
        getJobDataMap().remove(JOB_DETAIL_KEY);
        getJobDataMap().remove(JOB_LOCATOR_KEY);
        getJobDataMap().remove(JOB_LAUNCHER_KEY);

    }
}