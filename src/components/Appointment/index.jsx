import React, { Fragment, useState } from "react";
import "components/Appointment/style.scss";
import Header from "components/Appointment/Header.jsx";
import Show from "components/Appointment/Show.jsx";
import Confirm from "components/Appointment/Confirm.jsx";
import Status from "components/Appointment/Status.jsx";
import Error from "components/Appointment/Error.jsx";
import Form from "components/Appointment/Form.jsx";
import Empty from "components/Appointment/Empty.jsx";
import useVisualMode from "hooks/useVisualMode";
import axios from "axios";

const classNames = require("classnames");

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition("SAVING", false);
    props
      .bookInterview(props.id, interview)
      .then(() => transition("SHOW", false))
      .catch(err => transition("ERROR_SAVE", true));
  }

  function deleteInterview() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY, false);
      })
      .catch(err => transition("ERROR_DELETE", true));
  }

  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition("CREATE", false)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}

      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}

      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message="SAVING" />}
      {mode === DELETING && <Status message="DELETING" />}
      {mode === CONFIRM && (
        <Confirm
          message="Sure you want to delete?"
          onConfirm={deleteInterview}
          onCancel={() => transition(SHOW)}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save your changes"
          onClose={() =>
            props.interview ? transition(SHOW, true) : transition(EMPTY, true)
          }
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not Delete your changes"
          onClose={() =>
            props.interview ? transition(SHOW, true) : transition(EMPTY, true)
          }
        />
      )}
    </article>
  );
}
