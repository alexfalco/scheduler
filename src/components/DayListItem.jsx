import React from "react";
import "components/DayListItem.scss";
const classNames = require("classnames");

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const spotRemaining = num => {
    if (num > 1) {
      return `${num} spots remaining`;
    } else if (num === 1) {
      return "1 spot remaining";
    } else {
      return "no spots remaining";
    }
  };

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotRemaining(props.spots)}</h3>
    </li>
  );
}
