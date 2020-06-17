package com.backend.demo.batch.util;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;

public class CellUtility {
	
	/**
	 * Checks if the value of a given {@link XSSFCell} is empty.
	 * 
	 * @param cell
	 *            The {@link XSSFCell}.
	 * @return {@code true} if the {@link XSSFCell} is empty. {@code false}
	 *         otherwise.
	 */
	public static boolean isCellEmpty(final Cell cell) {
		if (cell == null) { // use row.getCell(x, Row.CREATE_NULL_AS_BLANK) to avoid null cells
			return true;
		}

		if (cell.getCellType() == CellType.BLANK) {
			return true;
		}

		if (cell.getCellType() == CellType.STRING && cell.getStringCellValue().trim().isEmpty()) {
			return true;
		}

		return false;
	}

	public static boolean isNumber(final Cell cell) {
		if (isNumeric(cell.toString().replace(",", "."))) {
			return true;
		}
		return false;
	}

	public static boolean isNumeric(String cadena) {
        boolean resultado;
        try {
            Double.parseDouble(cadena);
            resultado = true;
        } catch (NumberFormatException excepcion) {
            resultado = false;
        }
        return resultado;
	}
}