package com.example.demo.handler;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.example.demo.dto.MemberDTO;
import com.example.demo.util.JWTUtil;
import com.google.gson.Gson;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

@Log4j2
public class APILoginSuccessHandler implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		log.info(" ");
		log.info(authentication);
		log.info(" ");

		MemberDTO memberDTO = (MemberDTO) authentication.getPrincipal();
		Map<String, Object> claims = memberDTO.getClaims();

		String accessToken = JWTUtil.generateToken(claims, 10); // 10 분
		String refreshToken = JWTUtil.generateToken(claims, 60 * 24); // 24 시간
		claims.put("accessToken", accessToken);
		claims.put("refreshToken", refreshToken);

		Gson gson = new Gson();
		String jsonStr = gson.toJson(claims);

		Cookie memberCookie = new Cookie("member", java.net.URLEncoder.encode(jsonStr, "UTF-8"));
		memberCookie.setPath("/");
		memberCookie.setMaxAge(60 * 60); // 1시간
		memberCookie.setHttpOnly(false); // JS에서 접근 가능해야 하므로 false

		response.setContentType("application/json; charset=UTF-8");
		PrintWriter printWriter = response.getWriter();
		printWriter.println(jsonStr);
		printWriter.close();

	}

}
