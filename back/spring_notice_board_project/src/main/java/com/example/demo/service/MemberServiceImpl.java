package com.example.demo.service;

import java.util.List;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.domain.Member;
import com.example.demo.domain.MemberRole;
import com.example.demo.dto.MemberJoinDTO;
import com.example.demo.dto.MemberUpdateDTO;
import com.example.demo.repository.MemberRepository;
import com.example.demo.util.CustomFileUtil;
import com.example.demo.util.CustomJWTException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {
	private final PasswordEncoder passwordEncoder;
	private final MemberRepository memberRepository;
	private final CustomFileUtil customFileUtil;

	@Override
	public void join(MemberJoinDTO memberJoinDTO) {
		// 이메일 중복 검사
		if (memberRepository.existsByEmail(memberJoinDTO.getEmail())) {
			throw new CustomJWTException("Duplicated Email");
		}

		// 닉네임 중복 검사
		if (memberRepository.existsByNickname(memberJoinDTO.getNickname())) {
			throw new CustomJWTException("Duplicated Nickname");
		}

		// 회원 엔티티 생성
		Member member = Member.builder().email(memberJoinDTO.getEmail())
				.pw(passwordEncoder.encode(memberJoinDTO.getPw())).nickname(memberJoinDTO.getNickname())
				.social(memberJoinDTO.isSocial()).profileImage(memberJoinDTO.getProfileImage()).build();

		// 기본 USER 역할 부여
		member.addRole(MemberRole.USER);

		// 저장
		memberRepository.save(member);
	}

	@Override
	public Member findByEmail(String email) {
		return memberRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Member not found"));
	}

	@Override
	public void updateMember(MemberUpdateDTO memberUpdateDTO) {
		String email = memberUpdateDTO.getEmail();

		// 이메일로 회원 정보 조회
		Member member = memberRepository.findByEmail(email)
				.orElseThrow(() -> new CustomJWTException("Member Not Found"));

		// 닉네임 변경
		member.changeNickname(memberUpdateDTO.getNickname());

		// 기존 이미지 삭제 요청
		if (memberUpdateDTO.isRemoveImage() && member.getProfileImage() != null) {
			customFileUtil.deleteFiles(java.util.List.of(member.getProfileImage()));
			member.changeProfileImage(null);
		}

		// 새 이미지 업로드
		if (memberUpdateDTO.getProfileImage() != null && !memberUpdateDTO.getProfileImage().isEmpty()) {
			String uploadedName = customFileUtil.saveFiles(java.util.List.of(memberUpdateDTO.getProfileImage())).get(0);
			member.changeProfileImage(uploadedName);
		}
	}

	@Override
	public void removeProfileImage(String email) {
		Member member = memberRepository.findByEmail(email)
				.orElseThrow(() -> new CustomJWTException("MEMBER NOT FOUND"));

		String profileImage = member.getProfileImage();

		if (profileImage != null) {
			customFileUtil.deleteFiles(List.of(profileImage));
			member.changeProfileImage(null);
			memberRepository.save(member);
		}
	}
}
