import { RouteObject } from "react-router-dom";
import { Suspense } from "react";
import HomePage from "../pages/HomePage";
import TestPage from "../test/TestPage";
import StandardEmail from "../pages/StandardEmail";
import { LoadingSpinner } from "../components/ui/Spinner";
import CustomizableEmail from "../pages/CustomizableEmail";
import JilianEmail from "../pages/JilianEmail";

const pages = [
  { path: "/", component: <HomePage /> },
  { path: "/test", component: <TestPage /> },
  { path: "/standard", component: <StandardEmail /> },
  { path: "/customize", component: <CustomizableEmail /> },
  { path: "/jilian", component: <JilianEmail /> },
];

const routes: RouteObject[] = pages.map(({ path, component }) => ({
  path,
  element: <Suspense fallback={<LoadingSpinner />}>{component}</Suspense>,
}));

export default routes;
