import { getCookie } from "../util/cookie"

export const HOST_URL = "http://localhost:8080/api"



export const userId = getCookie("member")?.nickname;
