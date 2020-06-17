package com.backend.demo.batch.reader;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.annotation.AfterStep;
import org.springframework.batch.core.annotation.BeforeStep;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.UnexpectedInputException;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.backend.demo.batch.util.CellUtility;
import com.backend.demo.batch.model.Porcino;

public class PorcinoReaderSource2 implements ItemReader<Porcino>, Reader {

	private static final Logger log = LoggerFactory.getLogger(PorcinoReaderSource2.class);

	private XSSFWorkbook workbook;
	private HSSFWorkbook workbookHSSF;
	private FileInputStream file;
	private List<String> files;
	private String urlFiles;
	private int index;
	private Sheet sheet;
	private int numSheet;
	private Row row;
	private int initial;
	private int initialRow;
	private int finalRow;

	// PARAMETROS
	private int fechaFila;
	private int fechaCol;
	private String tipo;
	private String tipoI;
	private int clase;
	private int semAnt;
	private int semAct;

	public PorcinoReaderSource2(){}

	public PorcinoReaderSource2(int initialRow, int finalRow, int numSheet,  String urlFiles, String tipo, int clase,
	 int semAnt, int semAct, int mercado) throws IOException {
		
		this.urlFiles = urlFiles;
		this.initial = initialRow;
		this.initialRow=initialRow;
		this.finalRow=finalRow;	

		this.tipo = tipo;
		this.tipoI = tipo;
		this.clase = clase;
		this.semAnt = semAnt;
		this.semAct = semAct;

		this.numSheet = numSheet;
		this.index = 0;
	}


	public void setFecha(int f, int c){
		fechaFila = f;
		fechaCol = c;
	}

	@BeforeStep
	public void beforeStep(StepExecution stepExecution) throws IOException {
		/*
		JobParameters jobParameters = stepExecution.getJobParameters();
		String path = jobParameters.getString("filePath");
		System.out.println(path);
		
		if(index==0){
			files = HttpDownloadUtility.listFiles(urlFiles);
		}
		*/
		openFile(urlFiles + files.get(index));
	}

	@AfterStep
	public void afterStep(StepExecution stepExecution) throws IOException {
		//index++;
		index=0;
	}

	/** 
	 * @return Porcino
	 * @throws Exception
	 * @throws UnexpectedInputException
	 * @throws NonTransientResourceException
	 * @throws ParseException
	 */
	@Override
	public Porcino read() throws Exception, UnexpectedInputException, NonTransientResourceException, ParseException {
		Porcino next = null;
		
		if (initialRow<finalRow && initialRow < sheet.getLastRowNum()) {
			row = sheet.getRow(initialRow);
			while (CellUtility.isCellEmpty(row.getCell(clase))) {
				initialRow++;
				row = sheet.getRow(initialRow);
			}
			if (CellUtility.isCellEmpty(row.getCell(semAnt))) {
				// This cell is empty
				tipo=row.getCell(clase).toString();
				initialRow++;
			}
			next = createPorcino();

		}
		else{
			tipo=tipoI;
			initialRow=initial;
			file.close();
			if(index<files.size()){
				index++;
				openFile(urlFiles + files.get(index));
				next = read();
			}
		}

		return next;
	}


	//PRIVATE OPERATIONS
	/** 
	 * @param numSheet
	 * @param namefile
	 * @throws IOException
	 */
	private void openFile(String namefile) throws IOException {
		file = new FileInputStream(new File(namefile));
		String[] tipo = namefile.split("\\.");
		if(tipo[1].equals("xls")){
			// Create Workbook instance holding reference to .xls file
			workbookHSSF = new HSSFWorkbook(file);
			// Get first/desired sheet from the workbook
			sheet = workbookHSSF.getSheetAt(numSheet);
		}
		else{
			// Create Workbook instance holding reference to .xlsx file
			workbook = new XSSFWorkbook(file);
			// Get first/desired sheet from the workbook
			sheet = workbook.getSheetAt(numSheet);
		}
		log.info("Open file: " + namefile);
	}

	public void filesToRead(List<String> files){
		this.files = files;
	}
	
	/** 
	 * @return Porcino
	 */
	Porcino createPorcino(){
		Porcino p = new Porcino();
		row = sheet.getRow(initialRow);
		while (CellUtility.isCellEmpty(row.getCell(semAnt)) || !CellUtility.isNumber(row.getCell(semAnt)) || !CellUtility.isNumber(row.getCell(semAct))) {
			initialRow++;
			row = sheet.getRow(initialRow);
		}

		p.setSemanaActual(sheet.getRow(fechaFila).getCell(fechaCol).getStringCellValue());
		p.setTipo(tipo);
		p.setClase(row.getCell(clase).toString());
		p.setPrecioSemanaAnterior(row.getCell(semAnt).toString());
		p.setPrecioSemanaActual(row.getCell(semAct).toString());
		p.setVariacion();
		initialRow++;
		return p;
	}

}