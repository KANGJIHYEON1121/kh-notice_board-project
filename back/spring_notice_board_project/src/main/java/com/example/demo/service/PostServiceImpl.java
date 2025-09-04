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

import com.example.demo.domain.Post;
import com.example.demo.domain.PostImage;
import com.example.demo.dto.PageRequestDTO;
import com.example.demo.dto.PageResponseDTO;
import com.example.demo.dto.PostDTO;
import com.example.demo.repository.PostRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Transactional
@Log4j2
@RequiredArgsConstructor // final로 선언된 필드(modelMapper, todoRepository)에 대해 생성자 자동 생성자주입
public class PostServiceImpl implements PostService {

	// 자동주입 대상은 final로
	private final ModelMapper modelMapper;
	private final PostRepository postRepository;

	@Override
	public Long register(PostDTO postDTO) {
		Post post = dtoToEntity(postDTO);
		Post result = postRepository.save(post);
		return result.getPno();
	}

	private Post dtoToEntity(PostDTO postDTO) {
		Post post = Post.builder().pno(postDTO.getPno()).content(postDTO.getContent()).writer(postDTO.getWriter())
				.build();

		List<String> uploadFileNames = postDTO.getUploadFileNames();

		if (uploadFileNames != null && !uploadFileNames.isEmpty()) {
			uploadFileNames.forEach(uploadName -> {
				post.addImageString(uploadName);
			});
		}

		return post;
	}

	@Override
	public PostDTO get(Long pno) {
		java.util.Optional<Post> result = postRepository.selectOne(pno);
		Post post = result.orElseThrow();
		PostDTO postDTO = entityToDTO(post);
		return postDTO;
	}

	private PostDTO entityToDTO(Post post) {
		PostDTO postDTO = PostDTO.builder().pno(post.getPno()).content(post.getContent()).writer(post.getWriter())
				.build();

		List<PostImage> imageList = post.getImageList();

		if (imageList == null || imageList.isEmpty()) {
			return postDTO;
		}

		List<String> fileNameList = imageList.stream().map(postImage -> postImage.getFileName()).toList();

		postDTO.setUploadFileNames(fileNameList);
		return postDTO;
	}

	@Override
	public void modify(PostDTO postDTO) {
		// 1. 게시글 조회
		Optional<Post> result = postRepository.findById(postDTO.getPno());
		Post post = result.orElseThrow();

		// 2. 내용 변경
		post.changeContent(postDTO.getContent());

		// 3. 이미지 초기화 후 다시 추가
		post.clearList(); // 기존 이미지 리스트 비우기

		List<String> uploadFileNames = postDTO.getUploadFileNames();
		if (uploadFileNames != null && !uploadFileNames.isEmpty()) {
			uploadFileNames.forEach(uploadName -> {
				post.addImageString(uploadName);
			});
		}

		// 4. 저장
		postRepository.save(post);
	}

	@Override
	public void remove(Long pno) {
		postRepository.updateToDelete(pno, true);
	}

	@Override
	public PageResponseDTO<PostDTO> list(PageRequestDTO pageRequestDTO) {
		log.info("list");

		// 페이지 시작 번호가 0부터 시작하므로 -1 처리
		Pageable pageable = PageRequest.of(pageRequestDTO.getPage() - 1, pageRequestDTO.getSize(),
				Sort.by("pno").descending());

		Page<Object[]> result = postRepository.selectList(pageable);

		List<PostDTO> dtoList = result.get().map(arr -> {
			Post post = (Post) arr[0];
			PostImage postImage = (PostImage) arr[1];

			PostDTO postDTO = PostDTO.builder().pno(post.getPno()).writer(post.getWriter()).content(post.getContent())
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

}
