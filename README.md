# 🗒️ Post It - 나만의 게시판 프로젝트

> Spring Boot + React 기반의 로그인, 게시글, 댓글, 이미지 업로드, 좋아요 기능까지 갖춘 소셜 스타일 게시판 서비스입니다.

---

## 📌 프로젝트 개요

**Post It**은 사용자 인증 기반의 커뮤니티 게시판 서비스로, 다음과 같은 기능을 포함하고 있습니다:

- 회원가입 / 로그인 (JWT 인증, 소셜 로그인 포함)
- 게시글 작성 / 수정 / 삭제
- 댓글 작성 / 수정 / 삭제
- 이미지 업로드 및 미리보기
- 게시글 좋아요 기능
- 마이페이지(회원정보 수정, 프로필 이미지 변경)
- 페이징 처리 및 반응형 UI

---

## 🛠️ 사용 기술 스택

### 🧩 Back-End (Spring Boot)

- Java 17
- Spring Boot 3.x
- Spring Security + JWT
- JPA (Hibernate)
- Oracle DB
- ModelMapper
- Multipart File (이미지 처리)

### 🎨 Front-End (React)

- React 18
- Axios
- React Router DOM
- Styled-components
- Custom Carousel & Image Responsive 처리
- Vite

---

## 🧬 ERD (Entity Relationship Diagram)

아래는 프로젝트에서 사용된 데이터베이스 ERD(Entity Relationship Diagram)입니다:

<img width="954" height="576" alt="Image" src="https://github.com/user-attachments/assets/cf70e30d-c3af-4a02-bc88-55a0b601a519" />

---

## 📁 프로젝트 구조

```
📦 back
 ┣ 📂config          # JWT, Spring Security 설정
 ┣ 📂controller      # REST API 컨트롤러
 ┣ 📂dto             # 데이터 전달용 DTO 클래스
 ┣ 📂entity          # JPA 엔티티
 ┣ 📂repository      # JPA 레포지토리
 ┗ 📂service         # 비즈니스 로직 서비스

📦 front/react_notice_board_project
 ┣ 📂api             # Axios API 호출 함수
 ┣ 📂assets          # 이미지 등 정적 리소스
 ┣ 📂components
 ┃ ┣ 📂common        # 공통 컴포넌트
 ┃ ┣ 📂comment       # 댓글 컴포넌트
 ┃ ┣ 📂member        # 회원 관련 컴포넌트
 ┃ ┗ 📂post          # 게시글 관련 컴포넌트
 ┗ 📂pages           # 주요 페이지 컴포넌트
```
