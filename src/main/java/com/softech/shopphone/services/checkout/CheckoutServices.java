package com.softech.shopphone.services.checkout;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.softech.shopphone.config.Email;
import com.softech.shopphone.dao.login.LoginDao;
import com.softech.shopphone.dao.order.OrderDao;
import com.softech.shopphone.dao.product.ProductDao;
import com.softech.shopphone.dao.token.TokenDao;
import com.softech.shopphone.entity.account.RstAccount;
import com.softech.shopphone.entity.cartCurrentCus.PrmCartCurrentCus;
import com.softech.shopphone.entity.cartCurrentCus.RstCartCurrentCus;
import com.softech.shopphone.entity.cartCus.PrmCartCus;
import com.softech.shopphone.entity.cartCus.RstCartCus;
import com.softech.shopphone.entity.dataHolder.DataHolder;
import com.softech.shopphone.entity.orderCus.PrmOrderCus;
import com.softech.shopphone.entity.product.RstProduct;
import com.softech.shopphone.entity.token.RstToken;

@Service
public class CheckoutServices {
	@Autowired
	private TokenDao tokendao;

	@Autowired
	private LoginDao loginDao;

	@Autowired
	private TokenDao tokenDao;

	@Autowired
	private OrderDao orderDao;

	@Autowired
	public JavaMailSender emailSender;

//	@Autowired
//	private PrmOrderCus prmOrderCus;

	public DataHolder checkout(String user_token, DataHolder dataHolder) {

		if (user_token == null || user_token.equals("")) { // current_cus

			RstAccount rstAccount = new RstAccount();
			dataHolder.putModel("accountInfo", rstAccount);
			dataHolder.setScreen("checkout");

			return dataHolder;

		}

		RstToken rstToken = tokendao.getToken(user_token);

		RstAccount rstAccount = loginDao.getAccount(rstToken.getIdLogin());

		dataHolder.putModel("userName", rstAccount.getName());

		dataHolder.putModel("accountInfo", rstAccount);

		return dataHolder;
	}

	public DataHolder goOrder(String user_token, DataHolder dataHolder, String cusName, String cusAddress,
			String cusEmail, String cusPhone, String cusNote) {

		PrmOrderCus prmOrderCus = new PrmOrderCus();

		Calendar timeOrder = Calendar.getInstance(); // get current time
		Integer idCountOrder = null;
		String idtmp =  null;

		// no Login
		if (user_token == null || user_token == "") {

			try {

				InetAddress thisIp = InetAddress.getLocalHost();
				 idtmp = thisIp.toString() + timeOrder.getTimeInMillis();

				List<RstCartCurrentCus> rstCarts = orderDao.getCartCurrentCus(thisIp.getHostAddress());
				
				if (rstCarts.size() == 0) {
					dataHolder.error("Hình như Bạn chưa đặt sản phẩm nào! Vui lòng kiểm tra lại.");
					return dataHolder;
				}

				orderDao.insertCountOrder(thisIp.toString(), 0, idtmp ); // làm  id để set vào
																						// trong_tb_order

				idCountOrder = orderDao.getIdCountOrder(thisIp.toString(), idtmp);
				
				System.out.println(orderDao.getIdCountOrder(thisIp.toString(), idtmp));
				System.out.println(idCountOrder);

				for (RstCartCurrentCus Cart : rstCarts) {

					prmOrderCus.setId_count_order(idCountOrder);

					prmOrderCus.setOrder_status(0);

					prmOrderCus.setCus_id_ip(Cart.getIp_computer());
					prmOrderCus.setCus_name(cusName);
					prmOrderCus.setCus_address(cusAddress);
					prmOrderCus.setCus_email(cusEmail);
					prmOrderCus.setCus_phone(cusPhone);
					prmOrderCus.setOrder_note(cusNote);
					prmOrderCus.setId_product(Cart.getId_product());
					prmOrderCus.setNum_product(Cart.getNum_product());

					Date date = new Date();
					prmOrderCus.setDate_order(date);

					orderDao.insertOrderCus(prmOrderCus);

				}

				// Create a Simple MailMessage.
				SimpleMailMessage message = new SimpleMailMessage();

				String MailContent = "Tên khách hàng vãng lai: " + cusName + "\n Địa chỉ: " + cusAddress + "\n Email: "
						+ cusEmail + "\n Số điện thoại: " + cusPhone + "\n Ghi chú: " + cusNote + "\n MÃ SP: "
						+ prmOrderCus.getId_product() + "\n Số lượng: " + prmOrderCus.getNum_product();

				message.setSubject("Test Simple Email");
				message.setText(MailContent);

				List<RstAccount> rstAccounts = loginDao.getAccountByPermisstion(1);
				for (RstAccount rstAccount : rstAccounts) {

					message.setTo(rstAccount.getMail());

					// Send Message!
					emailSender.send(message);

				}
				orderDao.setCartCurrentCusDone(); // clean cart

			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
		} else {
			// Login

			RstToken rstToken = tokenDao.getToken(user_token);

			List<RstCartCus> rstCarts = orderDao.getCartCus(rstToken.getIdLogin()); // list product
			 idtmp = rstToken.getIdLogin().toString() + timeOrder.getTimeInMillis();

			orderDao.insertCountOrder(rstToken.getIdLogin().toString(), 0, idtmp); // làm get id_để
																									// set_vào trong_tb
																									// order

			idCountOrder = orderDao.getIdCountOrder(rstToken.getIdLogin().toString(), idtmp);

			for (RstCartCus Cart : rstCarts) {

				prmOrderCus.setId_count_order(idCountOrder);
				prmOrderCus.setOrder_status(0);

				prmOrderCus.setCus_id_ip(Cart.getId_account().toString());
				prmOrderCus.setCus_name(cusName);
				prmOrderCus.setCus_address(cusAddress);
				prmOrderCus.setCus_email(cusEmail);
				prmOrderCus.setCus_phone(cusPhone);
				prmOrderCus.setOrder_note(cusNote);
				prmOrderCus.setId_product(Cart.getId_product());
				prmOrderCus.setNum_product(Cart.getNum_product());

//						Date date = new Date();
				prmOrderCus.setDate_order(timeOrder.getTime());

				orderDao.insertOrderCus(prmOrderCus);

			}

			// Create a Simple MailMessage.
			SimpleMailMessage message = new SimpleMailMessage();

			String MailContent = " <b>THÔNG TIN ĐƠN HÀNG</b> \n " + "Tên khách hàng: " + cusName + "\n " + "Địa chỉ: "
					+ cusAddress + "\n Email: " + cusEmail + "\n Số điện thoại: " + cusPhone + "\n Ghi chú: " + cusNote
					+ "\n MÃ SP: " + prmOrderCus.getId_product() + "\n Số lượng: " + prmOrderCus.getNum_product();

			message.setSubject("Test Simple Email");
			message.setText(MailContent);

			List<RstAccount> rstAccounts = loginDao.getAccountByPermisstion(1);
			for (RstAccount rstAccount : rstAccounts) {

				message.setTo(rstAccount.getMail());

				// Send Message!
				emailSender.send(message);

			}

			orderDao.setCartCusDone(); // clean cart

		}

		dataHolder.add("idCheckOut", idCountOrder); // [0]
		return dataHolder;
	}

}
