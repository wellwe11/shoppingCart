import { Link, useParams } from "react-router-dom";
import DefaultPage from "../DEFAULTPAGE/DefaultPage";

import classes from "./profileStyles.module.css";
import NavBar from "../NAVBAR/navBar";

const Profile = ({}) => {
  const { name } = useParams();
  return (
    <div>
      <NavBar />
      <h1 className={classes.red}>
        This is a main-content container which will contain changeable sites to
        switch between for different content
      </h1>
      <div>
        <Link to="/">Return back to front page</Link>
      </div>
      <div>
        {name === "pageone" ? (
          <div></div>
        ) : name === "pageTwo" ? (
          <div></div>
        ) : (
          <DefaultPage />
        )}
      </div>
    </div>
  );
};

export default Profile;
