package com.example.demo.domain;

import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

import lombok.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString(exclude = "post")
public class PostImage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "UUID")
	private String uuid;

	@Column(name = "FILE_NAME")
	private String fileName;

	@Column(name = "ORD")
	private int ord;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "post_id") // post_id 컬럼이 FK
	private Post post;

	public void setPost(Post post) {
		this.post = post;
	}

	public void setOrd(int ord) {
		this.ord = ord;
	}
}