package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.PageRequestDTO;
import com.example.demo.dto.PageResponseDTO;
import com.example.demo.dto.PostDTO;

public interface PostService {
	Long register(PostDTO postDTO);

	PostDTO get(Long pno);
	
	PageResponseDTO<PostDTO> getListByWriter(String writer, PageRequestDTO pageRequestDTO);
	
	List<PostDTO> getAll();

	void modify(PostDTO postDTO);

	void remove(Long pno);
	
	PageResponseDTO<PostDTO> list(PageRequestDTO pageRequestDTO);
}
