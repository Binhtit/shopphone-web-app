package com.softech.shopphone.controller.productList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.softech.shopphone.entity.dataHolder.DataHolder;
import com.softech.shopphone.services.productList.ProductListServices;

@Controller
public class ProductListController {


	
	@Autowired
	private ProductListServices productListServices;
	
	@GetMapping(path = "/web/product-list/1" + "/{typeProduct}")
	public String getProductList( @PathVariable Integer typeProduct, Model model) {
		DataHolder dataHolder = new DataHolder();
		
		dataHolder = productListServices.getProductList(typeProduct);
		
		model.addAllAttributes(dataHolder.getModel());

		return "product-list";
	}
}
