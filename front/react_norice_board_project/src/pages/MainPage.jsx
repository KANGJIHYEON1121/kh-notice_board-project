import PostItem from "../components/post/PostItem";
import { getAll } from "../api/postApi";
import { useEffect, useState } from "react";

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
    <div>
      {posts.map((item) => (
        <PostItem key={item.pno} post={item} />
      ))}
    </div>
  );
};

export default MainPage;
