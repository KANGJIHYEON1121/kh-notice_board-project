import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { getListByWriter } from "../../api/postApi";
import { useEffect, useState } from "react";
import PostItem from "../post/PostItem";
import styled from "styled-components";

const ListPageComponent = () => {
  const { writer } = useParams();
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();

  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 9;

  const [postList, setPostList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getList(writer, page, size);
  }, [writer, page, size]);

  const getList = async (user, page, size) => {
    try {
      const data = await getListByWriter(user, page, size);
      console.log(data);
      setPostList(data.dtoList || []);
      setTotalPages(data.totalPage || 1);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePageChange = (newPage) => {
    navigate(`/list/${writer}?page=${newPage}&size=${size}`);
  };

  return (
    <Container>
      <PostList>
        {postList.map((post) => (
          <>
            <PostItem post={post} key={post.pno}></PostItem>
          </>
        ))}
      </PostList>
      <PaginationWrapper>
        {page > 1 && (
          <PageButton onClick={() => handlePageChange(page - 1)}>
            &lt;
          </PageButton>
        )}

        {Array.from({ length: totalPages }, (_, idx) => (
          <PageButton
            key={idx}
            onClick={() => handlePageChange(idx + 1)}
            active={page === idx + 1}
          >
            {idx + 1}
          </PageButton>
        ))}

        {page < totalPages && (
          <PageButton onClick={() => handlePageChange(page + 1)}>
            &gt;
          </PageButton>
        )}
      </PaginationWrapper>
    </Container>
  );
};

export default ListPageComponent;

const Container = styled.div`
  width: 1200px;
  margin: auto auto;
  padding-top: 2rem;
`;

const PostList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const PaginationWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageButton = styled.button`
  margin-right: 0.5rem;
  padding: 0.4rem 0.8rem;
  background-color: ${(props) => (props.active ? "#dfdf05ed" : "#eee")};
  color: ${(props) => (props.active ? "#000" : "#000")};
  font-weight: ${(props) => (props.active ? "700" : "#000")};
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
