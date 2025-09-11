package com.example.demo.service;

import java.util.stream.Collectors;

import org.springframework.transaction.annotation.Transactional;

import com.example.demo.domain.Member;
import com.example.demo.dto.MemberDTO;
import com.example.demo.dto.MemberJoinDTO;
import com.example.demo.dto.MemberModifyDTO;
import com.example.demo.dto.MemberUpdateDTO;

@Transactional
public interface MemberService {
	void join(MemberJoinDTO memberJoinDTO);

	Member findByEmail(String email);

	void updateMember(MemberUpdateDTO memberUpdateDTO);

	void removeProfileImage(String email);

	MemberDTO getKakaoMember(String accessToken);
	
	void modifyMember(MemberModifyDTO memberModifyDTO);

	default MemberDTO entityToDTO(Member member) {
		MemberDTO dto = new MemberDTO(member.getEmail(), member.getPw(), member.getNickname(), member.isSocial(),
				member.getMemberRoleList().stream().map(memberRole -> memberRole.name()).collect(Collectors.toList()));
		return dto;
	}
}
