import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { loginPost } from "../api/memberApi"
import { getCookie, removeCookie, setCookie } from "../util/cookie"

const initState = {
    email: ""
}

const loadMemberCookie = () => { //쿠키에서 로그인 정보 로딩
    const memberInfo = getCookie("member")
    //닉네임 처리
    if (memberInfo && memberInfo.nickname) {
        // %ED%99%8D%EA%B8%B8%EB%8F%99 => 홍길동
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname)
    }
    return memberInfo
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
    return loginPost(param)
})

const loginSlice = createSlice({
    name: "LoginSlice",
    initialState: loadMemberCookie() || initState, // 쿠키가 없으면 초기값 사용 생략…,
    reducers: {
        login: (state, action) => {
            console.log("로그인...")
            //{email, pw 로 구성 }
            const data = action.payload;
            //새로운 상태
            return { email: data.email }
        },
        logout: (state, action) => {
            console.log("로그아웃...")
            removeCookie("member")
            return { ...initState };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            console.log("fulfilled : 완료")
            const payload = action.payload
            //정상적인 로그인시에만 쿠키에 저장
            if (!payload.error) {
                console.log("쿠키 저장")
                setCookie("member", JSON.stringify(payload), 1) //1 일
            }
            return payload
        })
            .addCase(loginPostAsync.pending, (state, action) => {
                console.log("pending : 처리중")
            })
            .addCase(loginPostAsync.rejected, (state, action) => {
                console.log("rejected : 오류")
            })
    }
})

export const { login, logout } = loginSlice.actions
export default loginSlice.reducer