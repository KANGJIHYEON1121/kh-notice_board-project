package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.domain.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
	@EntityGraph(attributePaths = "imageList")
	@Query("select p from Post p where p.pno = :pno")
	Optional<Post> selectOne(@Param("pno") Long pno);

	// @Modifying 어노테이션은 @Query가 SELECT가 아닌 DML(UPDATE, DELETE 등)일 때 필요함.
	@Modifying
	@Query("update Post p set p.delFlag = :flag where p.pno = :pno")
	void updateToDelete(@Param("pno") Long pno, @Param("flag") boolean flag);

	@Query("SELECT p, pi FROM Post p LEFT JOIN p.imageList pi WHERE p.delFlag = false")
	Page<Object[]> selectList(Pageable pageable);

	@EntityGraph(attributePaths = { "imageList", "writer" })
	@Query("SELECT p FROM Post p WHERE p.delFlag = false ORDER BY p.pno DESC")
	List<Post> findAllNotDeletedWithImages();

	Page<Post> findByWriterAndDelFlagFalse(String writer, Pageable pageable);
}
