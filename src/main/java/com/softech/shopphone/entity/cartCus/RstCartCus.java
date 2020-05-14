package com.softech.shopphone.entity.cartCus;

import org.seasar.doma.Column;
import org.seasar.doma.Entity;

@Entity
public class RstCartCus {
	
	@Column(name="id_account")
	protected Integer id_account;
	@Column(name="id_product")
	protected Integer id_product;
	@Column(name="num_product")
	protected Integer num_product;
	public Integer getId_account() {
		return id_account;
	}
	public void setId_account(Integer id_account) {
		this.id_account = id_account;
	}
	public Integer getId_product() {
		return id_product;
	}
	public void setId_product(Integer id_product) {
		this.id_product = id_product;
	}
	public Integer getNum_product() {
		return num_product;
	}
	public void setNum_product(Integer num_product) {
		this.num_product = num_product;
	}
	
	

	
	
}
