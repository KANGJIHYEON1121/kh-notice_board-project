import React, { useCallback, useEffect, useState } from "react";
import PostDetail from "../components/post/PostDetail";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getPost } from "../api/postApi";
import { getComments } from "../api/commentApi";

const ReadPage = () => {
  const { pno } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const getItem = async (pno) => {
    await getPost(pno)
      .then((data) => setPost(data))
      .catch((e) => {
        console.log(e);
      });
  };

  const getCommentList = async (pno) => {
    await getComments(pno).then((data) => {
      setComments(data);
    });
  };

  useEffect(() => {
    getItem(pno);
    getCommentList(pno);
  }, []);

  return (
    <div>
      <PostDetail post={post} comments={comments} setComments={setComments} />
    </div>
  );
};

export default ReadPage;
