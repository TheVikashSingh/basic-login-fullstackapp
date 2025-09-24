package com.basic.login.Login_using_JWT_Email.service;


import com.basic.login.Login_using_JWT_Email.dto.ProfileRequest;
import com.basic.login.Login_using_JWT_Email.dto.ProfileResponse;

public interface ProfileService {

   ProfileResponse createProfile(ProfileRequest profileRequest);

   ProfileResponse getProfile(String email);

   void sendResetOTP(String email);

   void resetPassword(String email, String otp, String newPassword);

   void sendOTP(String email);

   void verifyOTP(String email, String otp);
}
