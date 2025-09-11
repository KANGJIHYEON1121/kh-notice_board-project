import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../pages/Loading";

const MainPage = lazy(() => import("../pages/MainPage"));
const UploadPage = lazy(() => import("../pages/UploadPage"));
const ListPage = lazy(() => import("../pages/ListPage"));
const ReadPage = lazy(() => import("../pages/ReadPage"));
const ModifyPage = lazy(() => import("../pages/ModifyPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const JoinPage = lazy(() => import("../pages/JoinPage"));
const MyPage = lazy(() => import("../pages/MyPage"));
const KakaoRedirect = lazy(() => import("../pages/KakaoRedirectPage"));

const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <MainPage />
      </Suspense>
    ),
  },
  {
    path: "/upload",
    element: (
      <Suspense fallback={<Loading />}>
        <UploadPage />
      </Suspense>
    ),
  },
  {
    path: "/list/:writer",
    element: (
      <Suspense fallback={<Loading />}>
        <ListPage />
      </Suspense>
    ),
  },
  {
    path: "/read/:pno",
    element: (
      <Suspense fallback={<Loading />}>
        <ReadPage />
      </Suspense>
    ),
  },
  {
    path: "/modify/:pno",
    element: (
      <Suspense fallback={<Loading />}>
        <ModifyPage />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/join",
    element: (
      <Suspense fallback={<Loading />}>
        <JoinPage />
      </Suspense>
    ),
  },
  {
    path: "/mypage",
    element: (
      <Suspense fallback={<Loading />}>
        <MyPage />
      </Suspense>
    ),
  },
  {
    path: "/member/kakao",
    element: (
      <Suspense fallback={<Loading />}>
        <KakaoRedirect />
      </Suspense>
    ),
  },
]);
export default root;
