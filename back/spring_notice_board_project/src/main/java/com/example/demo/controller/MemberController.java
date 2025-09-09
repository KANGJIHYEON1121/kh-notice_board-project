package com.example.demo.controller;

import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.domain.Member;
import com.example.demo.dto.MemberDTO;
import com.example.demo.dto.MemberJoinDTO;
import com.example.demo.dto.MemberUpdateDTO;
import com.example.demo.service.MemberService;
import com.example.demo.util.CustomFileUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {
	private final MemberService memberService;
	private final CustomFileUtil fileUtil;
	private final ModelMapper modelMapper;

	@PostMapping("/join")
	public Map<String, String> join(@RequestBody MemberJoinDTO memberJoinDTO) {
		memberService.join(memberJoinDTO);
		return Map.of("result", "success");
	}

	@GetMapping("/me")
	public ResponseEntity<MemberDTO> getCurrentMember(Authentication authentication) {
		String email = authentication.getName(); // JWT에서 추출된 사용자 email
		Member member = memberService.findByEmail(email);
		MemberDTO dto = modelMapper.map(member, MemberDTO.class);
		return ResponseEntity.ok(dto);
	}

	@GetMapping("/profile-image/{fileName}")
	public ResponseEntity<Resource> getProfileImage(@PathVariable String fileName) {
		return fileUtil.getFile(fileName);
	}

	@PostMapping("/update")
	public Map<String, String> updateMember(@AuthenticationPrincipal MemberDTO memberDTO,
			@RequestPart("nickname") String nickname,
			@RequestPart(value = "profileImage", required = false) MultipartFile profileImage) {
		MemberUpdateDTO updateDTO = MemberUpdateDTO.builder().email(memberDTO.getEmail()) // JWT 인증된 사용자
				.nickname(nickname).profileImage(profileImage).build();

		memberService.updateMember(updateDTO);
		return Map.of("result", "success");
	}

	@DeleteMapping("/profile")
	public ResponseEntity<?> deleteProfileImage(@AuthenticationPrincipal MemberDTO memberDTO) {
		memberService.removeProfileImage(memberDTO.getEmail());
		return ResponseEntity.ok().body(Map.of("result", "deleted"));
	}
}
