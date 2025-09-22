package com.basic.login.Login_using_JWT_Email.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileResponse {


    private String userID;
    private String name;
    private String email;
    private Boolean isAccountVerified;
    private Timestamp createdAt;

}
