package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.demo.domain.Member;
import com.example.demo.domain.Post;
import com.example.demo.domain.PostImage;
import com.example.demo.dto.PageRequestDTO;
import com.example.demo.dto.PageResponseDTO;
import com.example.demo.dto.PostDTO;
import com.example.demo.dto.PostImageDTO;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.PostRepository;
import com.example.demo.security.SecurityUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

	private final ModelMapper modelMapper;
	private final PostRepository postRepository;
	private final MemberRepository memberRepository;

	@Override
	public Long register(PostDTO postDTO) {
		// 1. 토큰에서 이메일 꺼냄
		String emailFromToken = SecurityUtil.getCurrentMemberEmail();
		log.info("📧 Email from SecurityUtil: {}", emailFromToken);

		// 2. 이메일로 Member 엔티티 조회
		Member member = memberRepository.findByEmail(emailFromToken)
				.orElseThrow(() -> new RuntimeException("Member not found"));

		// 3. Post 생성
		Post post = Post.builder().content(postDTO.getContent()).writer(member).build();

		// 4. 이미지 리스트 처리 (uploadFileNames 이용)
		List<String> fileNames = postDTO.getUploadFileNames();
		if (fileNames != null && !fileNames.isEmpty()) {
			for (String fileName : fileNames) {
				PostImage image = PostImage.builder().fileName(fileName).build();

				post.addImage(image); // 연관관계 자동 설정
				log.info("📸 이미지 추가됨: {}", image.getFileName());
			}
		}

		// 5. 저장 (Post만 저장하면 이미지도 같이 저장됨 - Cascade.ALL)
		Post saved = postRepository.save(post);

		log.info(" 저장 완료 Post ID: {}", saved.getPno());
		return saved.getPno();
	}

	private Post dtoToEntity(PostDTO postDTO, Member writer) {
		Post post = Post.builder().pno(postDTO.getPno()).content(postDTO.getContent()).writer(writer).build();

		if (postDTO.getUploadFileNames() != null) {
			postDTO.getUploadFileNames().forEach(post::addImageString);
		}

		return post;
	}

	@Override
	public PostDTO get(Long pno) {
		Optional<Post> result = postRepository.selectOne(pno);
		Post post = result.orElseThrow();
		return entityToDTO(post);
	}

	private PostDTO entityToDTO(Post post) {
		PostDTO postDTO = PostDTO.builder().pno(post.getPno()).content(post.getContent())
				.writerEmail(post.getWriter().getEmail()).writerNickname(post.getWriter().getNickname())
				.writerProfileImage(post.getWriter().getProfileImage()).regDate(post.getRegDate())
				.likeCount(post.getLikeCount()).build();

		List<PostImage> imageList = post.getImageList();

		if (imageList != null && !imageList.isEmpty()) {
			List<String> fileNameList = imageList.stream().map(PostImage::getFileName).toList();
			postDTO.setUploadFileNames(fileNameList);
		}

		return postDTO;
	}

	@Override
	public void modify(PostDTO postDTO) {
		Optional<Post> result = postRepository.findById(postDTO.getPno());
		Post post = result.orElseThrow();

		post.changeContent(postDTO.getContent());
		post.clearList();

		List<String> uploadFileNames = postDTO.getUploadFileNames();
		if (uploadFileNames != null && !uploadFileNames.isEmpty()) {
			uploadFileNames.forEach(uploadName -> {
				post.addImageString(uploadName);
			});
		}

		postRepository.save(post);
	}

	@Override
	public void remove(Long pno) {
		postRepository.updateToDelete(pno, true);
	}

	@Override
	public PageResponseDTO<PostDTO> list(PageRequestDTO pageRequestDTO) {
		log.info("list");

		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
				Sort.by("pno").descending());

		Page<Object[]> result = postRepository.selectList(pageable);

		List<PostDTO> dtoList = result.get().map(arr -> {
			Post post = (Post) arr[0];
			PostImage postImage = (PostImage) arr[1];

			PostDTO postDTO = PostDTO.builder().pno(post.getPno()).writerEmail(post.getWriter().getEmail())
					.writerNickname(post.getWriter().getNickname())
					.writerProfileImage(post.getWriter().getProfileImage()).content(post.getContent())
					.likeCount(post.getLikeCount()).build();

			if (postImage != null) {
				String imageStr = postImage.getFileName();
				postDTO.setUploadFileNames(List.of(imageStr));
			}

			return postDTO;
		}).collect(Collectors.toList());

		long totalCount = result.getTotalElements();

		return PageResponseDTO.<PostDTO>withAll().dtoList(dtoList).totalCount(totalCount).pageRequestDTO(pageRequestDTO)
				.build();
	}

	@Override
	public List<PostDTO> getAll() {
		List<Post> posts = postRepository.findAllNotDeletedWithImages();

		return posts.stream().map(post -> {
			PostDTO dto = PostDTO.builder().pno(post.getPno()).writerEmail(post.getWriter().getEmail())
					.writerNickname(post.getWriter().getNickname())
					.writerProfileImage(post.getWriter().getProfileImage()).content(post.getContent())
					.likeCount(post.getLikeCount()).regDate(post.getRegDate()).build();

			List<PostImage> images = post.getImageList();
			if (images != null && !images.isEmpty()) {
				List<String> imageNames = images.stream().map(PostImage::getFileName).toList();
				dto.setUploadFileNames(imageNames);
			}
			return dto;
		}).collect(Collectors.toList());
	}

	@Override
	public PageResponseDTO<PostDTO> getListByWriter(String nickname, PageRequestDTO pageRequestDTO) {
		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
				Sort.by("pno").descending());

		Page<Post> result = postRepository.findByWriterNicknameAndDelFlagFalse(nickname, pageable);

		List<PostDTO> dtoList = result.getContent().stream().map(post -> PostDTO.builder().pno(post.getPno())
				.content(post.getContent()).likeCount(post.getLikeCount()).regDate(post.getRegDate())
				.writerEmail(post.getWriter().getEmail()).writerNickname(post.getWriter().getNickname())
				.writerProfileImage(post.getWriter().getProfileImage())
				.imageDTOList(post.getImageList().stream()
						.map(img -> PostImageDTO.builder().uuid(img.getUuid()).fileName(img.getFileName()).build())
						.toList())
				.build()).toList();

		return PageResponseDTO.<PostDTO>withAll().dtoList(dtoList).pageRequestDTO(pageRequestDTO)
				.totalCount((int) result.getTotalElements()).build();
	}
}