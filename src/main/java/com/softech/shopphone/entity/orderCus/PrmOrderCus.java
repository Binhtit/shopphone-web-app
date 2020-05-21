package com.softech.shopphone.entity.orderCus;



import java.util.Date;

import org.seasar.doma.Entity;

@Entity
public class PrmOrderCus {
	protected Integer id_count_order;
	protected Integer order_status;
	protected String cus_id_ip;
	protected String cus_name;
	protected String cus_address;
	protected String cus_email;
	protected String cus_phone;
	protected String order_note;
	protected Integer id_product;
	protected Integer num_product;
	protected Date date_order;
	
	
	
	
	
	public Integer getId_count_order() {
		return id_count_order;
	}
	public void setId_count_order(Integer id_count_order) {
		this.id_count_order = id_count_order;
	}
	public Integer getOrder_status() {
		return order_status;
	}
	public void setOrder_status(Integer order_status) {
		this.order_status = order_status;
	}
	public String getCus_id_ip() {
		return cus_id_ip;
	}
	public void setCus_id_ip(String cus_id_ip) {
		this.cus_id_ip = cus_id_ip;
	}
	public String getCus_name() {
		return cus_name;
	}
	public void setCus_name(String cus_name) {
		this.cus_name = cus_name;
	}
	public String getCus_address() {
		return cus_address;
	}
	public void setCus_address(String cus_address) {
		this.cus_address = cus_address;
	}
	public String getCus_email() {
		return cus_email;
	}
	public void setCus_email(String cus_email) {
		this.cus_email = cus_email;
	}
	public String getCus_phone() {
		return cus_phone;
	}
	public void setCus_phone(String cus_phone) {
		this.cus_phone = cus_phone;
	}
	public String getOrder_note() {
		return order_note;
	}
	public void setOrder_note(String order_note) {
		this.order_note = order_note;
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
	public Date getDate_order() {
		return date_order;
	}
	public void setDate_order(Date date_order) {
		this.date_order = date_order;
	}
	
	
	
}
