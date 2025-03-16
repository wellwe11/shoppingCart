import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h1>Woops! Looks like theres no avaliable link...</h1>
      <Link to="/">Return to previous site?</Link>
    </div>
  );
};

export default ErrorPage;
