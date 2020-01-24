import React from "react";

import Appointment from "components/Appointment/index.jsx";

export default function Appointments(props) {
  console.log(props);
  const items = props.appointments.map(appointment => {
    return (
      <Appointment
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
      />
    );
  });

  return items;
}
