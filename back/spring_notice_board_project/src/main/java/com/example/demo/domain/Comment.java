package com.example.demo.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "tbl_comment")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "post")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_pno", nullable = false)
    private Post post;

    @Column(nullable = false)
    private String writer;

    @Column(nullable = false, length = 1000)
    private String content;
    
    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdDate;
    
    public void changeContent(String content) {
        this.content = content;
    }
}
