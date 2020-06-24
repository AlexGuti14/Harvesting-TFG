package com.backend.demo.batch.reader;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.joda.time.LocalDate;
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
import java.time.LocalDateTime;
import java.util.List;
import java.util.Vector;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.backend.demo.batch.util.CellUtility;
import com.backend.demo.batch.model.DateJson;
import com.backend.demo.batch.model.EuropePork;

public class EuropeReader implements ItemReader<EuropePork>, Reader  {

	private static final Logger log = LoggerFactory.getLogger(EuropeReader.class);

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
	private int finalColum;
	private int filaMercado;
	private int columMercadosI;

	// PARAMETROS
	private String tipo;
	private String clase;
	private int fecha;
	private int price;
	Vector<String> mercados;

	public EuropeReader(){}

	public EuropeReader(int initialRow, int finalRow, int numSheet,  String urlFiles, String tipo, String clase, int fecha, int price, 
	int filaMercado ,int columMercadosI, int columMercados) throws IOException {
		
		this.urlFiles = urlFiles;
		this.initial = initialRow;
		this.initialRow=initialRow;
		this.finalRow=finalRow;
		this.filaMercado=filaMercado;
		this.columMercadosI=columMercadosI;
		this.finalColum=columMercados;

		this.tipo = tipo;
		this.clase = clase;
		this.fecha = fecha;
		this.price = price;

		this.numSheet = numSheet;
		this.index = 0;
	}

	@BeforeStep
	public void beforeStep(StepExecution stepExecution) throws IOException {
		openFile(urlFiles + files.get(index));
		mercados = mercados(filaMercado, columMercadosI, finalColum);
	}

	@AfterStep
	public void afterStep(StepExecution stepExecution) throws IOException {
		index = 0;
	}

	/** 
	 * @return Porcino
	 * @throws Exception
	 * @throws UnexpectedInputException
	 * @throws NonTransientResourceException
	 * @throws ParseException
	 */
	@Override
	public EuropePork read() throws Exception, UnexpectedInputException, NonTransientResourceException, ParseException {
		EuropePork next = null;
		try {
			if (initialRow <= sheet.getLastRowNum()) {
				row = sheet.getRow(initialRow);
				next = createEuropePork();
				initialRow++;
			}
			else{
				initialRow=initial;
				file.close();
			}
			
		} catch (Exception e) {
			initialRow++;
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

	
	/** 
	 * @return Cereal
	 */
	EuropePork createEuropePork(){

		LocalDateTime d = row.getCell(fecha).getLocalDateTimeCellValue();
		LocalDate  date = new LocalDate(d.getYear(), d.getMonthValue(), d.getDayOfMonth());
		EuropePork eu = new EuropePork(new DateJson(date, new LocalDate()), tipo, clase);
		int m = 0;
		int i = price;
		while(i<finalColum){
			if(!CellUtility.isCellEmpty(row.getCell(i)) && CellUtility.isNumber(row.getCell(i))){
				String priceS = row.getCell(i).toString();
				eu.setMercado(priceS, mercados.get(m));
			}
			i++;
			m++;
		}
		return eu;
	}

	/** 
	 * @return List of markets
	 */
	Vector<String> mercados(int filaMercado, int i, int j){
		Vector<String> mercados = new Vector<String>();
		Row merca = row = sheet.getRow(filaMercado);
		while(i<=j){
			mercados.add(merca.getCell(i).toString());
			i++;
		}
		return mercados;
	}

	public void filesToRead(List<String> files){
		this.files = files;
	}
}