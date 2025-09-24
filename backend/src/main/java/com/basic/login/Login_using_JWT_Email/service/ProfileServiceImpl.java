package com.basic.login.Login_using_JWT_Email.service;


import com.basic.login.Login_using_JWT_Email.dto.ProfileRequest;
import com.basic.login.Login_using_JWT_Email.dto.ProfileResponse;
import com.basic.login.Login_using_JWT_Email.entity.UserEntity;
import com.basic.login.Login_using_JWT_Email.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.security.SecureRandom;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Override
    public ProfileResponse createProfile(ProfileRequest profileRequest) {
        UserEntity newProfileEntity = convertToUserEntity(profileRequest);
        if(!userRepository.existsByEmail(profileRequest.getEmail())){
            newProfileEntity = userRepository.save(newProfileEntity);
            return convertToProfileResponse(newProfileEntity);
        }
        throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
    }

    @Override
    public ProfileResponse getProfile(String email) {
        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found!"));
        return convertToProfileResponse(existingUser);
    }


    @Override
    public void sendResetOTP(String email) {
        SecureRandom secureRandom = new SecureRandom();
        int minOTP = 100_000;
        int maxOTP = 999_999;
        String resetOTP = String.valueOf(secureRandom.nextInt(maxOTP-minOTP) + minOTP);

        //Setting OTP expiry time range to 15 minutes
        long expirytime = System.currentTimeMillis() + 10*60*1000;

        //update the profile entity
        UserEntity existingEntity = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
        existingEntity.setResetOTP(resetOTP);
        existingEntity.setResetOTPExpiredAt(expirytime);

        //save into databse
        userRepository.save(existingEntity);
        try{
            emailService.sendResetOTPEmail(email,resetOTP);
        }catch (Exception ex){
            throw new RuntimeException("Unable to send email");
        }
    }

    @Override
    public void resetPassword(String email, String otp, String newPassword) {
        UserEntity existingEntity = userRepository.findByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("User not found: "+email));
        if (existingEntity.getResetOTP() == null || !(existingEntity.getResetOTP().equals(otp))) {
            throw new RuntimeException("Invalid OTP");
        }

        if(existingEntity.getResetOTPExpiredAt() < System.currentTimeMillis()){
            throw new RuntimeException("OTP has expired");
        }

        existingEntity.setPassword(passwordEncoder.encode(newPassword));
        existingEntity.setResetOTP(null);
        existingEntity.setResetOTPExpiredAt(0L);

        userRepository.save(existingEntity);
    }

    @Override
    public void sendOTP(String email) {
        UserEntity existingEntity = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found 5858: " + email));
        if ((existingEntity.getIsAccountVerified() != null) &&
                existingEntity.getIsAccountVerified()) {
            return;
        }

        //Generate 6 digits OTP
        SecureRandom secureRandom = new SecureRandom();
        int minOTP = 100_000;
        int maxOTP = 999_999;
        String otp = String.valueOf(secureRandom.nextInt(maxOTP - minOTP) + minOTP);
        long expiryTime = System.currentTimeMillis() + (24 * 60 * 60 * 1000);  //1 day verify otp expiry time

        //Update the user entity
        existingEntity.setVerifyOTP(otp);
        existingEntity.setVerifyOTPExpiredAt(expiryTime);

        userRepository.save(existingEntity);

        //send the verification OTP
        try{
            emailService.sendVerificationOTP(email,otp);
        } catch (Exception ex) {
            throw new RuntimeException("Unable to send email");
        }

    }

    @Override
    public void verifyOTP(String email, String otp){
        UserEntity existingUser = userRepository.findByEmail(email).orElseThrow(()->new UsernameNotFoundException("User not found: "+email));
        if(existingUser.getVerifyOTP() == null || !existingUser.getVerifyOTP().equals(otp)){
            throw new RuntimeException("Invalid OTP");
        }
        if(existingUser.getVerifyOTPExpiredAt() < System.currentTimeMillis()){
            throw new RuntimeException("Verification OTP has expired");
        }
        existingUser.setIsAccountVerified(true);
        existingUser.setVerifyOTP(null);
        existingUser.setVerifyOTPExpiredAt(0L); //Use 0L only if you specifically want to represent the epoch start
        userRepository.save(existingUser);
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
                .password(passwordEncoder.encode(request.getPassword()))
                .isAccountVerified(false)
                .resetOTPExpiredAt(0L)
                .verifyOTP(null)
                .verifyOTPExpiredAt(0L)
                .resetOTP(null)
                .build();

    }
}
