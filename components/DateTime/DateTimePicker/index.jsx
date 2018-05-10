/**
 * DateTimePicker component uses created DatePicker and TimePicker combain 
 * allowes user to select date and time
 */
import React, { Component } from "react";
import { func, string, object, bool, array } from "prop-types";
import classnames from "classnames";
import moment from "moment";

import DatePicker from "../DatePicker";
import TimePicker from "../TimePicker";

import style from './DateTimePicker.scss';

class DateTimePicker extends Component {
  static propTypes = {
    id: string,
    label: object,
    placeholder: object,
    disabled: bool,
    timeOptions: array,
    onDateTimeChange: func,
    isOutsideRange: func,
  };

  static defaultProps = {
    id: "DateTimePicker",
    startDateTime: undefined,
    endDateTime: undefined,
    timeOptions: [],
    disabled: false,
    placeholder: {time: "", date: ""},
    label: {time: "", date: ""},
  };

  state = {
    dateTime: undefined,
  };

  onDateChange = (date) => {
    if (!date) {
      this.onReset();
      return;
    }
    const { dateTime = moment("00:00", "HH:mm") } = this.state;
    this.setState({
      dateTime: moment(`${date.format("YYYY-MM-DD")} ${dateTime.format("HH:mm")}`),
    }, this.onDone);
  };

  onDateTime = (time) => {
    const { dateTime = moment() } = this.state;
    this.setState({
      dateTime: moment(`${dateTime.format("YYYY-MM-DD")} ${time.format("HH:mm")}`),
    }, this.onDone);
  };

  onReset = () => {
    this.setState({
      dateTime: undefined,
    }, this.onDone);
  };

  onDone = () => {
    this.props.onDateTimeChange(this.state.dateTime);
  };

  render() {
    const { dateTime } = this.state;
    const {
      id,
      placeholder,
      label,
      isOutsideRange,
      disabled,
      timeOptions,
    } = this.props;

    const classes = classnames(style.container, {
      [style.disabled]: disabled,
    });

    return (
      <div className={ classes }>
        <div className={ style.date }>
          {label.date && <div className={ style.label }>{ label.date }</div>}

          <DatePicker
            id={ `${id}_Date` }
            defaultValue={ dateTime}
            placeholder={ placeholder.date }
            onDateChange={ this.onDateChange }
            isOutsideRange={ isOutsideRange }
            showClearDate
          />
        </div>

        <div className={ style.time }>
          {label.time && <div className={ style.label }>{ label.time }</div>}

          <TimePicker
            id={`${id}_Time`}
            time={ dateTime }
            timeOptions={ timeOptions }
            placeholder={ placeholder.time }
            onTimeChange={ this.onDateTime }
          />
        </div>
      </div>
    );
  }
}

export default DateTimePicker;
