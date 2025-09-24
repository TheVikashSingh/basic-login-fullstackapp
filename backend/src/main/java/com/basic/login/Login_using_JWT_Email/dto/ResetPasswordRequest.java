package com.basic.login.Login_using_JWT_Email.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResetPasswordRequest {

    @NotBlank(message = "New password of at least 6 lengths is required")
    private String email;

    @NotBlank(message = "New password is required")
    private String newPassword;

    @NotBlank(message = "OTP is required")
    private String otp;

}
