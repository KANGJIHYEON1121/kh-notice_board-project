import React, { useCallback, useEffect, useState } from "react";
import PostDetail from "../components/post/PostDetail";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getPost } from "../api/postApi";

const ReadPage = () => {
  const { pno } = useParams();
  const [queryParams] = useSearchParams();
  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;
  const queryStr = createSearchParams({ page, size }).toString();
  const [post, setPost] = useState({});

  const moveToModify = useCallback(
    (pno) => {
      nav({ pathname: `/todo/modify/${pno}`, search: queryStr });
    },
    [pno, page, size]
  );

  const moveToList = useCallback(() => {
    nav({ pathname: `/todo/list`, search: queryStr });
  }, [page, size]);

  const getItem = async (pno) => {
    await getPost(pno)
      .then((data) => setPost(data))
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getItem(pno);
  }, []);

  return (
    <div>
      ReadPage
      {`param = ${pno}`}
      <PostDetail post={post} />
    </div>
  );
};

export default ReadPage;
