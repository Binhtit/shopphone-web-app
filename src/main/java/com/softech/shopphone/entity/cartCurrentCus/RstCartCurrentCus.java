package com.softech.shopphone.entity.cartCurrentCus;

import org.seasar.doma.Column;
import org.seasar.doma.Entity;

@Entity
public class RstCartCurrentCus {

	@Column(name="ip_computer")
	protected String ip_computer;
	@Column(name="id_product")
	protected Integer id_product;
	@Column(name="num_product")
	protected Integer num_product;
	
	
	public String getIp_computer() {
		return ip_computer;
	}
	public void setIp_computer(String ip_computer) {
		this.ip_computer = ip_computer;
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
