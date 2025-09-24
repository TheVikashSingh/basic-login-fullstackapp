package com.basic.login.Login_using_JWT_Email.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponse {

    private String email;
    private String token;

}
