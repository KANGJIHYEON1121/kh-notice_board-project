import { HOST_URL } from "./HostUrl";
import axios from "axios";
import jwtAxios from "../util/jwtUtil";

// 좋아요 상태 확인
export const getLikeStatus = async (pno) => {
  const res = await jwtAxios.get(`${HOST_URL}/likes/${pno}/status`);
  return res.data;
};

// 좋아요 토글
export const toggleLike = async (pno) => {
  const res = await jwtAxios.post(`${HOST_URL}/likes/${pno}/toggle`);
  return res.data;
};

// 좋아요 개수 조회
export const getLikeCount = async (pno) => {
  const res = await axios.get(`${HOST_URL}/likes/${pno}/count`);
  return res.data;
};
