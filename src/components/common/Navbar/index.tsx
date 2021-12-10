import * as React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Navbar: React.FC<Props> = (props: Props) => {
  return <div>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>

  </div>;
};

export default Navbar;
