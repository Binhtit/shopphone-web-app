package com.softech.shopphone.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softech.shopphone.entity.dataHolder.DataHolder;
import com.softech.shopphone.entity.product.RstProduct;
import com.softech.shopphone.services.admin.AdminServices;
import com.softech.shopphone.services.index.IndexServices;
import com.softech.shopphone.services.singleproduct.SingleProductService;

@Controller
public class AdminController {
	@Autowired 
	private AdminServices adminServices;
	
	@Autowired
	private IndexServices loginService;
	
	@Autowired
	SingleProductService singleProductService;
	
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
	
	@PostMapping(path = "/web/CRUDShowProduct")
	@ResponseBody
	public ResponseEntity<Object> CRUDShowProduct(@CookieValue(name = "user_token", required = false) String user_token, Model model){
		DataHolder dataHolder = adminServices.CRUDShowProduct(user_token);
		
		
		return new ResponseEntity<>(dataHolder, HttpStatus.OK);
	}
	
	
	
	@PostMapping(path = "/web/admin-get-product")
	@ResponseBody
	public ResponseEntity<Object> getSingleProduct(@CookieValue(name = "user_token", required = false) String userToken, Integer idProduct, Model model) {
		DataHolder dataHolder = new DataHolder();
//		loginService.confirmUser(dataHolder, userToken);

		singleProductService.getSingleProduct(dataHolder, userToken, idProduct);
		
		model.addAllAttributes(dataHolder.getModel());
		return new ResponseEntity<>(dataHolder, HttpStatus.OK);
	}
	
	
	@PostMapping(path = "/web/admin-edit-product")
	@ResponseBody
	public ResponseEntity<Object> editProduct(@CookieValue(name = "user_token", required = false) String userToken, Model model, @RequestParam Integer idProduct, @RequestParam String productName,
			@RequestParam Integer productType, @RequestParam Integer productId_promotion, @RequestParam Integer productInventory, @RequestParam String productProducer, @RequestParam Integer productRam, @RequestParam String productCpu, @RequestParam String productMonitor,
			@RequestParam String productSystem, @RequestParam String productColor, @RequestParam Integer productRom, @RequestParam String productFontCamera, @RequestParam String productBattery, @RequestParam String productImage,
			@RequestParam Integer productSellQuantity, @RequestParam String productDescription, @RequestParam String productRate, @RequestParam float productEntryPrice, @RequestParam float productPrice) {
		
		DataHolder dataHolder = new DataHolder();
//		loginService.confirmUser(dataHolder, userToken);
		RstProduct rstProduct = new RstProduct();
		
		rstProduct.setId_product(idProduct);
		rstProduct.setName(productName);
		rstProduct.setType(productType);
		rstProduct.setId_promotion(productId_promotion);
		rstProduct.setInventory(productInventory);
		rstProduct.setProducer(productProducer);
		rstProduct.setRam(productRam);
		rstProduct.setCpu(productCpu);
		rstProduct.setMonitor(productMonitor);
		rstProduct.setSystem(productSystem);
		rstProduct.setColor(productColor);
		rstProduct.setRom(productRom);
		rstProduct.setFont_camera(productFontCamera);
		rstProduct.setBattery(productBattery);
		rstProduct.setImage(productImage);
		rstProduct.setSell_quantity(productSellQuantity);
		rstProduct.setDescription(productDescription);
		rstProduct.setRate(productRate);
		rstProduct.setEntry_price(productEntryPrice);
		rstProduct.setPrice(productPrice);
		
		
		adminServices.editProduct(dataHolder, userToken, rstProduct);
		
		model.addAllAttributes(dataHolder.getModel());
		return new ResponseEntity<>(dataHolder, HttpStatus.OK);
	}
	
	@PostMapping(path = "/web/admin-delete-product")
	@ResponseBody
	public ResponseEntity<Object> deleteProduct(@CookieValue(name = "user_token", required = false) String userToken, Model model, Integer idProduct) {
		DataHolder dataHolder = new DataHolder();
//		loginService.confirmUser(dataHolder, userToken);
		
		adminServices.deleteProduct(dataHolder, userToken, idProduct);
		
		model.addAllAttributes(dataHolder.getModel());
		return new ResponseEntity<>(dataHolder, HttpStatus.OK);
	}
	
	
	
	
	
	
	
	
	
}
