/**
 * TimeRange component bases on SelectField from react-md
 * allowes user to select stat and end time
 */
import React, { Component } from "react";
import { func, object } from "prop-types";
import SelectField from "react-md/lib/SelectFields";
import moment from "moment";
import classnames from "classnames";

import style from "./TimeRange.scss";

import { getTimeFrequency } from "../../../utils/timezone";

class TimeRange extends Component {
  static propTypes = {
    onTimeChange: func.isRequired,
    startTime: object,
    endTime: object,
    className: object,
  };

  static defaultProps = {
    startTime: undefined,
    endTime: undefined,
  };

  onChangeStartTime = (start = undefined) => {
    this.props.onTimeChange({
      startTime: moment(start, 'HH:mm'),
    });
  };

  onChangeEndTime = (end = undefined) => {
    this.props.onTimeChange({
      endTime: moment(end, 'HH:mm'),
    });
  };

  render() {
    const {
      startTime,
      endTime,
      className,
    } = this.props;

    const classes = classnames('md-grid', style.container, className);

    return (
      <div className={ classes }>
        <div className={ style.select }>
          <span className={ style.label }>Start time</span>

          <SelectField
            id="start_time"
            className={ style.select }
            menuItems={ getTimeFrequency() }
            value={ startTime ? startTime.format('HH:mm') : "" }
            onChange={ this.onChangeStartTime }
            style={ { width: "75%" } }
          />
        </div>

        <div className={ style.select }>
          <span className={ style.label }>End time</span>

          <SelectField
            id="end_time"
            className={ style.select }
            menuItems={ getTimeFrequency() }
            value={ endTime ? endTime.format('HH:mm') : "" }
            onChange={this.onChangeEndTime}
            style={ { width: "75%" } }
          />
        </div>
      </div>
    );
  }
}

export default TimeRange;
