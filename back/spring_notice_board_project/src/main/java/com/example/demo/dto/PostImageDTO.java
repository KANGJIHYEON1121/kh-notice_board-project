package com.example.demo.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostImageDTO {
	private String uuid;
	private String fileName;
	private int ord;
	
	// DTO 필드 추가
	private List<PostImageDTO> imageDTOList;

	// getter (Lombok 쓰면 @Getter or @Data로 자동 생성됨)
	public List<PostImageDTO> getImageDTOList() {
		return imageDTOList;
	}

	// setter (선택 사항)
	public void setImageDTOList(List<PostImageDTO> imageDTOList) {
		this.imageDTOList = imageDTOList;
	}
}
