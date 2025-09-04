package com.example.demo.service;

import com.example.demo.dto.PageRequestDTO;
import com.example.demo.dto.PageResponseDTO;
import com.example.demo.dto.PostDTO;

public interface PostService {
	Long register(PostDTO postDTO);

	PostDTO get(Long pno);

	void modify(PostDTO postDTO);

	void remove(Long pno);
	
	PageResponseDTO<PostDTO> list(PageRequestDTO pageRequestDTO);
}
