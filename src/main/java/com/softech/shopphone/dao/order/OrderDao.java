package com.softech.shopphone.dao.order;

import java.util.List;

import org.seasar.doma.Dao;
import org.seasar.doma.Insert;
import org.seasar.doma.Select;
import org.seasar.doma.boot.ConfigAutowireable;

import com.softech.shopphone.entity.cartCurrentCus.PrmCartCurrentCus;
import com.softech.shopphone.entity.cartCurrentCus.RstCartCurrentCus;
import com.softech.shopphone.entity.cartCus.PrmCartCus;
import com.softech.shopphone.entity.cartCus.RstCartCus;


@Dao
@ConfigAutowireable
public interface OrderDao {
	
	@Select
	public List<RstCartCurrentCus> getCartCurrentCus(String ipComputerCus);
	
	@Insert(sqlFile = true)
	public int insertCartCurrentCus(PrmCartCurrentCus prmCartCurrentCus);
	
	
	
	@Select
	public List<RstCartCus> getCartCus(Integer idAccount);
	
	
	@Insert(sqlFile = true)
	public int insertCartCus(PrmCartCus prmCartCus);
}
