package com.backend.demo.batch;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.backend.demo.batch.listener.JobListener;
import com.backend.demo.batch.model.Animal;
import com.backend.demo.batch.model.Cereal;
import com.backend.demo.batch.model.CerealDTO;
import com.backend.demo.batch.model.EuropePork;
import com.backend.demo.batch.model.Porcino;
import com.backend.demo.batch.processor.AnimalProcessor;
import com.backend.demo.batch.processor.CerealProcessor;
import com.backend.demo.batch.processor.EuropeProcessor;
import com.backend.demo.batch.reader.CerealReader;
import com.backend.demo.batch.reader.EuropeReader;
import com.backend.demo.batch.reader.PorcinoReaderSource1;
import com.backend.demo.batch.reader.PorcinoReaderSource2;
import com.backend.demo.batch.reader.Reader;
import com.backend.demo.batch.repository.AnimalRepository;
import com.backend.demo.batch.repository.CerealRepository;
import com.backend.demo.batch.repository.EuropeRepository;
import com.backend.demo.batch.writer.AnimalWriter;
import com.backend.demo.batch.writer.CerealWriter;
import com.backend.demo.batch.writer.EuropeWriter;
import com.backend.demo.quartz.QuartzConfiguration;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.transaction.PlatformTransactionManager;

/**
 * class BatchConfiguration
 */
@Configuration
@EnableBatchProcessing
@Import({ QuartzConfiguration.class })
public class BatchConfiguration {

	@Autowired
	public JobBuilderFactory jobBuilderFactory;
	@Autowired
	public StepBuilderFactory stepBuilderFactory;
	@Autowired
	public PlatformTransactionManager transactionManager;
	@Autowired
	private AnimalRepository animalRepository;
	@Autowired
	private CerealRepository cerealRepository;
	@Autowired
	private EuropeRepository euRepository;

	private String webUrlCoyuntura = "https://www.mapa.gob.es/es/estadistica/temas/publicaciones/informe-semanal-coyuntura/default.aspx";
	private String webUrlEurope= "https://ec.europa.eu/info/food-farming-fisheries/farming/facts-and-figures/markets/overviews/market-observatories/meat/pigmeat-statistics_en";

	private String fileUrl = "https://www.mapa.gob.es/es/estadistica/temas/publicaciones/";
	private String fileUrlEurope = "https://ec.europa.eu/info/sites/info/files/food-farming-fisheries/farming/documents/";

	private String filesDir = "files/prueba2020/";

	BatchConfiguration(){}

	// (READERS)
	/** 
	 * @return PorcinoReaderSource1
	 * @throws IOException
	 */
	@Bean
	public PorcinoReaderSource1 porcinoReader() throws IOException {
		PorcinoReaderSource1 p = new PorcinoReaderSource1(10,11,15,filesDir,"CAPA BLANCA",8,2,2,3,1);
		p.setFecha(9, 3);
		return p;
	}
	
	/** 
	 * @return PorcinoReaderSource1
	 * @throws IOException
	 */
	@Bean
	public PorcinoReaderSource1 porcinoReader1() throws IOException {
		PorcinoReaderSource1 p = new PorcinoReaderSource1(15,16,15,filesDir,"CAPA BLANCA",13,2,2,3,1);
		p.setFecha(9, 3);
		return p;
	}
	
	/** 
	 * @return PorcinoReaderSource1
	 * @throws IOException
	 */
	@Bean
	public PorcinoReaderSource1 porcinoReader2() throws IOException {
		PorcinoReaderSource1 p = new PorcinoReaderSource1(23,31,15,filesDir,"CEBADO",21,2,2,3,1);
		p.setFecha(9, 3);
		return p;
	}

	/** 
	 * @return PorcinoReaderSource2
	 * @throws IOException
	 */
	@Bean
	public PorcinoReaderSource2 porcinoReader3() throws IOException {
		PorcinoReaderSource2 p = new PorcinoReaderSource2(8,16,16,filesDir,"CERDAS DE DESVIEJE",1,2,3,1);
		p.setFecha(7, 3);
		return p;
	}

	/** 
	 * @return PorcinoReaderSource2
	 * @throws IOException
	 */
	@Bean
	public PorcinoReaderSource2 porcinoReader4() throws IOException {
		PorcinoReaderSource2 p =  new PorcinoReaderSource2(21,38,16,filesDir,"TOSTONES",1,2,3,1);
		p.setFecha(7, 3);
		return p;
	}

	/** 
	 * @return CerealReader
	 * @throws IOException
	 */
	@Bean
	public CerealReader trigoReader() throws IOException {
		CerealReader t =  new CerealReader(11,36,4,filesDir,"TRIGO",1,3,4,2);
		t.setFecha(10, 4);
		return t;
	}

	/** 
	 * @return CerealReader
	 * @throws IOException
	 */
	@Bean
	public CerealReader cebadaReader() throws IOException {
		CerealReader t =  new CerealReader(8,47,5,filesDir,"CEBADA",1,3,4,2);
		t.setFecha(7, 4);
		return t;
	}

	/** 
	 * @return CerealReader
	 * @throws IOException
	 */
	@Bean
	public CerealReader maizReader() throws IOException {
		CerealReader t =  new CerealReader(9,27,6,filesDir,"MAIZ",1,3,4,2);
		t.setFecha(8, 4);
		return t;
	}

	/** 
	 * @return CerealReader
	 * @throws IOException
	 */
	@Bean
	public CerealReader arrozReader() throws IOException {
		CerealReader t =  new CerealReader(28,47,6,filesDir,"ARROZ",1,3,4,2);
		t.setFecha(8, 4);
		return t;
	}

	/** 
	 * @return EuReader
	 * @throws IOException
	 */
	@Bean
	public EuropeReader euReaderS() throws IOException {
		EuropeReader eu = new EuropeReader(1211, 1539, 0, filesDir, "PORK", "S", 0, 2, 9, 2, 28);
		return eu;
	}

	/** 
	 * @return EuReader
	 * @throws IOException
	 */
	@Bean
	public EuropeReader euReaderE() throws IOException {
		EuropeReader eu = new EuropeReader(11, 1539, 1, filesDir, "PORK", "E", 0, 2, 9, 2, 28);
		return eu;
	}

	/** 
	 * @return EuReader
	 * @throws IOException
	 */
	@Bean
	public EuropeReader euReaderR() throws IOException {
		EuropeReader eu = new EuropeReader(1211, 1539, 2, filesDir, "PORK", "R", 0, 2, 9, 2, 28);
		return eu;
	}

	/** 
	 * @return EuReader
	 * @throws IOException
	 */
	@Bean
	public EuropeReader euReaderPiglet() throws IOException {
		EuropeReader eu = new EuropeReader(11, 1539, 3, filesDir, "PORK", "Lechon", 0, 2, 9, 2, 28);
		return eu;
	}

	
	// (PROCESSORS)
	/** 
	 * @return AnimalProcessor
	 */
	@Bean
	public AnimalProcessor animalProcessor() {
		return new AnimalProcessor();
	}
	/** 
	 * @return CerealProcessor
	 */
	@Bean
	public CerealProcessor cerealProcessor() {
		return new CerealProcessor();
	}
	/** 
	 * @return EuProcessor
	 */
	@Bean
	public EuropeProcessor euProcessor() {
		return new EuropeProcessor();
	}

	// (WRITERS)
	/** 
	 * @return AnimalWriter
	 */
	@Bean
	public AnimalWriter animalWriter() {
		return new AnimalWriter();
	}
	/** 
	 * @return CerealWriter
	 */
	@Bean
	public CerealWriter cerealWriter() {
		return new CerealWriter();
	}
	/** 
	 * @return EuWriter
	 */
	@Bean
	public EuropeWriter euWriter() {
		return new EuropeWriter();
	}

	//(LISTENER)
	/**
	 * JobCompletionNotificationListener (File loader)
	 * 
	 * @return JobExecutionListener
	 * @throws IOException
	 */
	public JobExecutionListener JobListener(List<Reader> readers) throws IOException {
		return new JobListener(webUrlCoyuntura,fileUrl,filesDir,"<a href=\"/es/estadistica/temas/publicaciones/([a-zA-Z0-9_-]+.xlsx?)\" ", readers);
	}
	
	public JobExecutionListener listenerEurope(List<Reader> readers) throws IOException {
		return new JobListener(webUrlEurope,fileUrlEurope,filesDir,"<a href=\"https://ec.europa.eu/info/sites/info/files/food-farming-fisheries/farming/documents/(historical-pig-prices-eu_en.xlsx?)\"", readers);
	}


	//(JOBS)
	/** 
	 * Configure job step
	 * @return Job
	 * @throws IOException
	 */
	@Bean
	public Job porcinoETLJob() throws IOException {
		//animalRepository.deleteAll();
		//cerealRepository.deleteAll();
		List<Reader> readers = new ArrayList<Reader>();
		readers.add(porcinoReader());
		readers.add(porcinoReader1());
		readers.add(porcinoReader2());
		readers.add(porcinoReader3());
		readers.add(porcinoReader4());
		readers.add(trigoReader());
		readers.add(maizReader());
		readers.add(arrozReader());
		readers.add(cebadaReader());
		return jobBuilderFactory.get("etl_job")
								.incrementer(new RunIdIncrementer())
								.listener(JobListener(readers))
								.start(etlStepPorcino())
								.next(etlStepPorcino1())
								.next(etlStepPorcino2())
								.next(etlStepPorcino3())
								.next(etlStepPorcino4())
								.next(etlStepTrigo())
								.next(etlStepMaiz())
								.next(etlStepArroz())
								.next(etlStepCebada())
								.build();
	}

	/** 
	 * Configure job step
	 * @return Job
	 * @throws IOException
	 */
	
	@Bean
	public Job euETLJob() throws IOException {
		euRepository.deleteAll();
		List<Reader> readers = new ArrayList<Reader>();
		readers.add(euReaderS());
		readers.add(euReaderE());
		readers.add(euReaderR());
		readers.add(euReaderPiglet());
		return jobBuilderFactory.get("porcinoEU_etl_job")
								.incrementer(new RunIdIncrementer())
								.listener(listenerEurope(readers))
								.start(etlStepEU_ClassS())
								.next(etlStepEU_ClassE())
								.next(etlStepEU_ClassR())
								.next(etlStepEU_Piglet())
								.build();
	}

	//(STEPS)
	/** 
	 * @return Step
	 * @throws IOException
	 */
	@Bean
	public Step etlStepPorcino() throws IOException {
		// The job is thus scheduled to run every x minute. In fact it should
		// be successful on the first attempt, so the second and subsequent
		// attempts should through a JobInstanceAlreadyCompleteException, so you have to set allowStartIfComplete to true
		return stepBuilderFactory.get("step1")
								.allowStartIfComplete(true)
								.transactionManager(transactionManager)
								.<Porcino, Animal> chunk(5)
								.reader(porcinoReader())
								.faultTolerant()
								.skipLimit(10)
								.skip(Exception.class)
								.processor(animalProcessor())
								.writer(animalWriter())
								.build();
	}

	/** 
	 * @return Step
	 * @throws IOException
	 */
	@Bean
	public Step etlStepPorcino1() throws IOException {
		return stepBuilderFactory.get("step2")
								.allowStartIfComplete(true)
								.transactionManager(transactionManager)
								.<Porcino, Animal> chunk(5)
								.reader(porcinoReader1())
								.faultTolerant()
								.skipLimit(10)
								.skip(Exception.class)
								.processor(animalProcessor())
								.writer(animalWriter())
								.build();
	}

	/** 
	 * @return Step
	 * @throws IOException
	 */
	@Bean
	public Step etlStepPorcino2() throws IOException {
		return stepBuilderFactory.get("step3")
								.allowStartIfComplete(true)
								.transactionManager(transactionManager)
								.<Porcino, Animal> chunk(5)
								.reader(porcinoReader2())
								.faultTolerant()
								.skipLimit(10)
								.skip(Exception.class)
								.processor(animalProcessor())
								.writer(animalWriter())
								.build();
	}

	/** 
	 * @return Step
	 * @throws IOException
	 */
	@Bean
	public Step etlStepPorcino3() throws IOException {
		return stepBuilderFactory.get("step4")
								.allowStartIfComplete(true)
								.transactionManager(transactionManager)
								.<Porcino, Animal> chunk(5)
								.reader(porcinoReader3())
								.faultTolerant()
								.skipLimit(10)
								.skip(Exception.class)
								.processor(animalProcessor())
								.writer(animalWriter())
								.build();
	}

	/** 
	 * @return Step
	 * @throws IOException
	 */
	@Bean
	public Step etlStepPorcino4() throws IOException {
		return stepBuilderFactory.get("step5")
								.allowStartIfComplete(true)
								.transactionManager(transactionManager)
								.<Porcino, Animal> chunk(5)
								.reader(porcinoReader4())
								.faultTolerant()
								.skipLimit(10)
								.skip(Exception.class)
								.processor(animalProcessor())
								.writer(animalWriter())
								.build();
	}

	/** 
	 * @return Step
	 * @throws IOException
	 */
	@Bean
	public Step etlStepTrigo() throws IOException {
		return stepBuilderFactory.get("stepTrigo")
								.allowStartIfComplete(true)
								.transactionManager(transactionManager)
								.<CerealDTO, Cereal> chunk(5)
								.reader(trigoReader())
								.faultTolerant()
								.skipLimit(10)
								.skip(Exception.class)
								.processor(cerealProcessor())
								.writer(cerealWriter())
								.build();
	}

	@Bean
	public Step etlStepCebada() throws IOException {
		return stepBuilderFactory.get("stepCebada")
								.allowStartIfComplete(true)
								.transactionManager(transactionManager)
								.<CerealDTO, Cereal> chunk(5)
								.reader(cebadaReader())
								.faultTolerant()
								.skipLimit(10)
								.skip(Exception.class)
								.processor(cerealProcessor())
								.writer(cerealWriter())
								.build();
	}

	@Bean
	public Step etlStepMaiz() throws IOException {
		return stepBuilderFactory.get("stepMaiz")
								.allowStartIfComplete(true)
								.transactionManager(transactionManager)
								.<CerealDTO, Cereal> chunk(5)
								.reader(maizReader())
								.faultTolerant()
								.skipLimit(10)
								.skip(Exception.class)
								.processor(cerealProcessor())
								.writer(cerealWriter())
								.build();
	}

	@Bean
	public Step etlStepArroz() throws IOException {
		return stepBuilderFactory.get("stepArroz")
								.allowStartIfComplete(true)
								.transactionManager(transactionManager)
								.<CerealDTO, Cereal> chunk(5)
								.reader(arrozReader())
								.faultTolerant()
								.skipLimit(10)
								.skip(Exception.class)
								.processor(cerealProcessor())
								.writer(cerealWriter())
								.build();
	}

	/** 
	 * @return Step
	 * @throws IOException
	 */
	@Bean
	public Step etlStepEU_ClassS() throws IOException {
		// The job is thus scheduled to run every x minute. In fact it should
		// be successful on the first attempt, so the second and subsequent
		// attempts should through a JobInstanceAlreadyCompleteException, so you have to set allowStartIfComplete to true
		return stepBuilderFactory.get("ClassS")
								.allowStartIfComplete(true)
								.transactionManager(transactionManager)
								.<EuropePork, EuropePork> chunk(5)
								.reader(euReaderS())
								.faultTolerant()
								.skipLimit(20)
								.skip(Exception.class)
								.processor(euProcessor())
								.writer(euWriter())
								.build();
	}

	@Bean
	public Step etlStepEU_ClassE() throws IOException {
		// The job is thus scheduled to run every x minute. In fact it should
		// be successful on the first attempt, so the second and subsequent
		// attempts should through a JobInstanceAlreadyCompleteException, so you have to set allowStartIfComplete to true
		return stepBuilderFactory.get("ClassE")
								.allowStartIfComplete(true)
								.transactionManager(transactionManager)
								.<EuropePork, EuropePork> chunk(5)
								.reader(euReaderE())
								.faultTolerant()
								.skipLimit(20)
								.skip(Exception.class)
								.processor(euProcessor())
								.writer(euWriter())
								.build();
	}

	@Bean
	public Step etlStepEU_ClassR() throws IOException {
		// The job is thus scheduled to run every x minute. In fact it should
		// be successful on the first attempt, so the second and subsequent
		// attempts should through a JobInstanceAlreadyCompleteException, so you have to set allowStartIfComplete to true
		return stepBuilderFactory.get("ClassR")
								.allowStartIfComplete(true)
								.transactionManager(transactionManager)
								.<EuropePork, EuropePork> chunk(5)
								.reader(euReaderR())
								.faultTolerant()
								.skipLimit(20)
								.skip(Exception.class)
								.processor(euProcessor())
								.writer(euWriter())
								.build();
	}

	@Bean
	public Step etlStepEU_Piglet() throws IOException {
		// The job is thus scheduled to run every x minute. In fact it should
		// be successful on the first attempt, so the second and subsequent
		// attempts should through a JobInstanceAlreadyCompleteException, so you have to set allowStartIfComplete to true
		return stepBuilderFactory.get("Piglet")
								.allowStartIfComplete(true)
								.transactionManager(transactionManager)
								.<EuropePork, EuropePork> chunk(5)
								.reader(euReaderPiglet())
								.faultTolerant()
								.skipLimit(20)
								.skip(Exception.class)
								.processor(euProcessor())
								.writer(euWriter())
								.build();
	}

}
