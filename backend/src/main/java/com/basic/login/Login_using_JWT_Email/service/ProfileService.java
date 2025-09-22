package com.basic.login.Login_using_JWT_Email.service;


import com.basic.login.Login_using_JWT_Email.dto.ProfileRequest;
import com.basic.login.Login_using_JWT_Email.dto.ProfileResponse;

public interface ProfileService {

   ProfileResponse createProfile(ProfileRequest profileRequest);
}
