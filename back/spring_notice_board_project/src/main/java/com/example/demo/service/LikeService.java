package com.example.demo.service;

public interface LikeService {
	boolean toggleLike(String email, Long postId);

	boolean hasLiked(String email, Long postId);

	int getLikeCount(Long postId);
}
