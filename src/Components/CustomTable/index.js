import CustomFilters from "../CustomFilters";
import CustomPagination from "../CustomPagination";

import "./style.css";

const CustomTable = (props) => {
  return (
    <>
      <div className="customTable">
        <table>
          <thead>
            <tr>
              {props?.headers.map((header) => (
                <th key={header.key}>{header.title}</th>
              ))}
            </tr>
          </thead>
          {props?.children}
        </table>
      </div>
    </>
  );
};

export default CustomTable;
