package com.softech.shopphone.entity.product;

import org.seasar.doma.Column;
import org.seasar.doma.Entity;

@Entity
public class RstProduct {
	
	@Column(name = "ID_PRODUCT")
	protected Integer id_product;
	@Column(name = "TYPE")
	protected Integer type;
	@Column(name = "NAME")
	protected String name;
	@Column(name = "ID_PROMOTION")
	protected Integer id_promotion;
	@Column(name = "INVENTORY")
	protected Integer inventory;
	@Column(name = "PRODUCER")
	protected String producer;
	@Column(name = "RAM")
	protected Integer ram;
	@Column(name = "CPU")
	protected String cpu;
	@Column(name = "MONITOR")
	protected String monitor;
	@Column(name = "SYSTEM")
	protected String system;
	@Column(name = "COLOR")
	protected String color;
	@Column(name = "ROM")
	protected Integer rom;
	@Column(name = "FONT_CAMERA")
	protected String font_camera;
	@Column(name = "BACK_CAMERA")
	protected String back_camera;
	@Column(name = "BATTERY")
	protected String battery;
	@Column(name = "IMAGE")
	protected String image;
	@Column(name = "SELL_QUANTITY")
	protected Integer sell_quantity;
	@Column(name = "DESCRIPTION")
	protected String description;
	@Column(name = "RATE")
	protected String rate;
	@Column(name = "ENTRY_PRICE")
	protected float entry_price;
	@Column(name = "PRICE")
	protected float price;
	protected String priceD;
	
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}

	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public Integer getId_product() {
		return id_product;
	}
	public void setId_product(Integer id_product) {
		this.id_product = id_product;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public Integer getId_promotion() {
		return id_promotion;
	}
	public void setId_promotion(Integer id_promotion) {
		this.id_promotion = id_promotion;
	}
	public Integer getInventory() {
		return inventory;
	}
	public void setInventory(Integer inventory) {
		this.inventory = inventory;
	}
	public String getProducer() {
		return producer;
	}
	public void setProducer(String producer) {
		this.producer = producer;
	}
	public Integer getRam() {
		return ram;
	}
	public void setRam(Integer ram) {
		this.ram = ram;
	}
	public String getCpu() {
		return cpu;
	}
	public void setCpu(String cpu) {
		this.cpu = cpu;
	}
	public String getMonitor() {
		return monitor;
	}
	public void setMonitor(String monitor) {
		this.monitor = monitor;
	}
	public String getSystem() {
		return system;
	}
	public void setSystem(String system) {
		this.system = system;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public Integer getRom() {
		return rom;
	}
	public void setRom(Integer rom) {
		this.rom = rom;
	}
	public String getFont_camera() {
		return font_camera;
	}
	public void setFont_camera(String font_camera) {
		this.font_camera = font_camera;
	}
	public String getBack_camera() {
		return back_camera;
	}
	public void setBack_camera(String back_camera) {
		this.back_camera = back_camera;
	}
	public String getBattery() {
		return battery;
	}
	public void setBattery(String battery) {
		this.battery = battery;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public Integer getSell_quantity() {
		return sell_quantity;
	}
	public void setSell_quantity(Integer sell_quantity) {
		this.sell_quantity = sell_quantity;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getRate() {
		return rate;
	}
	public void setRate(String rate) {
		this.rate = rate;
	}
	public float getEntry_price() {
		return entry_price;
	}
	public void setEntry_price(float entry_price) {
		this.entry_price = entry_price;
	}
	public String getPriceD() {
		return priceD;
	}
	public void setPriceD(String priceD) {
		this.priceD = priceD;
	}
	
	
	
}
