package com.softech.shopphone.controller.singleproduct;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.softech.shopphone.entity.dataHolder.DataHolder;
import com.softech.shopphone.services.singleproduct.SingleProductService;

@Controller
public class SingleProductController {
	@Autowired
	SingleProductService singleProductService;
	
	@GetMapping(path = "web/single-product" + "/{idProduct}")
	public String checkLogin(@CookieValue(name = "user_token", required = false) String userToken, @PathVariable Integer idProduct, Model model) {
		DataHolder dataHolder = singleProductService.getSingleProduct(userToken, idProduct);
		
		model.addAllAttributes(dataHolder.getModel());
		return dataHolder.getScreen();
	}
}
