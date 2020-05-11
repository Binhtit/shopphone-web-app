package com.softech.shopphone.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softech.shopphone.entity.dataHolder.DataHolder;
import com.softech.shopphone.entity.product.RstProduct;
import com.softech.shopphone.services.admin.AdminServices;

@Controller
public class AdminController {
	@Autowired 
	private AdminServices adminServices;
	
	@PostMapping(path = "/web/insert-product")
	public @ResponseBody ResponseEntity<Object> insertProduct(@CookieValue(name = "user_token", required = false) String user_token,
				@RequestParam Integer type, @RequestParam String name, @RequestParam Integer id_promotion, @RequestParam Integer inventory, @RequestParam String producer, 
				@RequestParam Integer ram, @RequestParam String cpu, @RequestParam String monitor, @RequestParam String system, @RequestParam String color,
				@RequestParam Integer rom, @RequestParam String font_camera, @RequestParam String back_camera, @RequestParam String battery, @RequestParam String image, 
				@RequestParam Integer sell_quantity, @RequestParam String description, @RequestParam String rate, @RequestParam float entry_price, @RequestParam float price
			){
		RstProduct rstProduct = new RstProduct();
		//check null
		DataHolder dataHolder = new DataHolder();
		if (name.equals("") || id_promotion.equals(null) || inventory.equals(null) || producer.equals("") || 
				image.equals("") || description.equals("") || entry_price == 0 || price == 0 ) {
		
			dataHolder.error("Bạn nhập thiếu hoặc sai thông tin!");
		}else {
			rstProduct.setType(type);
			rstProduct.setName(name);
			rstProduct.setId_promotion(id_promotion);
			rstProduct.setInventory(inventory);
			rstProduct.setProducer(producer);
			rstProduct.setRam(ram);
			rstProduct.setCpu(cpu);
			rstProduct.setMonitor(monitor);
			rstProduct.setSystem(system);
			rstProduct.setColor(color);
			rstProduct.setRom(rom);
			rstProduct.setFont_camera(font_camera);
			rstProduct.setBack_camera(back_camera);
			rstProduct.setBattery(battery);
			rstProduct.setImage(image);
			rstProduct.setSell_quantity(sell_quantity);
			rstProduct.setDescription(description);
			rstProduct.setRate(rate);
			rstProduct.setEntry_price(entry_price);
			rstProduct.setPrice(price);
	
			dataHolder = adminServices.insertProduct(rstProduct, user_token);
		}
		return new ResponseEntity<>(dataHolder, HttpStatus.OK);
	}
	
	@PostMapping(path = "/web/CRUDProduct")
	@ResponseBody
	public ResponseEntity<Object> CRUDProduct(@CookieValue(name = "user_token", required = false) String user_token, Model model){
		DataHolder dataHolder = adminServices.CRUDProduct(user_token);
		
		
		return new ResponseEntity<>(dataHolder, HttpStatus.OK);
	}
	
}
