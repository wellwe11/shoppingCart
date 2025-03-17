import Profile from "./components/PROFILEPAGE/Profile";
import ErrorPage from "./components/ERRORPAGE/ErrorPage";

const routes = [
  {
    path: "/",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:name",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
