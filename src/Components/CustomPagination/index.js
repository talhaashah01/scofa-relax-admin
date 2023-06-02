import { Pagination } from "react-bootstrap";

import "./style.css";

const CustomPagination = ({enteries, totalCount}) => {
    let active = 1;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }
    return (
        <>
            <div className="customPagination">
                <div className="row align-items-baseline">
                    <div className="col-lg-6">
                        <p className="paginationText">{enteries} of {totalCount}</p>
                    </div>
                    <div className="col-lg-6">
                        <Pagination>
                            <Pagination.Prev />
                            {items}
                            <Pagination.Next />
                        </Pagination>
                    </div>
                </div>
            </div>
        </>)
}

export default CustomPagination