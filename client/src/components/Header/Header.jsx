import { NavLink } from "react-router-dom";
import "./header.scss";

export const Navbar = () => {
  return (
    <header>
      <div className="wrapper">
        <div className="header_con">
          <div className="main_logo">G-UP</div>

          <nav>
            <NavLink to="/">Home</NavLink>

            <NavLink to="/login">Login</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};
