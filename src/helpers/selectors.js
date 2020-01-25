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

  interview.interviewer = state.interviewers[interview.interviewer];

  return interview;
}
