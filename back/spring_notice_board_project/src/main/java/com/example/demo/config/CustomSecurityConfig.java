package com.example.demo.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.demo.filter.JWTCheckFilter;
import com.example.demo.handler.APILoginFailHandler;
import com.example.demo.handler.APILoginSuccessHandler;
import com.example.demo.handler.CustomAccessDeniedHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Configuration
@Log4j2
@RequiredArgsConstructor
@EnableMethodSecurity
public class CustomSecurityConfig {

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		log.info("----- Security Config Loaded -----");

		// CORS 설정 적용
		http.cors(cors -> cors.configurationSource(corsConfigurationSource()));

		// 세션 비활성화 (JWT 인증 기반)
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		// CSRF 비활성화 (REST API에서는 일반적으로 disable)
		http.csrf(csrf -> csrf.disable());

		// 요청 허용/차단 설정
		http.authorizeHttpRequests(
				auth -> auth.requestMatchers("/api/member/login", "/api/member/join", "/api/member/refresh").permitAll()
						.requestMatchers("/api/member/me").authenticated().requestMatchers("/api/post/list").permitAll()
						.requestMatchers("/api/post/all").permitAll().requestMatchers("/api/post/*").permitAll()
						.requestMatchers("/api/post/view/**").permitAll()
						.requestMatchers("/api/member/profile-image/**").permitAll().requestMatchers("/api/comments/**")
						.permitAll().requestMatchers("/images/**").permitAll().anyRequest().authenticated());

		// 로그인페이지 URL 을 /api/member/login 지정하고, 인증되지 않은 사용자가 보호된 리소스를 요청하면 이 URL 로
		// 리다이렉트된다.
		http.formLogin(config -> {
			config.loginProcessingUrl("/api/member/login");

			// 로그인 성공 시 실행될 핸들러 객체를 지정 코드
			config.successHandler(new APILoginSuccessHandler());

			// 로그인 실패 시 실행될 핸들러 객체를 지정 코드
			config.failureHandler(new APILoginFailHandler());
		});

		// JWT 체크 추가
		http.addFilterBefore(new JWTCheckFilter(), UsernamePasswordAuthenticationFilter.class);

		// 권한이 허가 되지 않았을 때 예외처리 메시지 처리
		http.exceptionHandling(config -> {
			config.accessDeniedHandler(new CustomAccessDeniedHandler());
		});

		return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOriginPatterns(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE"));
		configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);

		return source;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}