import { RouteObject } from "react-router-dom";
import { Suspense } from "react";
import HomePage from "../pages/HomePage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <HomePage />
      </Suspense>
    ),
  },
];

export default routes;
