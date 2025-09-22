package com.basic.login.Login_using_JWT_Email.dto;


import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileRequest {

    @NotBlank(message = "Name should not be empty")
    private String name;

    @Email(message = "Enter Valid Email")
    @NotNull(message = "Email Should not be empty")
    private String email;

    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

}
