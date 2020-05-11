package com.softech.shopphone.util;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.softech.shopphone.entity.dataHolder.DataHolder;
/**
 * 
 * @author binhle
 *
 */
public class ResponseUtil {
	private ResponseUtil() {
	}
	
	public static ResponseEntity<Object> response(DataHolder dataHolder){
		ResWebData resWebData = new ResWebData();
		resWebData.setData(dataHolder.getData());
		
		return new ResponseEntity<>(resWebData, HttpStatus.OK);
		
		
	}
}
