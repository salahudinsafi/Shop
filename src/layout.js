import './layout.css'
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">New Order</Link>
          </li>
          <li>
            <Link to="/newcustomer">New Customer</Link>
          </li>
          <li>
            <Link to="/productpage">New Product</Link>
          </li>
          <li>
              <Link to="/orderhistory">Order History</Link>
          </li>
          
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
