import React, { Fragment } from "react";
import "components/Appointment/style.scss";
import Header from "components/Appointment/Header.jsx";
import Show from "components/Appointment/Show.jsx";
import Confirm from "components/Appointment/Confirm.jsx";
import Status from "components/Appointment/Status.jsx";
import Error from "components/Appointment/Error.jsx";
import Form from "components/Appointment/Form.jsx";
import Empty from "components/Appointment/Empty.jsx";
import useVisualMode from "hooks/useVisualMode";

const classNames = require("classnames");

export default function Appointment(props) {
  console.log(props);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition("SAVING", false);

    props
      .bookInterview(props.id, interview)
      .then(() => transition("SHOW", false));
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition("CREATE", false)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message={"SAVING"} />}
    </article>
  );
}
