/**
 * Check if the nurse clock in time period of 30 min
 */
export const isNurseLate = ({ assignment, in_out: { start } }) => {
  if (!start) {
    return true;
  }

  const startTime = start.split(' ')[1];
  const assignmentStartTime = moment(`${assignment.start_time}`, 'HH:mm:ss');
  const nurseStartTime = moment(`${startTime}`, 'HH:mm:ss');
  const assignmentStartDateTime = moment(`${assignment.start_date} ${assignment.start_time}`, 'YYYY-MM-DD HH:mm:ss');
  const assignmentEndDateTime = moment(`${assignment.end_date} ${assignment.start_time}`, 'YYYY-MM-DD HH:mm:ss');
  const nurseStartDateTime = moment(`${start}`, 'YYYY-MM-DD HH:mm:ss');

  /**
   * Before start date time or on the start date time of the assignment
  */
  if (nurseStartDateTime.isSameOrBefore(assignmentStartDateTime)) {
    return false;
  }

  /**
   * Between start and end date time of the assignment
  */
  if (nurseStartDateTime.isBetween(assignmentStartDateTime, assignmentEndDateTime)) {
    const nurseHours = (~nurseStartTime.diff(assignmentStartTime, 'hours')) + 1;

  /**
   * Check if it's next day
   */
   if (nurseHours >= 12 && nurseHours <= 23) {
      assignmentStartTime.subtract(1, 'day');
    }

    const nurseMinutes = nurseStartTime.diff(assignmentStartTime, 'minutes');

    return nurseMinutes > 30;
  }

  /**
   * After end date time or on the end date time of the assignment
  */
  if (nurseStartDateTime.isSameOrAfter(assignmentEndDateTime)) {
    return false;
  }

  return true;
};
