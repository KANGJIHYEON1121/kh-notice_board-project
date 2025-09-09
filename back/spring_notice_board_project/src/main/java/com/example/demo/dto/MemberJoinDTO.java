package com.example.demo.dto;

import lombok.Data;

@Data
public class MemberJoinDTO {
	private String email;
    private String pw;
    private String nickname;
    private boolean social = false; 
    private String profileImage;    
}
