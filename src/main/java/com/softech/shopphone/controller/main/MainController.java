package com.softech.shopphone.controller.main;


import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.softech.shopphone.entity.dataHolder.DataHolder;
import com.softech.shopphone.services.login.LoginServices;



@Controller
public class MainController {
	@Autowired
	private LoginServices loginService;
	
	@GetMapping(path = "/")
	public String main(HttpServletResponse response, Model model) {
		DataHolder dataHolder = new DataHolder();
		
		loginService.addProductPhone(dataHolder);	        //add product
		loginService.addNewProductPhone(dataHolder);	    //
		loginService.addProductHeadphone(dataHolder);	    //
		loginService.addProductBatteryBackup(dataHolder);	//
		loginService.addProductOther(dataHolder);			//
		
		
		model.addAllAttributes(dataHolder.getModel());
		return "index";
	}
}
