package com.softech.shopphone.entity.dataHolder;
/**
 * 
 * @author binhle
 *
 */
public class DataHolderData {
	protected String keyData;
	protected Object valueData;
	
	
	
	public DataHolderData(String keyData, Object valueData) {
		super();
		this.keyData = keyData;
		this.valueData = valueData;
	}
	
	public String getKeyData() {
		return keyData;
	}
	public void setKeyData(String keyData) {
		this.keyData = keyData;
	}
	public Object getValueData() {
		return valueData;
	}
	public void setValueData(Object valueData) {
		this.valueData = valueData;
	}
	
	
	
	
}
