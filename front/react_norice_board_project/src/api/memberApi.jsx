import axios from "axios";
import jwtAxios from "../util/jwtUtil";
import { HOST_URL } from "./HostUrl";

const host = `${HOST_URL}/member`;

export const loginPost = async (loginParam) => {
  // Content-Type을 x-www-form-urlencoded로 지정하여, 폼 데이터를 보내겠다는 의미이다.
  //axios는 json 데이터를 보내는데 기본방식인데 , form 데이터를 보낼때는 content-type 을 지정해야 한다.
  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };
  const form = new FormData();
  form.append("username", loginParam.email);
  form.append("password", loginParam.pw);

  const res = await axios.post(`${host}/login`, form, header);

  return res.data;
};

export const joinPost = async (member) => {
  const res = await axios.post(`${host}/join`, member);
  return res.data;
};

export const updateMember = async (formData) => {
  const res = await jwtAxios.post(`${HOST_URL}/member/update`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const myProfile = async () => {
  const res = await jwtAxios.get(`${HOST_URL}/member/me`);
  return res.data;
};

export const deleteProfileImage = async () => {
  const res = await jwtAxios.delete(`${HOST_URL}/member/profile`);
  return res.data;
};
