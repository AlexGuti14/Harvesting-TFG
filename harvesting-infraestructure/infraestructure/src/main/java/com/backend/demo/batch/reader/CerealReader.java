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
import com.backend.demo.batch.model.CerealDTO;

public class CerealReader implements ItemReader<CerealDTO>, Reader {

	private static final Logger log = LoggerFactory.getLogger(CerealReader.class);

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
	private String clase;
	private int claseIndex;
	private int semAnt;
	private int semAct;
	private int mercado;

	public CerealReader(){}

	public CerealReader(int initialRow, int finalRow, int numSheet,  String urlFiles, String tipo, int clase,
	 int semAnt, int semAct, int mercado) throws IOException {
		
		this.urlFiles = urlFiles;
		this.initial = initialRow;
		this.initialRow=initialRow;
		this.finalRow=finalRow;	

		this.tipo = tipo;
		this.claseIndex = clase;
		this.semAnt = semAnt;
		this.semAct = semAct;
		this.mercado = mercado;

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
		if(index==0){
			files = HttpDownloadUtility.listFiles(urlFiles);
		}
		*/
		openFile(urlFiles + files.get(index));
		
	}

	@AfterStep
	public void afterStep(StepExecution stepExecution) throws IOException {
		index=0;
	}

	/** 
	 * @return CerealDTO
	 * @throws Exception
	 * @throws UnexpectedInputException
	 * @throws NonTransientResourceException
	 * @throws ParseException
	 */
	@Override
	public CerealDTO read() throws Exception, UnexpectedInputException, NonTransientResourceException, ParseException {
		CerealDTO next = null;
		if (initialRow<finalRow && initialRow < sheet.getLastRowNum()  - 1) {
			row = sheet.getRow(initialRow);
			while (CellUtility.isCellEmpty(row.getCell(semAnt)) || !CellUtility.isNumber(row.getCell(semAnt)) || !CellUtility.isNumber(row.getCell(semAct))) {
				initialRow++;
				if(initialRow >= sheet.getLastRowNum()){
					initialRow=initial;
					file.close();
					if(index<files.size()){
						index++;
						openFile(urlFiles + files.get(index));
						next = read();
					}
					return next;
				}
				row = sheet.getRow(initialRow);
			}
			if (!CellUtility.isCellEmpty(row.getCell(claseIndex))) {
				// This cell is not empty
				clase=row.getCell(claseIndex).toString();
			}
			next = createCereal();
			initialRow++;
		}
		else{
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
	public void openFile(String namefile) throws IOException {
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

	/** 
	 * @return Cereal
	 */
	CerealDTO createCereal(){
		CerealDTO c = new CerealDTO();
		c.setSemanaActual(sheet.getRow(fechaFila).getCell(fechaCol).toString());
		c.setTipo(tipo);
		c.setClase(clase);
		c.setMercado(row.getCell(mercado).toString());
		c.setPrecioSemanaAnterior(row.getCell(semAnt).toString());
		c.setPrecioSemanaActual(row.getCell(semAct).toString());
		c.setVariacion();
		return c;
	}

	public void filesToRead(List<String> files){
		this.files = files;
	}
}