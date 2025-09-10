import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../pages/Loading";
import Header from "../include/Header";

const MainPage = lazy(() => import("../pages/MainPage"));
const UploadPage = lazy(() => import("../pages/UploadPage"));
const ListPage = lazy(() => import("../pages/ListPage"));
const ReadPage = lazy(() => import("../pages/ReadPage"));
const ModifyPage = lazy(() => import("../pages/ModifyPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const JoinPage = lazy(() => import("../pages/JoinPage"));
const MyPage = lazy(() => import("../pages/MyPage"));

const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <Header />
        <MainPage />
      </Suspense>
    ),
  },
  {
    path: "/upload",
    element: (
      <Suspense fallback={<Loading />}>
        <Header />
        <UploadPage />
      </Suspense>
    ),
  },
  {
    path: "/list/:writer",
    element: (
      <Suspense fallback={<Loading />}>
        <Header />
        <ListPage />
      </Suspense>
    ),
  },
  {
    path: "/read/:pno",
    element: (
      <Suspense fallback={<Loading />}>
        <Header />
        <ReadPage />
      </Suspense>
    ),
  },
  {
    path: "/modify/:pno",
    element: (
      <Suspense fallback={<Loading />}>
        <Header />
        <ModifyPage />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <Header />
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/join",
    element: (
      <Suspense fallback={<Loading />}>
        <Header />
        <JoinPage />
      </Suspense>
    ),
  },
  {
    path: "/mypage",
    element: (
      <Suspense fallback={<Loading />}>
        <Header />
        <MyPage />
      </Suspense>
    ),
  },
]);
export default root;
