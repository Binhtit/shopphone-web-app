package com.softech.shopphone.services.cart;

import java.net.InetAddress;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

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
import com.softech.shopphone.entity.product.RstProduct;
import com.softech.shopphone.entity.token.RstToken;

@Service
public class CartServices {
	
	@Autowired
	private TokenDao tokenDao;
	

	@Autowired
	private OrderDao orderDao;
	
	@Autowired
	private ProductDao productDao;
	
	public DataHolder getCart(String user_token, DataHolder dataHolder) {
		
		//Login
		if (user_token != null) {
			if (user_token != "") {
				RstToken rstToken = tokenDao.getToken(user_token);
				
				List<RstCartCus> rstCart = orderDao.getCartCus(rstToken.getIdLogin());
				
				Integer numP = 0;
		         
		         for (int i = 0; i < rstCart.size(); i++) {
		        	 numP = numP + rstCart.get(i).getNum_product();
					
				}
		         dataHolder.putModel("rstCartTotal", numP);
		         dataHolder.putModel("rstCart", rstCart);
				
		         return dataHolder;
			}
		}
		
		//no login
		 try
	     {
	         InetAddress thisIp =InetAddress.getLocalHost();
	         
	         List<RstCartCurrentCus> rstCart = orderDao.getCartCurrentCus(thisIp.getHostAddress());
	         
	         if (rstCart == null) {
				dataHolder.putModel("rstCartTotal", 0);
				return dataHolder;
			}
	         
	         Integer numP = 0;
	         
	         for (int i = 0; i < rstCart.size(); i++) {
	        	 numP = numP + rstCart.get(i).getNum_product();
				
			}
	         dataHolder.putModel("rstCartTotal", numP);
	         dataHolder.putModel("rstCart", rstCart);
	         
	     }
	     catch(Exception e)
	     {
	         e.printStackTrace();
	     }
		 
			
			return dataHolder;
		
	 	}
	
	
	@PostMapping(path = "/web/addCart")
	public DataHolder addCart(String user_token, DataHolder dataHolder, Integer idProduct, Integer numProduct) {
			
			//Login
			if (user_token != null) {
				if (user_token != "") {
					RstToken rstToken = tokenDao.getToken(user_token);
					
					PrmCartCus prmCartCus = new PrmCartCus();
					
					prmCartCus.setId_account(rstToken.getIdLogin());
					prmCartCus.setId_product(idProduct);
					prmCartCus.setNum_product(numProduct);
					
					
					orderDao.insertCartCus(prmCartCus);
					
					List<RstCartCus> rstCart = orderDao.getCartCus(rstToken.getIdLogin());
					
					Integer numP = 0;
			         
			         for (int i = 0; i < rstCart.size(); i++) {
			        	 numP = numP + rstCart.get(i).getNum_product();
						
					}
			         dataHolder.add("rstCartTotal", numP);
			         dataHolder.add("rstCart", rstCart);
					
					
				}
			}
			
			//no login
			 try {
		         InetAddress thisIp =InetAddress.getLocalHost();
	//	         System.out.println("IP:"+thisIp.getHostAddress());
		         
		         PrmCartCurrentCus prmCartCurrentCus = new PrmCartCurrentCus();
					
		         	prmCartCurrentCus.setIp_computer(thisIp.getHostAddress());
		         	prmCartCurrentCus.setId_product(idProduct);
		         	prmCartCurrentCus.setNum_product(numProduct);
					
					
					orderDao.insertCartCurrentCus(prmCartCurrentCus);
			
					List<RstCartCurrentCus> rstCart = orderDao.getCartCurrentCus(thisIp.getHostAddress());
					
					 Integer numP = 0;
			         
			         for (int i = 0; i < rstCart.size(); i++) {
			        	 numP = numP + rstCart.get(i).getNum_product();
						
					}
			         
			         dataHolder.add("rstCartTotal", numP);
			         dataHolder.add("rstCart", rstCart);
			         
					
		     }
		     catch(Exception e)
		     {
		         e.printStackTrace();
		     }
			 
				
				return dataHolder;
			
		 	}
	
	
	public DataHolder getCartDetail(String user_token, DataHolder dataHolder) {

		//Login
		if (user_token != null) {
			if (user_token != "") {
				RstToken rstToken = tokenDao.getToken(user_token);
				List<RstCartCus> rstCarts = orderDao.getCartCus(rstToken.getIdLogin());
				
				List<PrmCartCus> LstPrmCartCus = new ArrayList<PrmCartCus>();
					
					
					for (RstCartCus Cart : rstCarts) {
						PrmCartCus prmCart = new PrmCartCus();
						RstProduct rstProduct = productDao.getProduct1(Cart.getId_product());
						
						prmCart.setId_account(Cart.getId_account());
						prmCart.setId_product(Cart.getId_product());
						prmCart.setNum_product(Cart.getNum_product());
						prmCart.setName_product(rstProduct.getName());
						prmCart.setPrice_product(rstProduct.getPrice());
						prmCart.setImage_product(rstProduct.getImage());
						
						LstPrmCartCus.add(prmCart);
						
					}
				
				
				
		         dataHolder.add("LstCart", LstPrmCartCus);
				
		         return dataHolder;
			}
		}
		
		//no login
		 try {
	         InetAddress thisIp =InetAddress.getLocalHost();
		
	         List<RstCartCurrentCus> rstCarts = orderDao.getCartCurrentCus(thisIp.getHostAddress());      
	         List<PrmCartCurrentCus> LstPrmCartCurrentCus = new ArrayList<PrmCartCurrentCus>();
				
	         

				
				for (RstCartCurrentCus Cart : rstCarts) {
					PrmCartCurrentCus prmCart = new PrmCartCurrentCus();
					RstProduct rstProduct = productDao.getProduct1(Cart.getId_product());
					
					prmCart.setIp_computer(Cart.getIp_computer());
					prmCart.setId_product(Cart.getId_product());
					prmCart.setNum_product(Cart.getNum_product());
					prmCart.setName_product(rstProduct.getName());
					prmCart.setPrice_product(rstProduct.getPrice());
					prmCart.setImage_product(rstProduct.getImage());
					
					LstPrmCartCurrentCus.add(prmCart);
					
				}
	         
	         
		         dataHolder.add("LstCart", LstPrmCartCurrentCus);
				
	     }
	     catch(Exception e)
	     {
	         e.printStackTrace();
	     }
		
		 return dataHolder;
	}
	
	
}
