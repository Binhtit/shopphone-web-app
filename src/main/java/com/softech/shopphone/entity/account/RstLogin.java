package com.softech.shopphone.entity.account;

import org.seasar.doma.Entity;

import com.softech.shopphone.entity.response.ResData;

@Entity
public class RstLogin implements ResData {
 String email;
 String pass;
 
public String getId() {
	return email;
}
public void setId(String id) {
	this.email = id;
}
public String getPass() {
	return pass;
}
public void setPass(String pass) {
	this.pass = pass;
}
 
 
}
