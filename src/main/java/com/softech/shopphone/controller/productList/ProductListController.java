package com.softech.shopphone.controller.productList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.softech.shopphone.entity.dataHolder.DataHolder;
import com.softech.shopphone.services.cart.CartServices;
import com.softech.shopphone.services.index.IndexServices;
import com.softech.shopphone.services.productList.ProductListServices;

@Controller
public class ProductListController {


	@Autowired
	private IndexServices loginService;

	
	@Autowired
	private ProductListServices productListServices;
	
	@Autowired
	private CartServices cartServices;
	
	@GetMapping(path = "/web/product-list/" + "/{typeProduct}")
	public String getProductList(@CookieValue(name = "user_token", required = false) String userToken, @PathVariable Integer typeProduct, Model model) {
		DataHolder dataHolder = new DataHolder();
		loginService.confirmUser(dataHolder, userToken);
		
		productListServices.getProductList(dataHolder, typeProduct);
		cartServices.getCart(userToken, dataHolder);
		
		model.addAllAttributes(dataHolder.getModel());

		return dataHolder.getScreen();
	}
}
