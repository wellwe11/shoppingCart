import Profile from "./components/PROFILEPAGE/Profile";
import ErrorPage from "./components/ERRORPAGE/ErrorPage";

const routes = [
  {
    path: "/:name?/:product?",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
