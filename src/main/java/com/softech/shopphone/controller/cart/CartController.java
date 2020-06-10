package com.softech.shopphone.controller.cart;

import java.net.InetAddress;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
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
import com.softech.shopphone.services.checkout.CheckoutServices;
import com.softech.shopphone.services.index.IndexServices;

@Controller
public class CartController {
	@Autowired
	private CartServices cartServices;
	
	@Autowired
	private TokenDao tokenDao;
	
	@Autowired
	private LoginDao loginDao;
	
	@Autowired
	private CheckoutServices checkoutServices;
	
	@Autowired
	private IndexServices loginService;
	
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
	
	

	
	@GetMapping(path = "/web/checkout")
	public Object checkout(@CookieValue(name = "user_token", required = false) String user_token, Model model) {
		DataHolder dataHolder = new DataHolder();
		
		loginService.confirmUser(dataHolder, user_token);
		checkoutServices.checkout(user_token, dataHolder);
				
		cartServices.getCartDetail(user_token, dataHolder);
		
		
		model.addAllAttributes(dataHolder.getModel());
//		return dataHolder.getScreen();
		return "checkout";
	}
	
	
	@PostMapping(path = "/web/goorder")
	@ResponseBody
	public ResponseEntity<Object> goOrder(@CookieValue(name = "user_token", required = false) String user_token, @RequestParam String cusName, 
			@RequestParam String cusAddress, @RequestParam String cusEmail, @RequestParam String cusPhone, @RequestParam String cusNote ) {
		DataHolder dataHolder = new DataHolder();
		
		checkoutServices.goOrder(user_token, dataHolder, cusName, cusAddress, cusEmail, cusPhone, cusNote);
		
		
		return new ResponseEntity<>(dataHolder, HttpStatus.OK);
	}
	
	
	

}
