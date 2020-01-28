export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(item => item.name === day);
  const appointments = filteredDay[0] ? filteredDay[0].appointments : [];
  const result = appointments
    ? appointments.map(key => state.appointments[key])
    : [];

  // return an array of appointments for the selected day

  return result;
}

export function getInterview(state, interview) {
  // interviewers = Object of all interviewers
  // interview = interview id

  if (!interview) {
    return null;
  }

  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer]
  };
}

// export function getInterviewersForDay(state, day) {
//   const filteredDay = state.days.filter(item => item.name === day);

//   const appointmentsId = filteredDay[0] ? filteredDay[0].appointments : [];
//   const appointments = appointmentsId
//     ? appointmentsId.map(key => state.appointments[key])
//     : [];

//   const interviewerIds = appointments
//     .map(appointment =>
//       appointment.interview ? appointment.interview.interviewer : null
//     )
//     .filter(interviewer => interviewer);

//   const interviewers = interviewerIds.map(id => state.interviewers[id]);

//   return interviewers;
// }

export function getInterviewersForDay(state, day) {
  const match = state.days.find(d => d.name === day);
  //console.log(match);
  const interviewers = match ? match.interviewers : [];
  //console.log(interviewers);
  // console.log(
  //   interviewers.map(id => {
  //     return state.interviewers[id];
  //   })
  // );
  return interviewers.map(id => {
    return state.interviewers[id];
  });
}
