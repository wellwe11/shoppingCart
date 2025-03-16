import App from "./App";
import Profile from "./components/PROFILEPAGE/Profile";
import ErrorPage from "./components/ERRORPAGE/ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "profile/:name",
    element: <Profile />,
  },
];

export default routes;
