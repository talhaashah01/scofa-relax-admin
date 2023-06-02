import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faListCheck, faMusic } from "@fortawesome/free-solid-svg-icons";
import {
  faClipboard,
  faCreditCard,
  faMessage,
} from "@fortawesome/free-regular-svg-icons";

import "./style.css";

export const Sidebar = (props) => {
  const location = useLocation();
  return (
    <div className={`sidebar ${props.sideClass}`} id="sidebar">
      <ul className="list-unstyled">
        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("/dashboard") ? "active" : ""
            }`}
            to="/dashboard"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faBorderAll} />
            </span>
            <span className="sideLinkText">Dashboard</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("/category") ? "active" : ""
            }`}
            to="/category-management"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faListCheck} />
            </span>
            <span className="sideLinkText">Category Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("/sound") ? "active" : ""
            }`}
            to="/sound-management"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMusic} />
            </span>
            <span className="sideLinkText">Sound Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("/meditation") ? "active" : ""
            }`}
            to="/meditation-management"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMusic} />
            </span>
            <span className="sideLinkText">Meditation Management</span>
          </Link>
        </li>
        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("/story") ? "active" : ""
            }`}
            to="/story-management"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMusic} />
            </span>
            <span className="sideLinkText">Story Management</span>
          </Link>
        </li>
       
        <li className="sidebar-li">
          <Link
            className={`sideLink ${
              location.pathname.includes("/article") ? "active" : ""
            }`}
            to="/article-management"
          >
            <span className="sideIcon">
              <FontAwesomeIcon icon={faMusic} />
            </span>
            <span className="sideLinkText">Article Management</span>
          </Link>
        </li>
        
      </ul>
    </div>
  );
};
