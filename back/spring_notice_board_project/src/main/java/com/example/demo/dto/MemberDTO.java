package com.example.demo.dto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberDTO extends User {
	private static final long serialVersionUID = 1L;
	private String email;
	private String pw;
	private String nickname;
	private boolean social;
	private String profileImage;
	private List<String> roleNames = new ArrayList<>();

	// 주 생성자
	public MemberDTO(String email, String pw, String nickname, boolean social, List<String> roleNames,
			String profileImage) {
		super(email, pw,
				roleNames.stream().map(str -> new SimpleGrantedAuthority("ROLE_" + str)).collect(Collectors.toList()));
		this.email = email;
		this.pw = pw;
		this.nickname = nickname;
		this.social = social;
		this.roleNames = roleNames;
		this.profileImage = profileImage;
	}

	// 오버로딩 생성자 - profileImage 없이도 사용 가능
	public MemberDTO(String email, String pw, String nickname, Boolean social, List<String> roleNames) {
		this(email, pw, nickname, social != null && social.booleanValue(), roleNames, null);
	}

	public Map<String, Object> getClaims() {
		Map<String, Object> dataMap = new HashMap<>();
		dataMap.put("email", email);
		dataMap.put("pw", pw);
		dataMap.put("nickname", nickname);
		dataMap.put("social", social);
		dataMap.put("roleNames", roleNames);
		dataMap.put("profileImage", profileImage); // ✅ 오타 수정
		return dataMap;
	}
}
