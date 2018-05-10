/**
 * DateRange component used for picking start and end dates based on react-dates
 * There is an image of how the components looks
 */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { DateRangePicker } from 'react-dates';

class DateRange extends Component {
  static propTypes = {
    startDateId: PropTypes.string,
    startDatePlaceholderText: PropTypes.string,
    startDate: PropTypes.object,
    endDateId: PropTypes.string,
    endDatePlaceholderText: PropTypes.string,
    endDate: PropTypes.object,
    showDefaultInputIcon: PropTypes.bool,
    onDatesChange: PropTypes.func,
    showClearDates: PropTypes.bool,
  };

  static defaultProps = {
    startDateId: "start_date",
    startDatePlaceholderText: "Start date",
    endDateId: "end_date",
    endDatePlaceholderText: "End date",
    startDate: null,
    endDate: null,
    showClearDates: true,
    showDefaultInputIcon: true,
  };

  state = {
    focusedInput: null,
  };

  onFocus = (focusedInput) => {
    this.setState({ focusedInput });
  };

  render() {
    const { focusedInput } = this.state;
    const {
      startDateId,
      startDatePlaceholderText,
      startDate,
      endDateId,
      endDatePlaceholderText,
      endDate,
      onDatesChange,
      showClearDates,
      showDefaultInputIcon,
    } = this.props;

    return (
      <DateRangePicker
        minimumNights={0}
        startDateId={ startDateId }
        startDatePlaceholderText={ startDatePlaceholderText }
        startDate={ startDate }
        endDateId={ endDateId }
        endDatePlaceholderText={ endDatePlaceholderText }
        endDate={ endDate }
        onDatesChange={ onDatesChange }
        focusedInput={ focusedInput }
        onFocusChange={ this.onFocus }
        showDefaultInputIcon={ showDefaultInputIcon }
        showClearDates={ showClearDates }
        isOutsideRange={ () => (false) }
      />
    );
  }
}

export default DateRange;
