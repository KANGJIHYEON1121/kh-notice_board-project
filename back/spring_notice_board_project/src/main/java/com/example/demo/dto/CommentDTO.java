package com.example.demo.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDTO {
	private Long cno;
	private Long pno; // 게시글 번호
	private String writerEmail; // 작성자 이메일
	private String writerNickname; // 작성자 닉네임
	private String writerProfileImage; // 작성자 프로필 이미지
	private String content;
	private LocalDateTime createdDate;
}
