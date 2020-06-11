package com.softech.shopphone.services.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softech.shopphone.config.COMMON;
import com.softech.shopphone.dao.login.LoginDao;
import com.softech.shopphone.dao.product.ProductDao;
import com.softech.shopphone.dao.token.TokenDao;
import com.softech.shopphone.entity.account.RstAccount;
import com.softech.shopphone.entity.dataHolder.DataHolder;
import com.softech.shopphone.entity.product.RstProduct;
import com.softech.shopphone.entity.token.RstToken;

@Service
public class AdminServices {
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private TokenDao tokenDao;
	
	@Autowired
	private LoginDao loginDao;
	
	// system
	
	public boolean isAdmin(String userToken) {
		RstToken rstToken = tokenDao.getToken(userToken);
		
		RstAccount rstAccount = loginDao.getAccount(rstToken.getIdLogin());
		
		if (rstAccount.getPermisstion() == 1) {
			return true;
		}
		
		return false;
	}
	
	// sevices
	
	public DataHolder insertProduct(RstProduct rstProduct, String user_token) {
		DataHolder dataHolder = new DataHolder();
		if (isAdmin(user_token)) {
			
			productDao.insertProduct(rstProduct);
			
			dataHolder.ok("Thêm sản phẩm thành công");
			return dataHolder;
		}
		
		dataHolder.error("Quyền truy cập trái phép!");
		return dataHolder;
	}

	
	public DataHolder CRUDShowProduct(String user_token) {
		DataHolder dataHolder = new DataHolder();
		if (isAdmin(user_token)) {
			List<RstProduct> rstProductLst = productDao.getAllProduct();
			for (RstProduct rstProduct : rstProductLst) {
				rstProduct.setPriceD(String.format("%.0f",rstProduct.getPrice()));
			}
			
			dataHolder.add("lstProduct", rstProductLst);
			return dataHolder;
		}
		
		dataHolder.error("Quyền truy cập trái phép!");
		return dataHolder;
	}
	
	public DataHolder editProduct(DataHolder dataHolder, String userToken, RstProduct rstProduct) {
		
		try {
			productDao.editProduct(rstProduct);

		} catch (Exception e) {
			// TODO: handle exception
			dataHolder.error("Lỗi hệ thống!");
			return dataHolder;
		}
		
		dataHolder.ok("Chỉnh sửa thành công");
		
		return dataHolder;
				
				
	}
	
	public DataHolder deleteProduct(DataHolder dataHolder, String userToken, Integer id_product) {
		
		try {
			productDao.deleteProduct(id_product);
			
		} catch (Exception e) {
			// TODO: handle exception
			dataHolder.error("Lỗi hệ thống!");
			return dataHolder;
		}
		
		dataHolder.ok("Xoá thành công");
		
		return dataHolder;
		
		
	}
	
	
	
	
	
	
	
}
