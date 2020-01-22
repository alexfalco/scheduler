import React, { Fragment } from "react";
import "components/Appointment/style.scss";
import Header from "components/Appointment/Header.jsx";
import Show from "components/Appointment/Show.jsx";
import Confirm from "components/Appointment/Confirm.jsx";
import Status from "components/Appointment/Status.jsx";
import Error from "components/Appointment/Error.jsx";
import Empty from "components/Appointment/Empty.jsx";

const classNames = require("classnames");

export default function Appointment(props) {
  const interview = props.interview;
  if (interview) {
    return (
      <Fragment>
        <article className="appointment"></article>
        <Header time={props.time}></Header>
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      </Fragment>
    );
  } else {
    return (
      <article className="appointment">
        <Header time={props.time}></Header>
        <Empty onAdd={props.onAdd} />
      </article>
    );
  }
}
