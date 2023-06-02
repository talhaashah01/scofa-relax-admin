import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { removeAccessToken } from "../../Util/token";

import { logo, userImage } from "./../../Assets/images/";

import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBars,
  faEllipsisV,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

import "./style.css";

export const Header = (props) => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    removeAccessToken()
    navigate("/login");
  };

  return (
    <header>
      <Navbar className="customHeader" expand="md">
        <Container fluid>
          <Link to={"/dashboard"} className="siteLogo order-2 order-lg-1">
            <img src={logo} alt="Logo" />
          </Link>
          <Navbar.Toggle className="order-4 order-lg-2 notButton">
            <FontAwesomeIcon className="bell-icon" icon={faEllipsisV} />
          </Navbar.Toggle>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="customCollapse order-3"
          >
            <Nav className="ms-auto">
              <Dropdown className="userDropdown">
                <Dropdown.Toggle
                  variant="transparent"
                  className="notButton toggleButton text-white"
                >
                  <div className="userImage">
                    <img src={userImage} alt="" className="img-fluid" />
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="userMenu" align="end">
                  {/* <Link className="userMenuItem" to={"/profile"}>
                    <FontAwesomeIcon
                      className="me-2 yellow-text"
                      icon={faUser}
                    />{" "}
                    Profile
                  </Link> */}
                  <button className="userMenuItem" onClick={handleLogout}>
                    <FontAwesomeIcon
                      className="me-1 yellow-text"
                      icon={faSignOut}
                    />{" "}
                    Logout
                  </button>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
          <button className="notButton ms-md-2 order-lg-4 order-md-4 order-1">
            <FontAwesomeIcon
              className="bell-icon text-white"
              onClick={props.sidebarToggle}
              icon={faBars}
            />
          </button>
        </Container>
      </Navbar>
    </header>
  );
};
