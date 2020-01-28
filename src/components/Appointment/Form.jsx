import React, { useState } from "react";
import "components/Appointment/style.scss";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const reset = function() {
    setName("");
    setInterviewer(null);
  };

  const cancel = function() {
    reset();
    props.onCancel();
  };

  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            value={name}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={event => {
              setName(event.target.value);
            }}
            onSubmit={event => event.preventDefault()}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => props.onSave(name, interviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
