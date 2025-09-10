package com.example.demo.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.example.demo.dto.MemberDTO;

public class SecurityUtil {

	public static String getCurrentMemberEmail() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		if (authentication == null || !authentication.isAuthenticated()) {
			return null;
		}

		Object principal = authentication.getPrincipal();

		// principal이 MemberDTO 형태일 경우
		if (principal instanceof MemberDTO) {
			return ((MemberDTO) principal).getEmail();
		}

		// principal이 그냥 문자열인 경우 (예: username)
		return principal.toString();
	}
}