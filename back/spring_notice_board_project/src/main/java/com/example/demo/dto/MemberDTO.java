package com.example.demo.dto;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor  // 기본 생성자 필수 (ModelMapper에서 사용됨)
@AllArgsConstructor
@Getter
@Setter
@ToString
public class MemberDTO implements UserDetails {

    private static final long serialVersionUID = 1L;

    private String email;
    private String pw;
    private String nickname;
    private boolean social;
    private String profileImage;
    private List<String> roleNames = new ArrayList<>();

    // 주 생성자
    public MemberDTO(String email, String pw, String nickname, boolean social, List<String> roleNames, String profileImage) {
        this.email = email;
        this.pw = pw;
        this.nickname = nickname;
        this.social = social;
        this.roleNames = roleNames;
        this.profileImage = profileImage;
    }

    // 오버로딩 생성자 - profileImage 없이
    public MemberDTO(String email, String pw, String nickname, Boolean social, List<String> roleNames) {
        this(email, pw, nickname, social != null && social.booleanValue(), roleNames, null);
    }

    // JWT Claims로 변환할 때 사용
    public Map<String, Object> getClaims() {
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("email", email);
        dataMap.put("pw", pw);
        dataMap.put("nickname", nickname);
        dataMap.put("social", social);
        dataMap.put("roleNames", roleNames);
        dataMap.put("profileImage", profileImage);
        return dataMap;
    }

    // 권한 반환
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roleNames.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return this.pw;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;  // 필요 시 로직 추가
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;  // 필요 시 로직 추가
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;  // 필요 시 로직 추가
    }

    @Override
    public boolean isEnabled() {
        return true;  // 필요 시 로직 추가
    }
}