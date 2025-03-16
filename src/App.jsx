import "./App.css";
import { Link } from "react-router-dom";
import NavBar from "./components/NAVBAR/navBar";

function App() {
  return (
    <>
      <NavBar />
      <Link to="Profile/asd">Click me!</Link>
    </>
  );
}

export default App;

// header with 3 buttons:
// Front-page
// store
// cart

// a sidebar on the right side
// position fixed (pops up if somethings added to cart as small, then gets bigger on click or on hover)

// front page with some nice looking intro, logo and such etc..

// a shopping page for items to be purchased
