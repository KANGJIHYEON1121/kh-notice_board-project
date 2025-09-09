import { HOST_URL } from "./HostUrl";
import axios from "axios";
import jwtAxios from "../util/jwtUtil";

export const getPost = async (pno) => {
  const res = await axios.get(`${HOST_URL}/post/${pno}`);
  return res.data;
};

export const getAll = async () => {
  const res = await axios.get(`${HOST_URL}/post/all`);
  return res.data;
};

export const getList = async () => {
  const res = await axios.get(`${HOST_URL}/post/list`);
  return res.data;
};

export const addPost = async (post) => {
  const res = await jwtAxios.post(`${HOST_URL}/post`, post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updatePost = async (post, pno) => {
  const res = await jwtAxios.put(`${HOST_URL}/post/${pno}`, post);
  return res.data;
};

export const deletePost = async (pno) => {
  const res = await jwtAxios.delete(`${HOST_URL}/post/${pno}`);
  return res.data;
};
