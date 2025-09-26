package com.basic.login.Login_using_JWT_Email.controller;

import com.basic.login.Login_using_JWT_Email.dto.ProfileRequest;
import com.basic.login.Login_using_JWT_Email.dto.ProfileResponse;
import com.basic.login.Login_using_JWT_Email.service.EmailService;
import com.basic.login.Login_using_JWT_Email.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    private final EmailService emailService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ProfileResponse registerUser(@Valid @RequestBody ProfileRequest profileRequest){
        ProfileResponse profileResponse = profileService.createProfile(profileRequest);
        emailService.sendWelcomeEmail(profileResponse.getEmail(), profileResponse.getName());
        return profileResponse;
    }


    @GetMapping("/profile")
    public ProfileResponse
    getProfile(@CurrentSecurityContext(
            expression = "authentication?.name")
               String email){
        return profileService.getProfile(email);
    }

}


