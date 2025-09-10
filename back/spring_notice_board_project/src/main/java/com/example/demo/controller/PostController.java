package com.example.demo.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.PageRequestDTO;
import com.example.demo.dto.PageResponseDTO;
import com.example.demo.dto.PostDTO;
import com.example.demo.service.PostService;
import com.example.demo.util.CustomFileUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/post")
public class PostController {

	private final PostService postService;
	private final CustomFileUtil fileUtil;

	@GetMapping("/{pno}")
	public PostDTO get(@PathVariable(name = "pno") Long pno) {
		return postService.get(pno);
	}

	@GetMapping("/list")
	public PageResponseDTO<PostDTO> list(PageRequestDTO pageRequestDTO) {
		log.info("list............." + pageRequestDTO);
		return postService.list(pageRequestDTO);
	}

	@GetMapping("/user/{writer}")
	public PageResponseDTO<PostDTO> getPostsByWriter(@PathVariable("writer") String writer,
			PageRequestDTO pageRequestDTO) {

		log.info("Get posts by writer = " + writer);
		return postService.getListByWriter(writer, pageRequestDTO);
	}

	@GetMapping("/all")
	public List<PostDTO> getList() {
		return postService.getAll();
	}

	@PutMapping("/{pno}")
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	public Map<String, String> modify(@PathVariable(name = "pno") Long pno, PostDTO postDTO) {

		// 수정할 게시글 번호 세팅
		postDTO.setPno(pno);

		// 기존 게시글 DTO 불러오기
		PostDTO oldPostDTO = postService.get(pno);

		// 기존 이미지 파일명 목록
		List<String> oldFileNames = oldPostDTO.getUploadFileNames();

		// 새로 업로드된 파일들
		List<MultipartFile> files = postDTO.getFiles();

		// 새로 저장한 파일 이름 목록
		List<String> currentUploadFileNames = fileUtil.saveFiles(files);

		// 유지되어야 하는 기존 파일들
		List<String> uploadedFileNames = postDTO.getUploadFileNames();

		// 업로드된 것과 기존 유지할 파일을 합친 전체 파일 목록
		if (currentUploadFileNames != null && currentUploadFileNames.size() > 0) {
			uploadedFileNames.addAll(currentUploadFileNames);
		}

		// 수정 처리
		postService.modify(postDTO);

		// 삭제할 파일 목록 찾아서 삭제
		if (oldFileNames != null && oldFileNames.size() > 0) {
			List<String> removeFiles = oldFileNames.stream()
					.filter(fileName -> uploadedFileNames.indexOf(fileName) == -1).collect(Collectors.toList());

			fileUtil.deleteFiles(removeFiles);
		}

		return Map.of("RESULT", "SUCCESS");
	}

	@DeleteMapping("/{pno}")
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	public Map<String, String> remove(@PathVariable("pno") Long pno) {
		// 삭제해야 할 파일들 알아내기
		List<String> oldFileNames = postService.get(pno).getUploadFileNames();
		postService.remove(pno);
		fileUtil.deleteFiles(oldFileNames);
		return Map.of("RESULT", "SUCCESS");
	}

	@PostMapping
	@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	public Map<String, Long> register(@ModelAttribute PostDTO postDTO) {
		log.info("📦 PostDTO: {}", postDTO);
		List<MultipartFile> files = postDTO.getFiles();
		log.info("📂 Multipart files: {}", files);

		List<String> uploadFileNames = fileUtil.saveFiles(files);
		log.info("📸 Saved file names: {}", uploadFileNames);

		postDTO.setUploadFileNames(uploadFileNames);

		Long pno = postService.register(postDTO);
		return Map.of("result", pno);
	}

	@GetMapping("/view/{fileName}")
	public ResponseEntity<Resource> viewFileGET(@PathVariable String fileName) {
		return fileUtil.getFile(fileName);
	}

}
