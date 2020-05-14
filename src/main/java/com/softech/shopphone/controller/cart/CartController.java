package com.softech.shopphone.controller.cart;

import java.net.InetAddress;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softech.shopphone.config.COMMON;
import com.softech.shopphone.dao.login.LoginDao;
import com.softech.shopphone.dao.token.TokenDao;
import com.softech.shopphone.entity.account.RstAccount;
import com.softech.shopphone.entity.dataHolder.DataHolder;
import com.softech.shopphone.entity.product.RstProduct;
import com.softech.shopphone.entity.token.RstToken;
import com.softech.shopphone.services.cart.CartServices;

@Controller
public class CartController {
	@Autowired
	private CartServices cartServices;
	
	@Autowired
	private TokenDao tokenDao;
	
	@Autowired
	private LoginDao loginDao;
	
	
//	public DataHolder getCart(@CookieValue(name = "user_token", required = false) String user_token, Model model) {
		
	//	DataHolder dataHolder = cartServices.getCart(user_token);
//		return null;
//	 }
	
	
	@PostMapping(path = "/web/addCart")
	@ResponseBody
	public ResponseEntity<Object> addCart(@CookieValue(name = "user_token", required = false) String user_token, Model model, @RequestParam Integer idProduct, @RequestParam Integer numProduct) {
		DataHolder dataHolder = new DataHolder();
		
		cartServices.addCart(user_token, dataHolder, idProduct, numProduct);
		
		
		return new ResponseEntity<>(dataHolder, HttpStatus.OK);
	}
	
	
	@PostMapping(path = "/web/getCart")
	@ResponseBody
	public ResponseEntity<Object> getCart(@CookieValue(name = "user_token", required = false) String user_token) {
		DataHolder dataHolder = new DataHolder();
		
		cartServices.getCartDetail(user_token, dataHolder);
		
		
		return new ResponseEntity<>(dataHolder, HttpStatus.OK);
	}

}
