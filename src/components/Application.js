import React, { useState, useEffect } from "react";
import DayList from "components/DayList.jsx";
import "components/Application.scss";
import Appointments from "components/Appointment/AppointmentList.jsx";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    Promise.all([axios.get(`/api/days`), axios.get(`/api/appointments`)]).then(
      response => {
        console.log(response);
        const days = response[0].data;
        const appointments = response[1].data;
        setState(prev => ({
          ...state,
          days: days,
          appointments: appointments
        }));
      }
    );
  }, []);

  const appoint = getAppointmentsForDay(state, state.day);
  const setDay = day => setState({ ...state, day: day });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator si defbar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <Appointments appointments={appoint} />
      </section>
    </main>
  );
}
