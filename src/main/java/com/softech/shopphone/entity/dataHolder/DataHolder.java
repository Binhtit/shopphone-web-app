package com.softech.shopphone.entity.dataHolder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DataHolder {
	
	protected String screen;
	protected List<DataHolderData> data;
	protected Map<String, Object> model;	// use for get method set value to web page
	
	public DataHolder() {	// ??
		screen = "error";
		model = new HashMap<String, Object>();
//		cookies = new HashMap<String, String>();
		data = new ArrayList<DataHolderData>();
	}
	

	/**
	 * add model for AJAX use dataHolder.
	 *
	 */
	public DataHolder add(String key, Object value) {
		DataHolderData dataHolderData = new DataHolderData(key,value);	//add key
		this.data.add(dataHolderData);	//add data is dataholder
		return this;
	}
	
	public DataHolder ok(String value) {
		DataHolderData dataHolderData = new DataHolderData("success", value);	//add key
		this.data.add(dataHolderData);	//add data for browser
		return this;
	}
	
	public DataHolder error(String value) {
		DataHolderData dataHolderData = new DataHolderData("error",value);	//add key
		this.data.add(dataHolderData);	//add data for browser
		return this;
	}
	
	
	/**
	 * add model for browser Thymeleaf.
	 *
	 */
	public DataHolder putModel(String key, Object value) {
		this.model.put(key, value);	//add model for browser
		return this;
	}
	//---------------------------
	
	public String getScreen() {
		return screen;
	}
	public void setScreen(String screen) {
		this.screen = screen;
	}
	public List<DataHolderData> getData() {
		return data;
	}
	public void setData(List<DataHolderData> data) {
		this.data = data;
	}
	
	
	public Map<String, Object> getModel() {
		return model;
	}

	public void setModel(Map<String, Object> model) {
		this.model = model;
	}
	
}
