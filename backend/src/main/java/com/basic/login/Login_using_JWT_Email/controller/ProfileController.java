package com.basic.login.Login_using_JWT_Email.controller;

import com.basic.login.Login_using_JWT_Email.dto.ProfileRequest;
import com.basic.login.Login_using_JWT_Email.dto.ProfileResponse;
import com.basic.login.Login_using_JWT_Email.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1.0")
@RequiredArgsConstructor
public class ProfileController {

    @Autowired
    ProfileService profileService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ProfileResponse registerUser(@Valid @RequestBody ProfileRequest profileRequest){
        ProfileResponse profileResponse = profileService.createProfile(profileRequest);
        //TODO : send welcome email
        return profileResponse;
    }
}
