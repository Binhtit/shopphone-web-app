package com.softech.shopphone.config;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class Email {
	    @Autowired
	    public JavaMailSender emailSender;
	 
	    @GetMapping(path = "/sendSimpleEmail")
	    public String sendSimpleEmail() {
	 
	        // Create a Simple MailMessage.
	        SimpleMailMessage message = new SimpleMailMessage();
	         
	        message.setTo("devbinh@gmail.com");
	        message.setSubject("Test Simple Email");
	        message.setText("Hello,11 Im testing Simple Email");
	 
	        // Send Message!
	        this.emailSender.send(message);
	 
	        return "";
	    }



}
