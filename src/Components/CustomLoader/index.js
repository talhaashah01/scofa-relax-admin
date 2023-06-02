import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

import "./style.css";

const CustomLoader = () => {
  return (
    <div className="loaderWrapper">
      {/* <FontAwesomeIcon icon={faMusic} className="loaderIcon" /> */}
      <span className="loader"></span>
    </div>
  );
};

export default CustomLoader;
