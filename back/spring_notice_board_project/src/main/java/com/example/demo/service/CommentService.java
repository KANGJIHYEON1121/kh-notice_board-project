package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.CommentDTO;

public interface CommentService {
	Long register(CommentDTO commentDTO); // 댓글 등록

	List<CommentDTO> getList(Long pno); // 게시글 번호로 댓글 목록 조회
	
	void modify(CommentDTO commentDTO); // 댓글 수정

	void delete(Long cno); // 댓글 삭제
}
