package com.example.demo.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString(exclude = "memberRoleList")
public class Member {
	@Id
	@Column(name = "EMAIL")
	private String email;

	@Column(name = "NICKNAME")
	private String nickname;

	@Column(name = "PW")
	private String pw;

	@Column(name = "SOCIAL")
	private boolean social;

	@Column(name = "PROFILE_IMAGE")
	private String profileImage;

	@ElementCollection(fetch = FetchType.LAZY)
	@Builder.Default
	private List<MemberRole> memberRoleList = new ArrayList<>();

	public void addRole(MemberRole memberRole) {
		memberRoleList.add(memberRole);
	}

	public void clearRole() {
		memberRoleList.clear();
	}

	public void changeNickname(String nickname) {
		this.nickname = nickname;
	}

	public void changePw(String pw) {
		this.pw = pw;
	}

	public void changeSocial(boolean social) {
		this.social = social;
	}

	public void changeProfileImage(String profileImage) {
		this.profileImage = profileImage;
	}

}
