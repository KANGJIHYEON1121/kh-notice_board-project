package com.example.demo.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.dto.MemberDTO;
import com.example.demo.util.JWTUtil;
import com.google.gson.Gson;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class JWTCheckFilter extends OncePerRequestFilter {
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		log.info("----- JWTCheckFilter START -----");

		String authHeaderStr = request.getHeader("Authorization");

		try {
			if (authHeaderStr == null || !authHeaderStr.startsWith("Bearer ")) {
				throw new RuntimeException("INVALID_AUTH_HEADER");
			}

			String accessToken = authHeaderStr.substring(7);
			Map<String, Object> claims = JWTUtil.validateToken(accessToken);
			log.info("JWT claims: " + claims);

			// Claims에서 정보 꺼내기
			String email = (String) claims.get("email");
			String pw = (String) claims.get("pw");
			String nickname = (String) claims.get("nickname");
			Boolean social = (Boolean) claims.get("social");
			List<String> roleNames = (List<String>) claims.get("roleNames");

			// MemberDTO 객체 생성
			MemberDTO memberDTO = new MemberDTO(email, pw, nickname, social, roleNames);
			log.info("Authenticated MemberDTO: " + memberDTO);

			// 시큐리티 인증 객체 생성 및 등록
			UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(memberDTO,
					pw, memberDTO.getAuthorities());

			SecurityContextHolder.getContext().setAuthentication(authenticationToken);

			// 다음 필터로 전달
			filterChain.doFilter(request, response);

		} catch (Exception e) {
			SecurityContextHolder.clearContext(); // 인증 실패 시 context 초기화
			log.error("JWT Check Error", e);

			Gson gson = new Gson();
			String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));
			response.setContentType("application/json");
			PrintWriter printWriter = response.getWriter();
			printWriter.println(msg);
			printWriter.close();
		}
	}

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
		String path = request.getRequestURI();
		log.info("check uri: " + path);

		if (request.getMethod().equals("OPTIONS")) {
			return true; // Preflight 요청은 필터 제외
		}

		// 로그인/회원가입/토큰 갱신은 제외
		if (path.startsWith("/api/member/login") || path.startsWith("/api/member/join")
				|| path.startsWith("/api/member/refresh")) {
			return true;
		}

		// 게시글 목록/조회는 제외
		if (path.equals("/api/post/list") || path.equals("/api/post/all")
				|| (path.startsWith("/api/post/") && request.getMethod().equals("GET"))) {
			return true;
		}

		if (path.equals("/api/post/all") || path.equals("/api/post/list")
				|| (path.startsWith("/api/post/") && request.getMethod().equals("GET"))) {
			return true;
		}

		if (path.startsWith("api/post/user/") && request.getMethod().equals("GET")) {
			return true;
		}

		// 댓글 조회(GET)만 제외
		if (path.startsWith("/api/comments/") && request.getMethod().equals("GET")) {
			return true;
		}

		// 이미지 조회
		if (path.startsWith("/api/products/view/") || path.startsWith("/images/")) {
			return true;
		}

		// 좋아요 수 조회는 토큰 없이도 가능하게 제외
		if (path.matches("/api/likes/\\d+/count")) {
			return true;
		}

		// 프로필 이미지 조회는 제외
		if (path.startsWith("/api/member/profile-image/")) {
			return true;
		}

		// 회원가입
		if (path.startsWith("/api/member/join")) {
			return true;
		}

		// 이외는 모두 토큰 검사 대상
		return false;
	}

}
