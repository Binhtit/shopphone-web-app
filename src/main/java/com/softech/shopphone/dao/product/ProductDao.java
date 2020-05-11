package com.softech.shopphone.dao.product;

import java.util.List;

import org.seasar.doma.Dao;
import org.seasar.doma.Insert;
import org.seasar.doma.Select;
import org.seasar.doma.boot.ConfigAutowireable;

import com.softech.shopphone.entity.product.RstProduct;

@Dao
@ConfigAutowireable
public interface ProductDao {
	
	@Insert(sqlFile = true)
	public int insertProduct(RstProduct rstProduct);
	
	@Select
	public List<RstProduct> getAllProduct();
	
	@Select
	public List<RstProduct> getProduct(Integer type);
	
	@Select
	public RstProduct getProduct1(Integer idProduct);
	
	@Select
	public List<RstProduct> getNewProduct(Integer type);
}
