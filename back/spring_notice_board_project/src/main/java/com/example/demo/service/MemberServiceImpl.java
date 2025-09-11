package com.example.demo.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.demo.domain.Member;
import com.example.demo.domain.MemberRole;
import com.example.demo.dto.MemberDTO;
import com.example.demo.dto.MemberJoinDTO;
import com.example.demo.dto.MemberModifyDTO;
import com.example.demo.dto.MemberUpdateDTO;
import com.example.demo.repository.MemberRepository;
import com.example.demo.util.CustomFileUtil;
import com.example.demo.util.CustomJWTException;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor
@Transactional
@Log4j2
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

	@Override
	public void modifyMember(MemberModifyDTO memberModifyDTO) {
		// 이메일 기반으로 회원 조회
		Member member = memberRepository.findByEmail(memberModifyDTO.getEmail())
				.orElseThrow(() -> new RuntimeException("해당 이메일을 가진 회원이 없습니다."));

		// 비밀번호, 닉네임, 소셜 여부 변경
		member.changePw(passwordEncoder.encode(memberModifyDTO.getPw()));
		member.changeSocial(false);
		member.changeNickname(memberModifyDTO.getNickname());

		// 저장
		memberRepository.save(member);
	}

	@Override
	public MemberDTO getKakaoMember(String accessToken) {
		String email = getEmailFromKakaoAccessToken(accessToken);
		log.info("email: " + email);
		Optional<Member> result = memberRepository.findById(email);
		// 기존의 회원
		if (result.isPresent()) {
			MemberDTO memberDTO = entityToDTO(result.get());
			return memberDTO;
		}
		// 회원이 아니었다면 // 닉네임은 '소셜회원'으로
		// 패스워드는 임의로 생성
		Member socialMember = makeSocialMember(email);
		memberRepository.save(socialMember);
		MemberDTO memberDTO = entityToDTO(socialMember);
		return memberDTO;
	}

	private Member makeSocialMember(String email) {
		String tempPassword = makeTempPassword();
		log.info("tempPassword: " + tempPassword);
		String nickname = "소셜회원";
		Member member = Member.builder().email(email).pw(passwordEncoder.encode(tempPassword)).nickname(nickname)
				.social(true).build();
		member.addRole(MemberRole.USER);
		return member;
	}

	private String makeTempPassword() {
		StringBuffer buffer = new StringBuffer();
		for (int i = 0; i < 10; i++) {
			buffer.append((char) ((int) (Math.random() * 55) + 65));
		}
		return buffer.toString();
	}

	private String getEmailFromKakaoAccessToken(String accessToken) {
		// 사용자 정보를 가져오는 URL
		String kakaoGetUserURL = "https://kapi.kakao.com/v2/user/me";

		if (accessToken == null) {
			throw new RuntimeException("Access Token is null");
		}

		// 외부 API 호출용 객체
		RestTemplate restTemplate = new RestTemplate();

		// 요청 헤더 설정
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Bearer " + accessToken);
		headers.add("Content-Type", "application/x-www-form-urlencoded");

		HttpEntity<String> entity = new HttpEntity<>(headers);

		// 카카오 API 요청
		String uri = UriComponentsBuilder.fromHttpUrl(kakaoGetUserURL).toUriString();
		ResponseEntity<LinkedHashMap> response = restTemplate.exchange(uri, HttpMethod.GET, entity,
				LinkedHashMap.class);

		log.info("카카오 응답: {}", response);

		LinkedHashMap<String, Object> bodyMap = response.getBody();
		if (bodyMap == null) {
			throw new RuntimeException("응답 바디가 null입니다.");
		}

		LinkedHashMap<String, Object> kakaoAccount = (LinkedHashMap<String, Object>) bodyMap.get("kakao_account");

		if (kakaoAccount == null || kakaoAccount.get("email") == null) {
			throw new RuntimeException("카카오 계정 정보에서 이메일을 찾을 수 없습니다.");
		}

		String email = (String) kakaoAccount.get("email");
		log.info("카카오 이메일: {}", email);

		return email;
	}

}
