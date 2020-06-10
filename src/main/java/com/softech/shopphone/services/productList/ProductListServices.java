package com.softech.shopphone.services.productList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softech.shopphone.dao.product.ProductDao;
import com.softech.shopphone.entity.dataHolder.DataHolder;
import com.softech.shopphone.entity.product.RstProduct;

@Service
public class ProductListServices {
	
	@Autowired
	private ProductDao productDao;
	

	public DataHolder getProductList(Integer typeProduct) {
		DataHolder dataHolder = new DataHolder();
		
		List<RstProduct>rstProduct = productDao.getProduct(typeProduct);
		
		if (rstProduct == null) {
			dataHolder.error("Hệ thống lỗi. không tìm thấy sản phẩm");
			return dataHolder;
		}
		
		dataHolder.putModel("rstProduct", rstProduct);

		return dataHolder;
	}
}
