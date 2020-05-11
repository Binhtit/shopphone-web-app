package com.softech.shopphone.util;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.softech.shopphone.entity.dataHolder.DataHolderData;

public class ResWebData {
	protected List<DataHolderData> data;
	
	@JsonProperty(value = "data")
	public List<DataHolderData> getData(){
		return data;
	}
	
	public void setData(List<DataHolderData> data) {
		this.data = (data);
	}
}
