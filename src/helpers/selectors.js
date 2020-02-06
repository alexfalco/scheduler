// return an array of appointments for the selected day
export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(item => item.name === day);
  const appointments = filteredDay[0] ? filteredDay[0].appointments : [];
  const result = appointments
    ? appointments.map(key => state.appointments[key])
    : [];

  return result;
}

// helper function to get interview for the day
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

// helper function to get the interviewer available for the day
export function getInterviewersForDay(state, day) {
  const match = state.days.find(d => d.name === day);

  const interviewers = match ? match.interviewers : [];

  return interviewers.map(id => {
    return state.interviewers[id];
  });
}
