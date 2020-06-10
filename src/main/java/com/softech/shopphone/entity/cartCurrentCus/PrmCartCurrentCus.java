package com.softech.shopphone.entity.cartCurrentCus;

import org.seasar.doma.Entity;

@Entity
public class PrmCartCurrentCus {
	
	protected String ip_computer;
	protected Integer id_product;
	protected Integer num_product;
	protected String name_product;
	protected String price_product;
	protected String image_product;
	
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
	public String getName_product() {
		return name_product;
	}
	public void setName_product(String name_product) {
		this.name_product = name_product;
	}
	public String getPrice_product() {
		return price_product;
	}
	public void setPrice_product(String price_product) {
		this.price_product = price_product;
	}
	public String getImage_product() {
		return image_product;
	}
	public void setImage_product(String image_product) {
		this.image_product = image_product;
	}
	
	
	
}
