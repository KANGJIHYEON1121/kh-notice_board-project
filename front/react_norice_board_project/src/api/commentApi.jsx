import { HOST_URL } from "./HostUrl";
import axios from "axios";

export const getComments = async (pno) => {
  const res = await axios.get(`${HOST_URL}/comments/${pno}`);
  return res.data;
};

export const addComment = async (comment) => {
  const res = await axios.post(`${HOST_URL}/comments/`, comment);
  return res.data;
};

export const updateComment = async (cno, content) => {
  const res = await axios.put(`${HOST_URL}/comments/${cno}`, content);
  return res.data;
};

export const deleteComment = async (cno) => {
  const res = await axios.delete(`${HOST_URL}/comments/${cno}`);
  return res.data;
};
