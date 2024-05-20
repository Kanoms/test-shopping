import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";

const Navbar = () => {
  const getCurrentDate = () => {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <div>
      <div className="topnav bg-slate-900 text-white">
        <ul className="px-10 flex justify-between items-center">
          <li>Welcome to Test & Get the best product</li>

          <li>{getCurrentDate()}</li>
        </ul>
      </div>
      <div className=" border border-b-0 border-black py-5">
        <ul className="px-10 flex justify-between items-center text-3xl">
          <li>
            Test <span className="text-red-600 text-4xl">.</span>
          </li>
          <li>
            <CiShoppingCart />
          </li>
        </ul>
      </div>
      <div className="mainnav text-xl py-4  border border-black">
        <ul className="flex gap-6">
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
