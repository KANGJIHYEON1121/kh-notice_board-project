package com.example.demo.domain;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@SequenceGenerator(name = "POST_SEQ_GEN", // 시퀀스 제너레이터 이름
		sequenceName = "POST_SEQ", // 시퀀스 이름
		initialValue = 1, // 시작값
		allocationSize = 1 // 메모리를 통해 할당할 범위 사이즈
)
@Table(name = "tbl_post")
@Getter
@ToString(exclude = "imageList")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "POST_SEQ_GEN")
	// 사용할 전략을 시퀀스로 선택, 식별자 생성기를 설정해 놓은 TODO_SEQ_GEN으로 설정
	private Long pno;

	private String content;
	private String writer;
	private LocalDate regDate;
	private int likeCount;
	private boolean delFlag;

	public void changeDel(boolean delFlag) {
		this.delFlag = delFlag;
	}

	// tbl_product 테이블 외에 tbl_post_image_list 테이블이 생기고 tbl_post_id, filename, ord
	// 컬럼이 들어감
	@ElementCollection
	@Builder.Default
	private List<PostImage> imageList = new ArrayList<>();

	public void changeContent(String content) {
		this.content = content;
	}
	
	@PrePersist
	public void prePersist() {
		this.regDate = LocalDate.now();
	}

	public void addImage(PostImage image) {
		// 이미지 추가시 순서(ord) 자동 설정 (0, 1, 2, ...)
		image.setOrd(this.imageList.size());
		imageList.add(image);
	}

	public void addImageString(String fileName) {
		PostImage postImage = PostImage.builder().fileName(fileName).build();
		addImage(postImage);
	}

	public void clearList() {
		this.imageList.clear();
	}

}
