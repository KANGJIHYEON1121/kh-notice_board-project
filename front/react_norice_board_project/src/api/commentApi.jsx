import { HOST_URL } from "./HostUrl";
import axios from "axios";
import jwtAxios from "../util/jwtUtil";

export const getComments = async (pno) => {
  const res = await axios.get(`${HOST_URL}/comments/${pno}`);
  return res.data;
};

export const addComment = async (comment) => {
  const res = await jwtAxios.post(`${HOST_URL}/comments/`, comment);
  return res.data;
};

export const updateComment = async (cno, content) => {
  const res = await jwtAxios.put(`${HOST_URL}/comments/${cno}`, content);
  return res.data;
};

export const deleteComment = async (cno) => {
  const res = await jwtAxios.delete(`${HOST_URL}/comments/${cno}`);
  return res.data;
};
