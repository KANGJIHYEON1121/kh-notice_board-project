package com.example.demo.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostDTO {
	private Long pno; // 게시글 번호
	private String content; // 본문
	private int likeCount; // 좋아요 갯수
	private LocalDate regDate;
	private List<PostImageDTO> imageDTOList;

	// 작성자
	private String writerEmail;
	private String writerNickname;
	private String writerProfileImage;

	@Builder.Default
	private List<MultipartFile> files = new ArrayList<>();

	@Builder.Default
	private List<String> uploadFileNames = new ArrayList<>();
}
