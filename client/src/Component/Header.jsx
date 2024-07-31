import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const token = useSelector((store) => store.authSlice.token);
  const isLogged = !!token;
  return (
    <>
      <nav className="flex items-center justify-around min-h-[10vh]">
        <div>MYAPP.</div>
        <ul className="flex items-center space-x-5">
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          {isLogged ? (
            <Link to={"/login"}>
              {" "}
              <button>Logout</button>
            </Link>
          ) : (
            <>
              <Link to={"/login"}>
                {" "}
                <button>Login</button>
              </Link>
              <Link to={"/register"}>
                <button>Sign Up</button>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;
