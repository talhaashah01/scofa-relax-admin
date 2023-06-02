import React from "react";

import "./style.css";

const StatsCard = (props) => {
  return (
    <>
      <div className="statsCard">
        <div className="statsContent">
          <div className="statsImg">
            <img src={props.item.image} alt="Card Icon" />
          </div>
          <div className="statsData">
            <h3 className="statsNumber">{props.item.number}</h3>
            <p className="statsText">{props.item.text}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsCard;
