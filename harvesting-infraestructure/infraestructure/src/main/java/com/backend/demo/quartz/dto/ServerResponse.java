package com.backend.demo.quartz.dto;

public class ServerResponse {
	private int statusCode;
	private Object data;
	
	
	/** 
	 * @return int
	 */
	public int getStatusCode() {
		return statusCode;
	}
	
	/** 
	 * @param statusCode
	 */
	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}
	
	
	/** 
	 * @return Object
	 */
	public Object getData() {
		return data;
	}
	
	/** 
	 * @param data
	 */
	public void setData(Object data) {
		this.data = data;
	}
}

