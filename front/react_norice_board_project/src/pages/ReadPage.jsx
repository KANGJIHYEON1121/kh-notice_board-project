import React, { useCallback } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

const ReadPage = () => {
  const { pno } = useParams();
  const nav = useNavigate();
  const [queryParams] = useSearchParams();
  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;
  const queryStr = createSearchParams({ page, size }).toString();

  const moveToModify = useCallback(
    (pno) => {
      nav({ pathname: `/todo/modify/${pno}`, search: queryStr });
    },
    [pno, page, size]
  );

  const moveToList = useCallback(() => {
    nav({ pathname: `/todo/list`, search: queryStr });
  }, [page, size]);

  return (
    <div>
      ReadPage
      {`param = ${pno}`}
    </div>
  );
};

export default ReadPage;
