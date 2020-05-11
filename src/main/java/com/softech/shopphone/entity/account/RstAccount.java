package com.softech.shopphone.entity.account;

import org.seasar.doma.Column;
import org.seasar.doma.Entity;

@Entity
public class RstAccount {
	@Column(name = "ID_ACCOUNT")
	protected Integer idAccount;
	@Column(name = "PERMISSION")
	protected Integer permisstion;
	@Column(name = "NAME")
	protected String name;
	@Column(name = "PHONE")
	protected Integer phone;
	@Column(name = "ADDRESS")
	protected String address;
	@Column(name = "EMAIL")
	protected String mail;
	@Column(name = "PASSWORD")
	protected String password;
	
	public Integer getIdAccount() {
		return idAccount;
	}
	public void setIdAccount(Integer idAccount) {
		this.idAccount = idAccount;
	}
	public Integer getPermisstion() {
		return permisstion;
	}
	public void setPermisstion(Integer permisstion) {
		this.permisstion = permisstion;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getPhone() {
		return phone;
	}
	public void setPhone(Integer phone) {
		this.phone = phone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getMail() {
		return mail;
	}
	public void setMail(String mail) {
		this.mail = mail;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
}
