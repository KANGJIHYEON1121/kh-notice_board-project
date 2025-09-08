import { HOST_URL } from "./HostUrl";
import axios from "axios";

export const getPost = async (pno) => {
  const res = await axios.get(`${HOST_URL}/post/${pno}`);
  return res.data;
};

export const getAll = async () => {
  const res = await axios.get(`${HOST_URL}/post/all`);
  return res.data;
};

export const addPost = async (post) => {
  const res = await axios.post(`${HOST_URL}/post`, post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
