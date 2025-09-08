package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.domain.Comment;
import com.example.demo.domain.Post;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	List<Comment> findByPost(Post post);
}
