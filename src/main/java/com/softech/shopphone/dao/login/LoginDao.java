package com.softech.shopphone.dao.login;


import org.seasar.doma.Dao;
import org.seasar.doma.Insert;
import org.seasar.doma.Select;
import org.seasar.doma.boot.ConfigAutowireable;

import com.softech.shopphone.entity.account.PrmAccount;
import com.softech.shopphone.entity.account.RstAccount;
/**
 * 
 * @author binhle
 *
 */


@Dao
@ConfigAutowireable
public interface LoginDao {
	@Select
	public RstAccount getAccount(Integer idAccount);
	
	@Select
	public RstAccount getLogin(String email, String password);
	
	@Select
	public RstAccount checkEmail(String email);
	
	@Insert(sqlFile = true)
	public int insertAccount(PrmAccount prmAccount);
}
