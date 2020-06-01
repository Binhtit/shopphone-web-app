package com.softech.shopphone.dao.order;

import java.util.Date;
import java.util.List;

import org.seasar.doma.Dao;
import org.seasar.doma.Insert;
import org.seasar.doma.Select;
import org.seasar.doma.Update;
import org.seasar.doma.boot.ConfigAutowireable;

import com.softech.shopphone.entity.cartCurrentCus.PrmCartCurrentCus;
import com.softech.shopphone.entity.cartCurrentCus.RstCartCurrentCus;
import com.softech.shopphone.entity.cartCus.PrmCartCus;
import com.softech.shopphone.entity.cartCus.RstCartCus;
import com.softech.shopphone.entity.orderCus.PrmOrderCus;


@Dao
@ConfigAutowireable
public interface OrderDao {
	
	@Select
	public List<RstCartCurrentCus> getCartCurrentCus(String ipComputerCus);
	
	@Insert(sqlFile = true)
	public int insertCartCurrentCus(PrmCartCurrentCus prmCartCurrentCus);
	
	@Update(sqlFile = true)
	public int setCartCurrentCusDone();
	
	
	@Select
	public List<RstCartCus> getCartCus(Integer idAccount);
	
	@Insert(sqlFile = true)
	public int insertCartCus(PrmCartCus prmCartCus);
	
	@Update(sqlFile = true)
	public int setCartCusDone();
	
	
	
	@Insert(sqlFile = true)
	public int insertOrderCus(PrmOrderCus prmOrderCus);
	
	
	@Insert(sqlFile = true)
	public int insertCountOrder(String IdIpAcount, Integer totalPrice, Long timeOrder);
	
	@Select
	public Integer getIdCountOrder(String IdIpAcount, Long timeOrder);
}
