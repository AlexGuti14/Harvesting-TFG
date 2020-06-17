package com.example.demo.batch.util;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import com.backend.demo.batch.util.HttpDownloadUtility;

import org.junit.Test;

public class HttpDownloadUtilityTest {

	/*
	 * Se comprueba que se encuentra el fichero almacenado en la web
	 */
	@Test
	public void getAllFilesPatron_Test() {
		String webUrl = "https://www.mapa.gob.es/es/estadistica/temas/publicaciones/informe-semanal-coyuntura/2020.aspx";
		String patronBusqueda = "<a href=\"/es/estadistica/temas/publicaciones/(informesemanaldecoyunturas-18_tcm30-537807.xlsx)\" ";
		
		String html = HttpDownloadUtility.getHTML(webUrl);

		List<String> files = HttpDownloadUtility.getAllFiles(html,patronBusqueda);

		List<String> filesDownload = new ArrayList<String>();
		filesDownload.add("informesemanaldecoyunturas-18_tcm30-537807.xlsx");

		assertEquals(files, filesDownload);
	}

	/*
	 * Se comprueba la correcta descarga del fichero almacenado en la web
	 */
	@Test
	public void downloadFile_and_existFile_Test() throws IOException {
				
		String fileDownload = "https://www.mapa.gob.es/es/estadistica/temas/publicaciones/informesemanaldecoyunturas-18_tcm30-537807.xlsx";
		String dir = "src/test/resources/filesTest/";
		String name = "informesemanaldecoyunturas-18_tcm30-537807.xlsx";

		HttpDownloadUtility.downloadFile(fileDownload, dir, name);
		List<String> files = HttpDownloadUtility.listFiles(dir);
		assertEquals(files.get(0), name);

		boolean exist = HttpDownloadUtility.existFile(dir + "/" + name);
		assertTrue(exist);
	}

}