import React, { useState, useEffect } from "react";
import DayList from "components/DayList.jsx";
import "components/Application.scss";
import Appointments from "components/Appointment/AppointmentList.jsx";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterviewersForDay
} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then(response => {
      const days = response[0].data;
      const appointments = response[1].data;
      const interviewers = response[2].data;
      setState(prev => ({
        ...state,
        days: days,
        appointments: appointments,
        interviewers: interviewers
      }));
    });
  }, []);

  const setDay = day => setState({ ...state, day: day });
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview) {
    debugger;
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(response => {
        console.log("response", response);
        const res = response.data[0];
        setState({
          ...state,
          appointments
        });
      })
      .catch(err => console.log(err));
  }

  function cancelInterview(id) {
    //set it's interview data to null
  }

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
        <Appointments
          appointments={appointments}
          state={state}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      </section>
    </main>
  );
}
