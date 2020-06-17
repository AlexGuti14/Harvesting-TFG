package com.backend.demo.batch.model;

import org.joda.time.LocalDate;

public class DateJson {

	private LocalDate standard;
	private LocalDate timestamp;

	public DateJson(LocalDate standard, LocalDate timestamp) {
		this.standard = standard;
		this.timestamp = timestamp;
	}

	public LocalDate getStandard() {
		return standard;
	}

	public void setStandard(LocalDate standard) {
		this.standard = standard;
	}

	public LocalDate getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDate timestamp) {
		this.timestamp = timestamp;
	}
	
}