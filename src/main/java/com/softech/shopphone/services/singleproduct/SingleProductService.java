package com.softech.shopphone.services.singleproduct;

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
	
	
	public DataHolder getSingleProduct(String userToken, Integer idProduct) {
		DataHolder dataHolder  = new DataHolder();
		
		if (userToken != "") {
			RstToken rstToken = tokenDao.getToken(userToken);
			
			if (rstToken == null) {
				dataHolder.error("Lỗi hệ thống (token-SingleProductService)");
				return dataHolder;
			}
		
			dataHolder.putModel("Iduser", rstToken.getIdLogin());
		}
		
		RstProduct rstProduct = productDao.getProduct1(idProduct);
		
		dataHolder.putModel("rstProduct", rstProduct);
		dataHolder.setScreen("single-product");
		
		return dataHolder;
	}
}
