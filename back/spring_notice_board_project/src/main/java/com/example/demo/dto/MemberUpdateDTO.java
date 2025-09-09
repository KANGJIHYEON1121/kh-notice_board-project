package com.example.demo.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder 
@NoArgsConstructor
@AllArgsConstructor
public class MemberUpdateDTO {
    private String email; // 수정할 유저의 이메일 (고유값)
    private String nickname; // 변경할 닉네임
    private MultipartFile profileImage; // 새로 업로드된 프로필 이미지 (없으면 null)
    private boolean removeImage; // 기존 이미지 삭제 여부 (프론트에서 체크박스로 전달)
}