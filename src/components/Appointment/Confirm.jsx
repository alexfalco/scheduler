import React from "react";
import "components/Appointment/style.scss";
import Button from "components/Button.js";
const classNames = require("classnames");

export default function Confirm(props) {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onDelete}>
          Cancel
        </Button>
        <Button danger onClick={props.onConfirm}>
          Confirm
        </Button>
      </section>
    </main>
  );
}
