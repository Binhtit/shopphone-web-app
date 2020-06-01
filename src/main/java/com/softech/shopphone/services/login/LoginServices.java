package com.softech.shopphone.services.login;


import java.util.List;
import java.util.Random;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.softech.shopphone.config.COMMON;
import com.softech.shopphone.dao.login.LoginDao;
import com.softech.shopphone.dao.product.ProductDao;
import com.softech.shopphone.dao.token.TokenDao;
import com.softech.shopphone.entity.account.PrmAccount;
import com.softech.shopphone.entity.account.RstAccount;
import com.softech.shopphone.entity.dataHolder.DataHolder;
import com.softech.shopphone.entity.product.RstProduct;
import com.softech.shopphone.entity.token.PrmToken;
import com.softech.shopphone.entity.token.RstToken;
import com.softech.shopphone.services.cart.CartServices;

@Service
public class LoginServices {
	@Autowired
	private TokenDao tokenDao;
	
	@Autowired
	private LoginDao loginDao;
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private CartServices cartServices;
	
	public void addCookie(HttpServletResponse response, Integer idAccount) {
		
		Random rand = new Random();
		Long randNum = rand.nextLong();
		
		String cookieValue = idAccount.toString().concat(String.valueOf(System.currentTimeMillis()+randNum));
		
		Cookie cookie = new Cookie("user_token", cookieValue);
		
		cookie.setMaxAge(100000);	//time cookie Expires
		
		PrmToken prmToken =  new PrmToken();
		prmToken.setIdLogin(idAccount);
		prmToken.setToken(cookieValue);
		
		tokenDao.setToken(prmToken);
		
		response.addCookie(cookie);
	}
	
//	add ProductPhone
	public DataHolder addProductPhone(DataHolder dataHolder) {
		
		List<RstProduct> lstProductPhone = productDao.getProduct(COMMON.TYPE_PHONE);
		dataHolder.putModel("lstProductPhone", lstProductPhone);

		return dataHolder;
	}
	
//	add new ProductPhone
	public DataHolder addNewProductPhone(DataHolder dataHolder) {
		
		List<RstProduct> lstNewProductPhone = productDao.getNewProduct(COMMON.TYPE_PHONE);
		dataHolder.putModel("lstNewProductPhone", lstNewProductPhone);
		
		return dataHolder;
	}
	
//	add new ProductHeadphone
	public DataHolder addProductHeadphone(DataHolder dataHolder) {
		
		List<RstProduct> lstProductHeadphone = productDao.getProduct(COMMON.TYPE_HEADPHONE);
		dataHolder.putModel("lstProductHeadphone", lstProductHeadphone);
		
		return dataHolder;
	}
	
//	add new Product battery backup
	public DataHolder addProductBatteryBackup(DataHolder dataHolder) {
		
		List<RstProduct> lstProductBatteryBackup = productDao.getProduct(COMMON.TYPE_BATTERYBACKUP);
		dataHolder.putModel("lstProductBatteryBackup", lstProductBatteryBackup);
		
		return dataHolder;
	}
	
//	add new Product battery backup
	public DataHolder addProductOther(DataHolder dataHolder) {
		
		List<RstProduct> lstProductOther = productDao.getProduct(COMMON.TYPE_OTHER);
		dataHolder.putModel("lstProductOther", lstProductOther);
		
		return dataHolder;
	}
	
//	check user		
	public DataHolder confirmUser(DataHolder dataHolder, String userToken) {
		
		if (userToken == null || userToken.equals("")) {	//current_cus
			
			 	dataHolder.setScreen("index");
				return dataHolder;
			
		}
		RstToken rstToken = tokenDao.getToken(userToken);
		
		RstAccount rstAccount = loginDao.getAccount(rstToken.getIdLogin());
		
		if (rstAccount.getPermisstion() == 1) {				//admin
			dataHolder.add("accountInfo", rstAccount);
			dataHolder.setScreen("admin");
			return dataHolder;
		}
		
															//cus
		dataHolder.add("accountInfo", rstAccount);
		dataHolder.putModel("userName", rstAccount.getName());
		
		dataHolder.setScreen("index");

		return dataHolder;
	}
	

	
//	register
	public DataHolder register(String fistName, String lastName, String address, String email, Integer phone, String pass) {
		DataHolder dataHolder = new DataHolder();
		
		if (fistName.isEmpty() || lastName.isEmpty() || address.isEmpty() || email.isEmpty() || phone == null || pass.isEmpty()) {
			dataHolder.error("Lỗi dữ liệu nhập vào!");
			return dataHolder;
		} 
		
		
		RstAccount rstAccount = loginDao.checkEmail(email);
		if (rstAccount != null) {
			dataHolder.error("Xin lỗi! Email này đã có người đăng ký. Xin chọn lại email khác!");
			return dataHolder;
		}
		
		PrmAccount prmAccount = new PrmAccount();
		prmAccount.setName(lastName + " " + fistName);
		prmAccount.setAddress(address);
		prmAccount.setEmail(email);
		prmAccount.setPhone(phone);
		prmAccount.setPassword(pass);
		prmAccount.setPermission(COMMON.IS_ADMIN);
		
		loginDao.insertAccount(prmAccount);
		
		dataHolder.ok("Đăng ký thành công!");
		return dataHolder;
	}
	
	
//	@Autowired
//	private LoginDao loginDao;
	
//	public DataHolderData login(String username, String password) {
//	
////		DataHolder dataHolder = new DataHolder(password, dataHolder);
//		List<RstAccount> rstAccount =  loginDao.getAccount(1);
//		DataHolderData dataHolder = new DataHolderData("accountInfo", rstAccount);
//		return dataHolder;
//	}
	
	public DataHolder singOut(HttpServletRequest request, HttpServletResponse response, String user_token, Model model) {
		DataHolder dataHolder = new DataHolder();
		
		Cookie cookie = new Cookie("user_token", ""); //clean cookie

        
		response.addCookie(cookie);
		
//		Cookie[] cookies = request.getCookies();
//		
//		 for (Cookie cookie : cookies) {
//			 	if (cookie.getName().equals( "user_token")) {
//			 		 cookie.setValue("123456");
//			         cookie.setPath("/");
//			         cookie.setMaxAge(0);
//				}  
//	            response.addCookie(cookie);
//	        }
		
		
		dataHolder.putModel("userName", false);	//clean model
		
		
		dataHolder.setScreen("index");
		return dataHolder;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	public DataHolder processIndex (DataHolder dataHolder, String user_token) {
		
		addProductPhone(dataHolder);	        //add product
		addNewProductPhone(dataHolder);	    //
		addProductHeadphone(dataHolder);	    //
		addProductBatteryBackup(dataHolder);	//
		addProductOther(dataHolder);	
		
		cartServices.getCart(user_token, dataHolder);		//add cart
		
		return dataHolder;
	}
	
	
	
	
	
	
	
}
