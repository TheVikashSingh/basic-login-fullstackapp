package com.basic.login.Login_using_JWT_Email.service;


import com.basic.login.Login_using_JWT_Email.dto.ProfileRequest;
import com.basic.login.Login_using_JWT_Email.dto.ProfileResponse;
import com.basic.login.Login_using_JWT_Email.entity.UserEntity;
import com.basic.login.Login_using_JWT_Email.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService{

    private final UserRepository userRepository;

    @Override
    public ProfileResponse createProfile(ProfileRequest profileRequest) {
        UserEntity newProfileEntity = convertToUserEntity(profileRequest);
        if(!userRepository.existsByEmail(profileRequest.getEmail())){
            newProfileEntity = userRepository.save(newProfileEntity);
            return convertToProfileResponse(newProfileEntity);
        }
        throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
    }


    private ProfileResponse convertToProfileResponse(UserEntity newProfile) {
        return ProfileResponse.builder()
                .name(newProfile.getName())
                .email(newProfile.getEmail())
                .userID(newProfile.getUserID())
                .isAccountVerified(newProfile.getIsAccountVerified())
                .createdAt(newProfile.getCreatedAt())
                .build();
    }

    private UserEntity convertToUserEntity(ProfileRequest request){
        return UserEntity.builder()
                .email(request.getEmail())
                .userID(UUID.randomUUID().toString())
                .name(request.getName())
                .password(request.getPassword())
                .isAccountVerified(false)
                .resetOTPExpiredAt(0L)
                .verifyOTP(null)
                .verifyOTPExpireAt(0L)
                .resetOTP(null)
                .build();

    }
}
