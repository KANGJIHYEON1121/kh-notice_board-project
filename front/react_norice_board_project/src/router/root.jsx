import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../pages/Loading";
import Header from "../include/Header";

const MainPage = lazy(() => import("../pages/MainPage"));
const UploadPage = lazy(() => import("../pages/UploadPage"));
const ListPage = lazy(() => import("../pages/ListPage"));
const ReadPage = lazy(() => import("../pages/ReadPage"));
const ModifyPage = lazy(() => import("../pages/ModifyPage"));

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
    path: "/list",
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
]);
export default root;
