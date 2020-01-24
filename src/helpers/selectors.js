export function getAppointmentsForDay(state, day) {
  console.log(state);
  const filteredDay = state.days.filter(item => item.name === day);
  const appointments = filteredDay[0] ? filteredDay[0].appointments : [];
  const result = appointments
    ? appointments.map(key => state.appointments[key])
    : [];

  console.log(result);
  // return an array of appointments for the selected day
  return result;
}
