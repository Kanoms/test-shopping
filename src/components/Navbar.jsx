import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="topnav">
        <ul>
          <li>Welcome to Test & Get the best product</li>

          <li></li>
        </ul>
      </div>
      <div className="mainnav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
