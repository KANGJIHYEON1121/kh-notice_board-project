package com.example.demo.service;

import com.example.demo.domain.Member;
import com.example.demo.dto.MemberJoinDTO;
import com.example.demo.dto.MemberUpdateDTO;

public interface MemberService {
	void join(MemberJoinDTO memberJoinDTO);
	
	Member findByEmail(String email);

	void updateMember(MemberUpdateDTO memberUpdateDTO);
	
	void removeProfileImage(String email);
}
