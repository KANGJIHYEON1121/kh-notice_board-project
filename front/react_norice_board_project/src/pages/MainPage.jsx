import PostItem from "../components/post/PostItem";
import { getAll } from "../api/postApi";
import { useEffect, useState } from "react";
import styled from "styled-components";
import UploadButton from "../components/post/UploadButton";
import Header from "../include/Header";
import Footer from "../include/Footer";

const MainPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const data = await getAll();
      setPosts(data);
    };
    getList();
  }, []);

  const getList = async () =>
    await getAll()
      .then((data) => {
        setPosts(data);
      })
      .catch((e) => {
        console.error("게시글을 불러오지 못했습니다.", e);
      });

  return (
    <>
      <Header />
      <Container>
        {posts.map((item) => (
          <PostItem key={item.pno} post={item} />
        ))}
        <UploadButton />
      </Container>
      <Footer />
    </>
  );
};

export default MainPage;

const Container = styled.div`
  width: 500px;
  margin: auto auto;
  padding-top: 2rem;
`;
