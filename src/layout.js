import './layout.css'
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">New order</Link>
          </li>
          <li>
            <Link to="/newcustomer">New customer</Link>
          </li>
          <li>
              <Link to="/orderhistory">Order history</Link>
          </li>
          <li>
            <Link to="/productpage">New/Edit product</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
