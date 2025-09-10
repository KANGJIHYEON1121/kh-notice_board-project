package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.domain.Like;
import com.example.demo.domain.Member;
import com.example.demo.domain.Post;

public interface LikeRepository extends JpaRepository<Like, Long> {
	Optional<Like> findByMemberAndPost(Member member, Post post);
    int countByPost(Post post);
    void deleteByMemberAndPost(Member member, Post post);
}
