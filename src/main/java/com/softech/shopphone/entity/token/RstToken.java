package com.softech.shopphone.entity.token;

import org.seasar.doma.Column;
import org.seasar.doma.Entity;
/**
 * 
 * @author binhle
 *
 */

@Entity
public class RstToken {
	@Column(name = "id_login")
	private Integer idLogin;
	@Column(name = "token")
	private String token;
	
	
	public Integer getIdLogin() {
		return idLogin;
	}
	public void setIdLogin(Integer idLogin) {
		this.idLogin = idLogin;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	

}
