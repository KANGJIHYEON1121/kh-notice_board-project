package com.example.demo;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.demo.domain.Post;
import com.example.demo.dto.PageRequestDTO;
import com.example.demo.dto.PageResponseDTO;
import com.example.demo.dto.PostDTO;
import com.example.demo.repository.PostRepository;
import com.example.demo.service.PostService;

import lombok.extern.log4j.Log4j2;

@SpringBootTest
@Log4j2
class PostRepositoryTestss {
	@Autowired
	private PostRepository postRepository;

	@Autowired
	private PostService postService; 

//	@Test
//	public void testInsert() {
//		for (int i = 0; i <= 100; i++) {
//			Post post = Post.builder().content("content test" + i).regDate(LocalDate.of(2025, 9, 04)).writer("user00")
//					.likeCount(0).build();
//			postRepository.save(post);
//		}
//	}

//	@Test
//	public void testRead() {
//		Long pno = 33L;
//		java.util.Optional<Post> result = postRepository.findById(pno);
//		Post post = result.orElseThrow();
//		log.info(post);
//	}

//	@Test
//	public void testImage() {
//		for (int i = 0; i < 10; i++) {
//			Post post = Post.builder().content("test" + i).writer("user00").regDate(LocalDate.of(2025, 9, 4))
//					.likeCount(0).build();
//			// 2 개의 이미지 파일 추가
//			post.addImageString(UUID.randomUUID().toString() + "-" + "IMAGE1.jpg");
//			post.addImageString(UUID.randomUUID().toString() + "-" + "IMAGE2.jpg");
//			postRepository.save(post);
//			log.info(" ");
//		}
//	}

//	@Test
	public void testRead2() {
		Long pno = 103L;
		Optional<Post> result = postRepository.selectOne(pno);
		Post product = result.orElseThrow();
		log.info(product);
		log.info(product.getImageList());
	}

//	@Commit
//	@Transactional
//	@Test
	public void testDelTest() {
		Long pno = 1L;
		postRepository.updateToDelete(pno, true);
	}

//	@Test
	public void testUpdate() {
		Long pno = 10L;
		Post post = postRepository.selectOne(pno).get();
		post.changeContent("10번 게시글");
		// 첨부파일 수정
		post.clearList();
		post.addImageString(UUID.randomUUID().toString() + "-" + "NEWIMAGE1.jpg");
		post.addImageString(UUID.randomUUID().toString() + "-" + "NEWIMAGE2.jpg");
		post.addImageString(UUID.randomUUID().toString() + "-" + "NEWIMAGE3.jpg");
		postRepository.save(post);
	}

//	@Test
	public void testList() {
		PageRequestDTO pageRequestDTO = PageRequestDTO.builder().page(2).size(10).build();
		PageResponseDTO<PostDTO> response = postService.list(pageRequestDTO);
		log.info(response);
	}
}
