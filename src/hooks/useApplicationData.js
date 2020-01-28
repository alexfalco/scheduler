import React, { useState, useEffect } from "react";
import DayList from "components/DayList.jsx";
import "components/Application.scss";
import Appointments from "components/Appointment/AppointmentList.jsx";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterviewersForDay
} from "helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day: day });

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

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Promise.all([
      axios.put(`/api/appointments/${id}`, { interview }),
      axios.get(`/api/days`)
    ]).then(response => {
      const res = response[0].data[0];
      const days = response[1].data;

      setState({
        ...state,
        appointments,
        days: days
      });
    });
  }

  function cancelInterview(id) {
    //set it's interview data to null

    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Promise.all([
      axios.delete(`/api/appointments/${id}`),
      axios.get(`/api/days`)
    ]).then(response => {
      const res = response[0].data[0];
      const days = response[1].data;
      setState({
        ...state,
        appointments,
        days: days
      });
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}

// The state object will maintain the same structure.
// The setDay action can be used to set the current day.
// The bookInterview action makes an HTTP request and updates the local state.
// The cancelInterview action makes an HTTP request and updates the local state.
// Summary
