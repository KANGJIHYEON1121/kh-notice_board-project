import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getList } from "../api/postApi";

const ListPage = () => {
  const [queryParams] = useSearchParams();
  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;

  useEffect(() => {
    getList().then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div>
      ListPage ListParam {page} - {size}
    </div>
  );
};

export default ListPage;
