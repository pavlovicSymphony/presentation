/**
 * TimePicker component
 */
import React, { Component } from "react";
import { func, object, string, array } from "prop-types";
import SelectField from "react-md/lib/SelectFields";
import moment from "moment";

import style from "./TimePicker.scss";

class TimePicker extends Component {
  static propTypes = {
    id: string,
    time: object,
    label: string,
    placeholder: string,
    timeOptions: array,
    onTimeChange: func,
  };

  static defaultProps = {
    id: "Time",
    time: undefined,
    label: "",
    placeholder: "",
    timeOptions: [],
  };

  onChangeTime = (time) => {
    this.props.onTimeChange(moment(`${moment(this.props.time).format("YYYY-MM-DD")} ${time}`, "YYYY-MM-DD HH:mm"));
  };

  render() {
    const {
      id,
      time,
      label,
      timeOptions,
      placeholder,
    } = this.props;

    return (
      <div className={ style.container }>
        { label && <span className={ style.label }>{ label }</span> }
        <SelectField
          id={ id }
          placeholder={ placeholder }
          className={ style.select }
          menuItems={ timeOptions }
          value={ time ? time.format('HH:mm') : "" }
          onChange={ this.onChangeTime }
          style={ { width: "75%" } }
        />
      </div>
    );
  }
}

export default TimePicker;
