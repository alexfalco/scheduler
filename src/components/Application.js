import React, { useState, useEffect } from "react";
import DayList from "components/DayList.jsx";
import "components/Application.scss";
import Appointments from "components/Appointment/AppointmentList.jsx";
import axios from "axios";

const appointments = [
  {
    id: 1,
    time: "12pm"
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  }
];

export default function Application(props) {
  const [day, setDay] = useState([]);
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/days`)
      .then(function(response) {
        // handle success
        setDays(response.data);
        console.log(response.data);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }, [day]);

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
          <DayList days={days} day={day} setDay={setDay} />
        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <Appointments appointments={appointments} />
      </section>
    </main>
  );
}
