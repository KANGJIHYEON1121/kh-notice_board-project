package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.example.demo.domain.Comment;
import com.example.demo.domain.Member;
import com.example.demo.domain.Post;
import com.example.demo.dto.CommentDTO;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.PostRepository;
import com.example.demo.security.SecurityUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

	private final CommentRepository commentRepository;
	private final PostRepository postRepository;
	private final MemberRepository memberRepository;
	private final ModelMapper modelMapper;

	@Override
	public Long register(CommentDTO dto) {
		Post post = postRepository.findById(dto.getPno())
				.orElseThrow(() -> new IllegalArgumentException("Post not found: " + dto.getPno()));

		String email = SecurityUtil.getCurrentMemberEmail();

		Member member = memberRepository.findByEmail(email)
				.orElseThrow(() -> new IllegalArgumentException("Member not found: " + email));

		Comment comment = Comment.builder().post(post).writer(member).content(dto.getContent()).build();

		return commentRepository.save(comment).getCno();
	}

	@Override
	public List<CommentDTO> getList(Long pno) {
		Post post = postRepository.findById(pno)
				.orElseThrow(() -> new IllegalArgumentException("Post not found: " + pno));

		return commentRepository.findByPost(post).stream()
				.map(comment -> CommentDTO.builder().cno(comment.getCno()).pno(post.getPno())
						.content(comment.getContent()).writerNickname(comment.getWriter().getNickname())
						.writerProfileImage(comment.getWriter().getProfileImage()).createdDate(comment.getCreatedDate())
						.build())
				.collect(Collectors.toList());
	}

	@Override
	public void modify(CommentDTO dto) {
		Comment comment = commentRepository.findById(dto.getCno())
				.orElseThrow(() -> new IllegalArgumentException("Comment not found: " + dto.getCno()));

		comment.changeContent(dto.getContent());

		commentRepository.save(comment);
	}

	@Override
	public void delete(Long cno) {
		commentRepository.deleteById(cno);
	}
}