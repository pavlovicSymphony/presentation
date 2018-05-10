/**
 * DateTimeRange component
 */
import React, { Component } from "react";
import { func } from "prop-types";
import moment from "moment";

import DateRange from "../DateRange";
import TimeRange from "../TimeRange";

import styles from './DateTimeRange.scss';

class DateTimeRange extends Component {
  static propTypes = {

    onChangeDateTime: func,
  };

  static defaultProps = {
    startDateTime: undefined,
    endDateTime: undefined,
  };

  state = {
    startDateTime: undefined,
    endDateTime: undefined,
  };

  onDone = () => {
    this.props.onChangeDateTime(this.state);
  };

  onDatesChange = ({ startDate, endDate }) => {
    const { startDateTime, endDateTime } = this.state;

    if (!startDate && !endDate) {
      this.onResetDates();
      return;
    }

    this.setState({
      startDateTime: startDate ? this.setDate(startDateTime, startDate) : startDateTime,
      endDateTime: endDate ? this.setDate(endDateTime, endDate) : endDateTime,
    }, this.onDone);
  };

  onResetDates = () => {
    this.setState({
      startDateTime: undefined,
      endDateTime: undefined,
    }, this.onDone);
  };

  onTimeChange = ({ startTime, endTime }) => {
    const { startDateTime, endDateTime } = this.state;

    this.setState({
      startDateTime: startTime ? this.setTime(startDateTime, startTime) : startDateTime,
      endDateTime: endTime ? this.setTime(endDateTime, endTime) : endDateTime,
    }, this.onDone);
  };

  setTime = (stateDate = undefined, selectedTime = undefined) => {
    const date = moment(stateDate);

    const time = moment((selectedTime), "HH:mm");

    return moment(`${date.format('YYYY-MM-DD')} ${time.format("HH:mm")}`);
  };

  setDate = (stateTime = "00:00", selectedDate) => {
    const time = moment(stateTime, "HH:mm");
    const date = moment(selectedDate);

    return moment(`${date.format("YYYY-MM-DD")} ${time.format("HH:mm")}`);
  };

  render() {
    const {
      startDateTime,
      endDateTime,
    } = this.state;

    return (
      <div className={styles.date_time_range}>
        <div>
          <div>
            <DateRange
              startDate={startDateTime}
              endDate={endDateTime}
              onDatesChange={this.onDatesChange}
              numberOfMonths={2}
              showClearDates
            />
          </div>
        </div>
        <TimeRange
          className={styles}
          startTime={startDateTime}
          endTime={endDateTime}
          onTimeChange={this.onTimeChange}
        />
      </div>
    );
  }
}

export default DateTimeRange;
