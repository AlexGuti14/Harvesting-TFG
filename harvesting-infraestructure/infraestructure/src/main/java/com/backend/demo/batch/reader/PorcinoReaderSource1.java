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
import com.backend.demo.batch.util.HttpDownloadUtility;
import com.backend.demo.batch.model.Porcino;

public class PorcinoReaderSource1  implements ItemReader<Porcino>, Reader {

	private static final Logger log = LoggerFactory.getLogger(PorcinoReaderSource1.class);

	private XSSFWorkbook workbook;
	private HSSFWorkbook workbookHSSF;
	private FileInputStream file;
	private int index;
	private int numSheet;
	private Sheet sheet;
	private Row row;
	private List<String> files;
	private String urlFiles;
	private int initial;
	private int initialRow;
	private int finalRow;
	private int initialColumn;
	private int finalColumn;

	// Parametros iniciales
	private int claseColIni;
	private int semAntIni;
	private int semActIni;

	// PARAMETROS
	private int fechaFila;
	private int fechaCol;
	private String tipo;
	private int clasefila;
	private int claseCol;
	private int semAnt;
	private int semAct;
	private int mercado;

	public PorcinoReaderSource1(){}

	public PorcinoReaderSource1(int initialRow, int finalRow, int numSheet, String urlFiles, String tipo, int clasefila,
			int claseCol, int semAnt, int semAct, int mercado) throws IOException {

		this.urlFiles = urlFiles;
		this.initial = initialRow;
		this.initialRow = initialRow;
		this.finalRow = finalRow;
		this.initialColumn = 1;
		this.finalColumn = 3;

		claseColIni = claseCol;
		semAntIni = semAnt;
		semActIni = semAct;

		this.tipo = tipo;
		this.clasefila = clasefila;
		this.claseCol = claseCol;
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
	
	public void setNumSheet(int numSheet) {
		this.numSheet = numSheet;
	}


	public void setInitialRow(int initialRow) {
		this.initialRow = initialRow;
	}

	public void setFinalRow(int finalRow) {
		this.finalRow = finalRow;
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
		//index++;
		index=0;
	}

	@Override
	public Porcino read() throws Exception, UnexpectedInputException, NonTransientResourceException, ParseException {
		Porcino next = null;

		if (initialRow<finalRow && initialRow < sheet.getLastRowNum()  - 1) {
			next = createPorcino();
		}
		else if(initialColumn<finalColumn){

			initialRow = initial;
			initialColumn++;

			claseCol = claseCol + 3;
			semAnt = semAnt + 3;
			semAct = semAct + 3;

			next = createPorcino();
		}
		else{
			initialRow=initial;
			initialColumn=1;
			claseCol=claseColIni;
			semAnt=semAntIni;
			semAct=semActIni;
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
	private Porcino createPorcino(){
		Porcino p = new Porcino();
		row = sheet.getRow(initialRow);
		while (CellUtility.isCellEmpty(row.getCell(semAnt)) || !CellUtility.isNumber(row.getCell(semAnt)) || !CellUtility.isNumber(row.getCell(semAct))) {
			initialRow++;
			row = sheet.getRow(initialRow);
		}

		int c = clasefila;
		int f = fechaFila;

		if(CellUtility.isCellEmpty(sheet.getRow(clasefila).getCell(claseCol))){
			clasefila += 1;
			fechaFila += 1;
		}
		
		p.setSemanaActual(sheet.getRow(fechaFila).getCell(fechaCol).toString());
		p.setTipo(tipo);
		p.setClase(sheet.getRow(clasefila).getCell(claseCol).toString());
		p.setPrecioSemanaAnterior(row.getCell(semAnt).toString());
		p.setPrecioSemanaActual(row.getCell(semAct).toString());
		p.setVariacion();
		p.setMercado(row.getCell(mercado).toString());

		initialRow++;

		clasefila = c;
		fechaFila = f;

		return p;
	}
}