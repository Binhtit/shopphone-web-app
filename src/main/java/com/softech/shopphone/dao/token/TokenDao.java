package com.softech.shopphone.dao.token;

import org.seasar.doma.Dao;
import org.seasar.doma.Insert;
import org.seasar.doma.Select;
import org.seasar.doma.boot.ConfigAutowireable;

import com.softech.shopphone.entity.token.PrmToken;

/**
 * 
 * @author binhle
 *
 */

import com.softech.shopphone.entity.token.RstToken;


@Dao
@ConfigAutowireable
public interface TokenDao {
	
	@Insert(sqlFile = true)
	public int setToken(PrmToken prmToken);
	
	@Select
	public RstToken getToken(String token);
}
