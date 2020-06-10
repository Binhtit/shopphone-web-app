package com.softech.shopphone.services.singleproduct;

import java.net.InetAddress;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softech.shopphone.config.COMMON;
import com.softech.shopphone.dao.product.ProductDao;
import com.softech.shopphone.dao.token.TokenDao;
import com.softech.shopphone.entity.dataHolder.DataHolder;
import com.softech.shopphone.entity.product.RstProduct;
import com.softech.shopphone.entity.token.RstToken;

@Service
public class SingleProductService {
	@Autowired
	TokenDao tokenDao;
	
	@Autowired
	ProductDao productDao;
	
	
	public DataHolder getSingleProduct(DataHolder dataHolder, String user_token, Integer idProduct) {
//		dataHolder  = new DataHolder();
		if (user_token != null) {
			if (user_token != "") {
				RstToken rstToken = tokenDao.getToken(user_token);
				
				if (rstToken == null) {
					dataHolder.error("Lỗi hệ thống (token-SingleProductService)");
					return dataHolder;
				}
			
				dataHolder.putModel("Iduser", rstToken.getIdLogin());
			}
		}
		
	
		
		RstProduct rstProduct = productDao.getProduct1(idProduct);
		
		rstProduct.setPriceD(String.format("%.0f",rstProduct.getPrice()));	//fix_E_NUMBER_FORMAT
		
		
		
		dataHolder.putModel("rstProduct", rstProduct);
		dataHolder.add("rstProduct", rstProduct);
		
		dataHolder.setScreen("single-product");
		
		return dataHolder;
	}
}
