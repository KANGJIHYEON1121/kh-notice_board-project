package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.domain.Member;
import com.example.demo.domain.MemberRole;
import com.example.demo.repository.MemberRepository;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
class MemberRepositoryTestss {
	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

//	@Test
	public void testInsertMember() {
		for (int i = 0; i < 10; i++) {
			Member member = Member.builder().email("user" + i + "@test.com").pw(passwordEncoder.encode("1234"))
					.nickname("USER" + i).build();
			member.addRole(MemberRole.USER);
			if(i >= 5) {
				member.addRole(MemberRole.MANAGER);
			}
			if(i >= 9) {
				member.addRole(MemberRole.ADMIN);
			}
			memberRepository.save(member);
		}
	}
	
	@Test
	public void testRoad() {
		String email = "user9@test.com";
		Member member = memberRepository.getWithRoles(email);
		log.info(member);
	}

}
