import React from "react";
import { getInterview } from "helpers/selectors";
import Appointment from "components/Appointment/index.jsx";

export default function Appointments(props) {
  const items = props.appointments.map(appointment => {
    getInterview(props.state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
        interviewers={props.interviewers}
        bookInterview={props.bookInterview}
      />
    );
  });

  console.log(items);
  return items;
}
