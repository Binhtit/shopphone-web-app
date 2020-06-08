package com.softech.shopphone.controller.main;


import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;

import com.softech.shopphone.entity.dataHolder.DataHolder;
import com.softech.shopphone.services.cart.CartServices;
import com.softech.shopphone.services.index.IndexServices;



@Controller
public class MainController {
	@Autowired
	private IndexServices loginService;
	
	@Autowired
	private CartServices cartServices;
	
	
	@GetMapping(path = "/")
	public String main(@CookieValue(name = "user_token", required = false) String user_token, HttpServletResponse response, Model model) {
		DataHolder dataHolder = new DataHolder();
		
		loginService.processIndex(dataHolder, user_token);
		
//		loginService.addProductPhone(dataHolder);	        //add product
//		loginService.addNewProductPhone(dataHolder);	    //
//		loginService.addProductHeadphone(dataHolder);	    //
//		loginService.addProductBatteryBackup(dataHolder);	//
//		loginService.addProductOther(dataHolder);			//
//		
//		cartServices.getCart(user_token, dataHolder);		//add cart
		
		model.addAllAttributes(dataHolder.getModel());
		return "index";
	}
}
