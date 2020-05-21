package com.softech.shopphone.services.checkout;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softech.shopphone.dao.login.LoginDao;
import com.softech.shopphone.dao.order.OrderDao;
import com.softech.shopphone.dao.product.ProductDao;
import com.softech.shopphone.dao.token.TokenDao;
import com.softech.shopphone.entity.account.RstAccount;
import com.softech.shopphone.entity.cartCurrentCus.PrmCartCurrentCus;
import com.softech.shopphone.entity.cartCurrentCus.RstCartCurrentCus;
import com.softech.shopphone.entity.cartCus.PrmCartCus;
import com.softech.shopphone.entity.cartCus.RstCartCus;
import com.softech.shopphone.entity.dataHolder.DataHolder;
import com.softech.shopphone.entity.orderCus.PrmOrderCus;
import com.softech.shopphone.entity.product.RstProduct;
import com.softech.shopphone.entity.token.RstToken;

@Service
public class CheckoutServices {
	@Autowired
	TokenDao tokendao;
	
	@Autowired
	LoginDao loginDao;
	
	@Autowired
	private TokenDao tokenDao;
	

	@Autowired
	private OrderDao orderDao;
	
	@Autowired
	private ProductDao productDao;
	
//	@Autowired
//	private PrmOrderCus prmOrderCus;

	public DataHolder checkout(String user_token, DataHolder dataHolder) {
		
		if (user_token == null || user_token.equals("")) {	//current_cus
			
			RstAccount rstAccount = new RstAccount();
			dataHolder.putModel("accountInfo", rstAccount);
		 	dataHolder.setScreen("checkout");
		 	
			return dataHolder;
		
	}
		
	RstToken rstToken = tokendao.getToken(user_token);
	
	RstAccount rstAccount = loginDao.getAccount(rstToken.getIdLogin());
	
	dataHolder.putModel("userName", rstAccount.getName());

	
	dataHolder.putModel("accountInfo", rstAccount);
		
		return dataHolder;
	}
	
	
	public DataHolder goOrder(String user_token, DataHolder dataHolder, String cusName, String cusAddress, String cusEmail, String cusPhone, String cusNote){

		PrmOrderCus prmOrderCus = new PrmOrderCus();
		
		
		
		
		//Login
		if (user_token != null) {
			
			if (user_token != "") {
				RstToken rstToken = tokenDao.getToken(user_token);
				
				List<RstCartCus> rstCarts = orderDao.getCartCus(rstToken.getIdLogin());	//list product
				
				Long timeOrder	= System.currentTimeMillis();
				
				orderDao.insertCountOrder(rstToken.getIdLogin().toString(), 0, timeOrder);	//làm get id để set vào trong tb order
				
				Integer idCountOrder = orderDao.getIdCountOrder(rstToken.getIdLogin().toString(), timeOrder);
				
				
				for (RstCartCus Cart : rstCarts) {			
					
					prmOrderCus.setId_count_order(idCountOrder);
					prmOrderCus.setOrder_status(0);
					
					prmOrderCus.setCus_id_ip(Cart.getId_account().toString());
					prmOrderCus.setCus_name(cusName);
					prmOrderCus.setCus_address(cusAddress);
					prmOrderCus.setCus_email(cusEmail);
					prmOrderCus.setCus_phone(cusPhone);
					prmOrderCus.setOrder_note(cusNote);
					prmOrderCus.setId_product(Cart.getId_product());
					prmOrderCus.setNum_product(Cart.getNum_product());
					
					
					Date date = new Date();
					prmOrderCus.setDate_order(date);
					
					orderDao.insertOrderCus(prmOrderCus);
			
					
				}
				
				orderDao.setCartCusDone();	//clean cart
				
			//no Login
			}else { 	
				try {
					
				
				  InetAddress thisIp =InetAddress.getLocalHost();
				  
				  List<RstCartCurrentCus> rstCarts = orderDao.getCartCurrentCus(thisIp.getHostAddress());   
				  
				  Long timeOrder	= System.currentTimeMillis();
					
				  orderDao.insertCountOrder(thisIp.toString(), 0, timeOrder);	//làm get id để set vào trong tb order
				
				  Integer idCountOrder = orderDao.getIdCountOrder(thisIp.toString(), timeOrder);
					
				  
				  for (RstCartCurrentCus Cart : rstCarts) {
			
						prmOrderCus.setId_count_order(idCountOrder);

						prmOrderCus.setOrder_status(0);
						
						prmOrderCus.setCus_id_ip(Cart.getIp_computer());
						prmOrderCus.setCus_name(cusName);
						prmOrderCus.setCus_address(cusAddress);
						prmOrderCus.setCus_email(cusEmail);
						prmOrderCus.setCus_phone(cusPhone);
						prmOrderCus.setOrder_note(cusNote);
						prmOrderCus.setId_product(Cart.getId_product());
						prmOrderCus.setNum_product(Cart.getNum_product());
						
						
						Date date = new Date();
						prmOrderCus.setDate_order(date);
						
						orderDao.insertOrderCus(prmOrderCus);

						
					}
				  
				  orderDao.setCartCurrentCusDone();	//clean cart
				  
				  
				} catch (Exception e) {
					// TODO: handle exception
					e.printStackTrace();
				}
				
				
			}
			
		}

		
		return dataHolder;
	}
	
	
	
	
	
	
	
	
	
	
	
	
}
