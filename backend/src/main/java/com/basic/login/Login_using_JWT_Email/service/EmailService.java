package com.basic.login.Login_using_JWT_Email.service;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendWelcomeEmail(String toEmail, String name){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Welcome to our Portal!");
        message.setText("Hello "+name+",\n\nThanks for registering with us! I, Vikash Pratap Singh, am CEO of this platform, " +
                "and we hope that you will have an awesome experience ahead..."+"\n\n Regards,\n Team Lockely");
        javaMailSender.send(message);
    }


    public void sendResetOTPEmail(String toEmail, String otp){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Password Reset OTP");
        message.setText("The OTP to reset your account is "+otp+". \n Please use it within 15 minutes."+
                "\n \n Regards");
        javaMailSender.send(message);
    }


    public void sendVerificationOTP(String toEmail, String otp){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Verification OTP");
        message.setText("The OTP to verify your account is "+otp+". \n Please use it within 1 day"+
                "\n \n Regards");
        javaMailSender.send(message);
    }


}
