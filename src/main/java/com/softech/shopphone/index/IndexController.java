package com.softech.shopphone.index;


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

import com.softech.shopphone.dao.login.LoginDao;
import com.softech.shopphone.dao.product.ProductDao;
import com.softech.shopphone.entity.account.RstAccount;
import com.softech.shopphone.entity.dataHolder.DataHolder;
import com.softech.shopphone.entity.product.RstProduct;
import com.softech.shopphone.services.cart.CartServices;
import com.softech.shopphone.services.checkout.CheckoutServices;
//import com.softech.shopphone.entity.account.RstLogin;
import com.softech.shopphone.services.login.LoginServices;
import com.softech.shopphone.services.singleproduct.SingleProductService;

/**
 * 
 * @author binhle
 *
 */


@Controller
public class IndexController {
	@Autowired
	private LoginDao loginDao;
	
	@Autowired
	private LoginServices loginService;
	
	@Autowired
	private CartServices cartServices;
	
	@Autowired
	private SingleProductService singleProductService;
	

	
	@GetMapping(path = "/web/login-register")
	public String loginRegister() {
		return "login-register";
	}

	
	// 1
	@PostMapping(path = "/web/login")
	public @ResponseBody ResponseEntity<Object> checkLogin(@RequestParam String username, @RequestParam String password, Model model, HttpServletResponse response) {
		DataHolder dataHolder = new DataHolder();
		RstAccount rstAccount =  loginDao.getLogin(username, password);
		
		//	wrong password
		if (rstAccount == null) {
			dataHolder.error("Email hoặc mất khẩu không đúng!");
			return new ResponseEntity<>(dataHolder, HttpStatus.OK);
		}else {
			// success
			dataHolder.ok("");
//			dataHolder.add("account", rstAccount);
			loginService.addCookie(response, rstAccount.getIdAccount());
			
			
			dataHolder.setScreen("/web/index");
			return new ResponseEntity<>(dataHolder, HttpStatus.OK);
		}
		
	}
	
	// 2
	@GetMapping(path = "/web/index")
	public Object index(@CookieValue(name = "user_token", required = false) String user_token, Model model) {
		DataHolder dataHolder = new DataHolder();
		
		loginService.confirmUser(dataHolder, user_token);
		
		
		loginService.processIndex(dataHolder, user_token);
		
		
		model.addAllAttributes(dataHolder.getModel());
		return dataHolder.getScreen();
	}
	

	

	@PostMapping(path = "/web/register")
	@ResponseBody
	public ResponseEntity<Object> register(@RequestParam String fistName, @RequestParam String lastName, @RequestParam String address, @RequestParam String email, @RequestParam Integer phone, @RequestParam String pass, HttpServletResponse response) {
		
		 DataHolder dataHolder = loginService.register(fistName, lastName, address, email, phone, pass);
		
		return new ResponseEntity<>(dataHolder, HttpStatus.OK);
	}

	
	@GetMapping(path = "/web/singout")
	public String singOut(@CookieValue(name = "user_token", required = false) String user_token, HttpServletRequest request, HttpServletResponse response, Model model) {
		DataHolder dataHolder = loginService.singOut(request, response, user_token, model);
		user_token = null;									//reset before to count cart
		
		loginService.processIndex(dataHolder, user_token);
		
		
		model.addAllAttributes(dataHolder.getModel());
		return dataHolder.getScreen();

	}
	
	

	@PostMapping(path = "/web/quickView")
	@ResponseBody
	public ResponseEntity<Object> quickView(@CookieValue(name = "user_token", required = false) String user_token, Model model, @RequestParam Integer idProduct) {
		DataHolder dataHolder = new DataHolder();
		
		dataHolder = singleProductService.getSingleProduct(user_token, idProduct);
		
		return new ResponseEntity<>(dataHolder, HttpStatus.OK);
	}
	
	
	
	
	
	

	
	
	
	
	
	
	
	
}
