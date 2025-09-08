package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CommentDTO;
import com.example.demo.service.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/")
    public Long register(@RequestBody CommentDTO dto) {
        return commentService.register(dto);
    }

    @GetMapping("/{pno}")
    public List<CommentDTO> getList(@PathVariable("pno") Long pno) {
        return commentService.getList(pno);
    }
    
    @PutMapping("/{cno}")
    public void modify(@PathVariable("cno") Long cno, @RequestBody CommentDTO dto) {
        dto.setCno(cno);
        commentService.modify(dto);
    }

    @DeleteMapping("/{cno}")
    public void delete(@PathVariable("cno") Long cno) {
        commentService.delete(cno);
    }
}