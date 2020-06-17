package com.backend.demo.quartz;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.sql.DataSource;
import org.springframework.batch.core.configuration.JobRegistry;
import org.springframework.batch.core.configuration.support.JobRegistryBeanPostProcessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.PropertiesFactoryBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.quartz.CronTriggerFactoryBean;
import org.springframework.scheduling.quartz.JobDetailFactoryBean;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;

import com.backend.demo.batch.quartz.QuartzJobLauncher;
import com.backend.demo.quartz.config.AutowiringSpringBeanJobFactory;
import com.backend.demo.quartz.service.JobsListener;
import com.backend.demo.quartz.service.TriggerListner;
 
@Configuration
public class QuartzConfiguration {
 
    @Autowired
    DataSource dataSource;
 
    @Autowired
    private ApplicationContext applicationContext;
     
    @Autowired
    private TriggerListner triggerListner;

    @Autowired
	private JobsListener jobsListener;
	
	
	/** 
	 * @param jobRegistry
	 * @return JobRegistryBeanPostProcessor
	 */
	@Bean
	public JobRegistryBeanPostProcessor jobRegistryBeanPostProcessor(JobRegistry jobRegistry) {
		JobRegistryBeanPostProcessor jobRegistryBeanPostProcessor = new JobRegistryBeanPostProcessor();
		jobRegistryBeanPostProcessor.setJobRegistry(jobRegistry);
		return jobRegistryBeanPostProcessor;
	}

	
	/** 
	 * @return JobDetailFactoryBean
	 */
	//Asign batch job to quartz
	@Bean
	public JobDetailFactoryBean jobDetailFactoryBean() {
		JobDetailFactoryBean jobfactory = new JobDetailFactoryBean();
		jobfactory.setJobClass(QuartzJobLauncher.class);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("jobName", "cereal_etl_job");
		//Pass diferent parameters
		jobfactory.setJobDataAsMap(map);
		jobfactory.setGroup("SampleGroup");
		jobfactory.setName("cereal_etl_job");
		return jobfactory;
	}

	@Bean
	public JobDetailFactoryBean jobDetailFactoryBeanP() {
		JobDetailFactoryBean jobfactory = new JobDetailFactoryBean();
		jobfactory.setJobClass(QuartzJobLauncher.class);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("jobName", "etl_job");
		//Pass diferent parameters
		jobfactory.setJobDataAsMap(map);
		jobfactory.setGroup("SampleGroup");
		jobfactory.setName("etl_job");
		return jobfactory;
	}

	@Bean
	public JobDetailFactoryBean jobDetailFactoryBeanEU() {
		JobDetailFactoryBean jobfactory = new JobDetailFactoryBean();
		jobfactory.setJobClass(QuartzJobLauncher.class);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("jobName", "porcinoEU_etl_job");
		//Pass diferent parameters
		jobfactory.setJobDataAsMap(map);
		jobfactory.setGroup("SampleGroup");
		jobfactory.setName("porcinoEU_etl_job");
		return jobfactory;
	}


	
	/** 
	 * @return CronTriggerFactoryBean
	 */
	// Job is scheduled after every x minute
	@Bean
	public CronTriggerFactoryBean cronTriggerFactoryBean() {
		CronTriggerFactoryBean ctFactory = new CronTriggerFactoryBean();
		ctFactory.setJobDetail(jobDetailFactoryBean().getObject());
		ctFactory.setStartDelay(100);
		ctFactory.setName("cereal_etl_job");
		ctFactory.setGroup("SampleGroup");
		//0 0 12 * * THU
		//0 0 21 ? * THU *
		ctFactory.setCronExpression("*/40 * * * * ? *");
		return ctFactory;
	}

	@Bean
	public CronTriggerFactoryBean cronTriggerFactoryBeanP() {
		CronTriggerFactoryBean ctFactory = new CronTriggerFactoryBean();
		ctFactory.setJobDetail(jobDetailFactoryBeanP().getObject());
		ctFactory.setStartDelay(100);
		ctFactory.setName("etl_job");
		ctFactory.setGroup("SampleGroup");
		ctFactory.setCronExpression("0 0 0 ? * THU *");
		//ctFactory.setCronExpression("*/50 * * * * ? *");
		return ctFactory;
	}

	@Bean
	public CronTriggerFactoryBean cronTriggerFactoryBeanEU() {
		CronTriggerFactoryBean ctFactory = new CronTriggerFactoryBean();
		ctFactory.setJobDetail(jobDetailFactoryBeanEU().getObject());
		ctFactory.setStartDelay(100);
		ctFactory.setName("porcinoEU_etl_job");
		ctFactory.setGroup("SampleGroup");
		ctFactory.setCronExpression("0 0 0 ? * THU *");
		//ctFactory.setCronExpression("*/59 * * * * ? *");
		return ctFactory;
	}
    
    /**
     * create scheduler
     */
    @Bean
    public SchedulerFactoryBean schedulerFactoryBean() throws IOException {
 
        SchedulerFactoryBean factory = new SchedulerFactoryBean();
        factory.setOverwriteExistingJobs(true);
        factory.setDataSource(dataSource);
        factory.setQuartzProperties(quartzProperties());
        
        //Register listeners to get notification on Trigger misfire etc
        factory.setGlobalTriggerListeners(triggerListner);
        factory.setGlobalJobListeners(jobsListener);
        
        AutowiringSpringBeanJobFactory jobFactory = new AutowiringSpringBeanJobFactory();
        jobFactory.setApplicationContext(applicationContext);
		factory.setJobFactory(jobFactory);
		
		//factory.setTriggers(cronTriggerFactoryBeanP().getObject(),cronTriggerFactoryBean().getObject());
		factory.setTriggers(cronTriggerFactoryBeanP().getObject(),cronTriggerFactoryBeanEU().getObject());
        return factory;
    }
 
    /**
     * Configure quartz using properties file
     */
    @Bean
    public Properties quartzProperties() throws IOException {
        PropertiesFactoryBean propertiesFactoryBean = new PropertiesFactoryBean();
        propertiesFactoryBean.setLocation(new ClassPathResource("/quartz.properties"));
        propertiesFactoryBean.afterPropertiesSet();
        return propertiesFactoryBean.getObject();
    }
 
  
}