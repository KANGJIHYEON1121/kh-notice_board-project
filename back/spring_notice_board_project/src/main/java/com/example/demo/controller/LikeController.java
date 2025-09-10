package com.example.demo.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.MemberDTO;
import com.example.demo.service.LikeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/likes")
@RequiredArgsConstructor
public class LikeController {
	private final LikeService likeService;

	// 좋아요 토글 (추가/삭제)
	@PostMapping("/{pno}/toggle")
	public ResponseEntity<?> toggleLike(@PathVariable Long pno, @AuthenticationPrincipal MemberDTO memberDTO) {
		boolean liked = likeService.toggleLike(memberDTO.getEmail(), pno);
		return ResponseEntity.ok(Map.of("liked", liked));
	}

	// 특정 게시글의 좋아요 상태 확인 (로그인한 사용자가 좋아요 눌렀는지)
	@GetMapping("/{pno}/status")
	public ResponseEntity<?> getLikeStatus(@PathVariable Long pno, @AuthenticationPrincipal MemberDTO memberDTO) {
		boolean liked = likeService.hasLiked(memberDTO.getEmail(), pno);
		return ResponseEntity.ok(Map.of("liked", liked));
	}

	// 특정 게시글의 좋아요 개수 조회
	@GetMapping("/{pno}/count")
	public ResponseEntity<?> getLikeCount(@PathVariable Long pno) {
		int count = likeService.getLikeCount(pno);
		return ResponseEntity.ok(Map.of("likeCount", count));
	}

}
